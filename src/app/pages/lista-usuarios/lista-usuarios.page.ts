import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatabaseService } from 'src/app/services/database/database.service';
import { NotificationService } from 'src/app/services/notification.service';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {

  Usuario:User;
  
  listaUsuarios: User[] = []

  usser = new FormGroup({
    identificador : new FormControl(),
    nombrecito : new FormControl(),
    correito : new FormControl(),
    edaad: new FormControl,
    tipo: new FormControl,
    clave: new FormControl

  })

  constructor(
    private storage:Storage, 
    private alert: AlertController, 
    private router:Router,
    private noti:NotificationService,
    private db: DatabaseService
    ) { }

  userList:any
   ngOnInit() {
    /**
     * En el inicio de la aplicacion tomamos todos los usuarios registrados en la aplicacion
     * y los almacenamos en un arreglo llamada lista usuarios
     * estea arreglo de usuarios es usado en la vista para recorrer la lista y mostrar los usuarios
     */
    
    this.getUsers();
    
    this.storage.create()
    // this.storage.get('usuarios').then((usuarios: Usuario[]) => {
    //   for (let usr of usuarios) {
    //     if (usr.tipoUsuario != 'admin'){
    //       this.listaUsuarios.push(usr);
    //     }
    //   }
    // })
  }



getUsers(){
  this.db.list('usuarios').then(response =>{
    response.subscribe(lista =>{
      this.listaUsuarios = []
      lista.forEach(usr => {
        let user = usr.payload.doc.data() as User;
        user.id = usr.payload.doc.id;
        if (user.tipoUsuario != 'admin'){
          this.listaUsuarios.push(user);
        }
      })
      console.log(this.listaUsuarios)
    })
  } )
     
}



deleteUser(id){
  this.db.delete('usuarios',id).then(response =>{
    this.noti.notificacion('Usuario eliminado', 'El usuario ha sido eliminado de la lista');
  }).catch(error =>{
    this.noti.notificacion('Error', 'No se pudo eliminar el usuario ('+error+')');
  })
  this.router.navigate(['/admin'])
}

editUser(id){
  console.log(id)
  this.router.navigate(['/editar-user',id])
}

// ######################################################################################################################



  /**
 * esta funcion elimina un usuario de la lista de usuarios
 */
   eliminarUsuario(rut){//recibe como parametro el rut del usuario a eliminar
    this.storage.create();
    this.storage.get('usuarios').then((usuarios: User[]) => {
      //inicializamos el storage
      this.listaUsuarios = [];
      for (let usr of usuarios) {//recorremos el arreglo con todos los usuarios de la lista

        if(usr.rut != rut){//si el rut del usuario que itero es diferente al rut que recibimos como parametro lo agregamos a la lista de usuarios
          this.listaUsuarios.push(usr);
        }
      }
      this.storage.set('usuarios', this.listaUsuarios);//cargamos la lista de usuares en el storage
    })
    this.noti.notificacion('Usuario eliminado', 'El usuario ha sido eliminado de la lista');
    this.router.navigate(['/admin'])
  }


}
