import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NotificationService } from 'src/app/services/notification.service';
import { DatabaseService } from 'src/app/services/database/database.service';


export interface Usuario {
  rut: string,
  nombre: string,
  clave:string,
  correo: string,
  edad: string,
  tipoUsuario: string
};


@Component({
  selector: 'app-pagina4',
  templateUrl: './pagina4.page.html',
  styleUrls: ['./pagina4.page.scss'],
})

export class Pagina4Page implements OnInit {

  constructor(
    public toastController: ToastController,
    private noti: NotificationService,
    private storage:Storage, 
    private router:Router,
    private db: DatabaseService
    ) { }




  ngOnInit() {
  }


  // // Controlador elementos input individuales.
  // rut = new FormControl('');
  // user = new FormControl('');
  // clave = new FormControl('');

  // Controlador formulario en grupo.
  formUser = new FormGroup ({
    rut : new FormControl('', Validators.required),
    usuario : new FormControl('', Validators.required),
    correo : new FormControl('', [Validators.email ,Validators.required]),
    edad : new FormControl('', Validators.required),
    tipoUsuario : new FormControl('', Validators.required),
    clave : new FormControl('', Validators.required),
    confirmPass : new FormControl('',Validators.required)
  });



  //usamos el metodo add para crear un objeto de la clase usuario, el cual enviaremos a la funcion create user para almacenarlo en el storage
 async  add(){
    let u: Usuario; 
    u = {
      rut: this.formUser.controls.rut.value,
      nombre: this.formUser.controls.usuario.value,
      clave: this.formUser.controls.clave.value,
      correo: this.formUser.controls.correo.value,
      edad: this.formUser.controls.edad.value,
      tipoUsuario: this.formUser.controls.tipoUsuario.value
    };

    //validamos que los passwords ingresados sean iguales
    if(this.validatePassword(u.clave, this.formUser.controls.confirmPass.value)){
      await this.db.add('usuarios',u)
      await this.router.navigate(['/admin'])
    } else{
      this.noti.notificacion('Error', 'Las contraseñas ingresadas no conciden');
    }
      
        
  }


//esta funcion valida que las contraseñas ingresadas en el registro de usuario sean iguales
validatePassword(pass, confirmPass):boolean{
  let esta: boolean = false;
  if (pass == confirmPass){ 
    esta =true; 
  }
   return esta
}


  /**######################################## */

  //Usamos esta funcion para crear un usuario dentro de storage
  createUser(usuario : Usuario, cpass){

    this.storage.create()//instanciamos el storage para comenzar la creacion del registro

    this.storage.get('usuarios').then( (usuarios:Usuario[]) => {

      let existe = this.validaUsuarios(usuario.rut, usuarios);//llamamos a la funcion validaProducto para saber si el usuario ya existe

      if(existe){//si el usuario existe mostramos una alerta indicando que ya existe
        this.noti.notificacion('Error', 'El usuario ingresado ya existe');
      }else{//si el usuario no existe lo agregamos a la lista de usuarios

        let esta = this.validatePassword(usuario.clave, cpass)
        if (esta){
          if(!usuarios){
            this.storage.set('usuarios',[usuario]);
          }else{
            usuarios.push(usuario);
            this.storage.set('usuarios',usuarios);
          }
          this.noti.notificacion('Exito', 'Usuario creado correctamente');
          this.router.navigate(['/admin'])
        } else{
          this.noti.notificacion('Error', 'Las contraseñas ingresadas no conciden');
        }

      }      

    })

    console.log(this.storage.get('usuarios'));
  }




  validaUsuarios(rut, usuarios):boolean{
    let existe: boolean = false;//establecemos una variable booleana para saber si el usuario ya existe
    if (usuarios){
      for(let u of usuarios){//recorremos la lista de usuarios
        if(rut == u.rut){//si el rut del usuario ya esta registrado establecemos la variable booleana a true y fnalizamos el ciclo
          existe = true;
          break;
        }
    }
  }
    return existe
  }





} 