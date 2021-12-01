import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatabaseService } from 'src/app/services/database/database.service';
import { NotificationService } from 'src/app/services/notification.service';


export interface Usuario {
  id:string,
  rut: string,
  nombre: string,
  clave:string,
  correo: string,
  edad: string,
  tipoUsuario: string,
};



@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.page.html',
  styleUrls: ['./editar-user.page.scss'],
})
export class EditarUserPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private storage:Storage,
              private alert:AlertController,
              private router:Router,
              private noti: NotificationService,
              private db: DatabaseService
              ) { }

  

  lista: Usuario[] = [];
  idRecord:any
  ngOnInit() {
    var id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(id)
    this.getUser(id)
    
  }


    usser = new FormGroup({
      identificador : new FormControl('', Validators.required),
      nombrecito : new FormControl('', Validators.required),
      correito : new FormControl('', [Validators.email ,Validators.required]),
      edaad: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      clave: new FormControl('',Validators.required),
      passConfirm: new FormControl('',Validators.required),
      // id : new FormControl('')

  })

  
getUser(id){
  this.db.show('usuarios',id).then(response => {
    response.subscribe(usr => {
      let user = usr.data() as Usuario;
      user.id = usr.id
      console.log(user)
      this.setValues(user)
    })

  })
}


setValues(usr){
  this.usser.setValue({
      identificador: usr.rut,
      nombrecito: usr.nombre,
      correito: usr.correo,
      edaad: usr.edad,
      tipo: usr.tipoUsuario,
      clave: usr.clave,
      passConfirm: usr.clave
    })
  this.idRecord = usr.id
}


update(){
  var usuario: any;
  usuario ={//crea un objeto de tipo usuario al cual se le asigna los valores de los campos del formulario
    rut: this.usser.controls.identificador.value,
    nombre: this.usser.controls.nombrecito.value,
    correo: this.usser.controls.correito.value,
    edad: this.usser.controls.edaad.value,
    tipoUsuario: this.usser.controls.tipo.value,
    clave: this.usser.controls.clave.value,
  };
  this.db.update('usuarios',this.idRecord,usuario).then(()=>{
    this.router.navigate(['/admin'])
  })
}


  // //esta funcion buca el usuario en el arreglo de usuarios y lo inserta al arreglo de usuarios
  // getUser(rut){

  //   this.storage.create();
  //   this.storage.get('usuarios').then((usuarios)=>{

  //     for(let usr of usuarios){
  //       if (rut == usr.rut){
           
          // this.usser.setValue({
          //   identificador: usr.rut,
          //   nombrecito: usr.nombre,
          //   correito: usr.correo,
          //   edaad: usr.edad,
          //   tipo: usr.tipoUsuario,
          //   clave: usr.clave,
          //   passConfirm: usr.clave
          // })
            
  //       }
  //     }
 
  //   });

  // }



  modificar(){
    
    var usuario: any;
    usuario ={//crea un objeto de tipo usuario al cual se le asigna los valores de los campos del formulario
      rut: this.usser.controls.identificador.value,
      nombre: this.usser.controls.nombrecito.value,
      correo: this.usser.controls.correito.value,
      edad: this.usser.controls.edaad.value,
      tipoUsuario: this.usser.controls.tipo.value,
      clave: this.usser.controls.clave.value,
    };

    this.storage.create();//SE INICIALIZA EL ALMACENAMIENTO
    this.storage.get('usuarios').then((usuarios: Usuario[])=>{

      this.lista =[];

      //se valida que las contraseñas coincidan
      if(this.valdatePass(usuario.clave, this.usser.controls.passConfirm.value)){
        for(let usr of usuarios){//recorrerta el arreglo de usuarios

          if (usuario.rut == usr.rut){//si el usuario que editamos es igual al usuario que esta en el arreglo añadimos los datos editados
              this.lista.push(usuario);
          }else{//de lo contrario mantenemos los datos originales
            this.lista.push(usr);
          }
        }
        this.storage.set('usuarios',this.lista);//se guarda el arreglo con los datos modificados

        this.noti.notificacion('Usuario Actualizado', 'Se han guardado los cambios con exito.')
        this.router.navigate(['/admin'])// se lanza la alerta de exito y se redirecciona a la pagina de admin

      }else{//en caso de que la contraseña no coincida se lanza una alerta
        this.noti.notificacion("Error", "Las contraseñas no coinciden")
      }
    
    });
    
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
