import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/interfaces/user';




@Component({
  selector: 'app-pagina5',
  templateUrl: './pagina5.page.html',
  styleUrls: ['./pagina5.page.scss'],
})

export class Pagina5Page implements OnInit {

  constructor(
      private activatedRoute: ActivatedRoute, 
      private auth: AuthenticationService,
      private storage: Storage,
      private router: Router,
      private noti: NotificationService

    ) { }



  lista: User[] = [];

  ngOnInit() {
    var username = this.activatedRoute.snapshot.paramMap.get('rut')
    //se usa la libreria active router para recibir el parametro que enviamos desde pagina uno

    this.persona.controls.rut.setValue(this.auth.authUser.rut)
    //llamamos a la funcion buscar para setear el username dentro del form group, ya que este es usado dentro del formulario en un campo de tipo hidden
  }




  // Controlador formulario en grupo.
  persona = new FormGroup ({
    rut : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required),
    passConfirm: new FormControl('', Validators.required)
  });




  changePass(){
    var usuario: any;
    this.storage.create()
    this.storage.get('usuarios').then((usuarios: User[]) => {

      this.lista =[];

      if(this.valdatePass(this.persona.controls.clave.value, this.persona.controls.passConfirm.value)){

        for(let usr of usuarios){//recorrerta el arreglo de usuarios

          if (this.persona.controls.rut.value== usr.rut){//si el usuario que editamos es igual al usuario que esta en el arreglo añadimos los datos editados
              
            
            usuario ={//crea un objeto de tipo usuario al cual se le asigna los valores de los campos del formulario
              rut: usr.rut,
              nombre: usr.nombre,
              correo: usr.correo,
              edad: usr.clave,
              tipoUsuario: usr.tipoUsuario,
              clave: this.persona.controls.clave.value,     
            };
            
            this.lista.push(usuario);
         
          }else{//de lo contrario mantenemos los datos originales
            this.lista.push(usr);
          }
        }
        this.storage.set('usuarios',this.lista);//se guarda el arreglo con los datos modificados

        this.noti.notificacion('Usuario Actualizado', 'Su contraseña se actualizo con exito.')
        this.router.navigate(['/pagina1'])// se lanza la alerta de exito y se redirecciona a la pagina de admin

      }else{
        this.noti.notificacion("Error", "Las contraseñas no coinciden")
      }

    })


  }



    //valida que ambos passwords sean iguales y retorna un booleano en funcion de si son iguales o no
    valdatePass(pass, passConfirm):boolean{
      let valid:boolean = false;
      if(pass == passConfirm){
        valid = true;
      }
      return valid
    }



 }
