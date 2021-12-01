import { Injectable } from '@angular/core';
/**
 * Vamos a importar las librerias que utilizaremos en la authentificacion de usuarios 
 */
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { NotificationService } from './notification.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
//Creamos una variable que controla la sesion del usuario

  authState = new BehaviorSubject(false);//Creamos una variable para almacenar el estado de la sesion del usuario por defecto inicializa en falso
  authUser:any;
  listaUsuarios: User[] = []

  constructor(
    private router: Router,
    private platform: Platform,
    private storage: Storage,
    private noti: NotificationService,
    private toastController: ToastController,
    private db: DatabaseService
  
  ) { }


//crea una notificacion para los accesos correctos a la aplicacion
  async notificacionIngreso() {
    const notificacionIngreso = await this.toastController.create({
      message: '¡Sesión iniciada!',
      duration: 2000,
      position: 'top'
    });
    notificacionIngreso.present();    
  }





  /**
   * Creamos una funcion login la cual recive como paramtro un usuario y una contraseña, estos son validados contra storage
   * Si las credenciales coinciden con un usuario registrado esta establece el valor de la sesion en true y redirecciona
   * a la pagina1
   */
  async login(nomUsuario: string, password: string) {

    let existe = false

    this.db.list('usuarios').then(response =>{
      response.subscribe(lista =>{
        
        lista.forEach(usr => {
          let user = usr.payload.doc.data() as User;
          user.id = usr.payload.doc.id;
          
           let ex = this.findUser(user, nomUsuario, password);
          if(ex) existe = true
        })

        if (existe) {
          //Si el nombre de usuario y la contraseña son correctos establecemos el estado de la sesion en true
          this.authState.next(true);// Establece el valor de la variable authState en true
          this.notificacionIngreso()
          this.redirect()
        }else{
          this.noti.notificacion("Error", "Usuario o contraseña incorrecto");
        }

      })
    } )

   



  }






  findUser(usuario, nomUsuario, password):boolean {

    // console.log("UserIngresado: "+nomUsuario+" PassIngresado: "+password);
    let e: boolean = false;

        console.log("User: "+usuario.nombre+" Pass: "+usuario.clave);
        
        if (usuario.nombre == nomUsuario && usuario.clave == password) {
          e = true
          this.authUser = usuario
          console.log("aca debio cambiar a true " + e);
        }
    return e;

  }


  logout() {
    // Establecemos el valor de la variable de session como falsa y redireccionamos al login
    this.authState.next(false);
    this.router.navigate(['/login']);
  }



  isAuthenticated() {
    // Devuelve el valor de la variable de session
    return this.authState.value;
  }
  
  
  redirect(){//esta funcion redirecciona al usuario a la pagina correspondiente tras realizar el login
    if(this.authUser.tipoUsuario == 'docente'){
      this.router.navigate(['/pagina2']);
    }else if(this.authUser.tipoUsuario == 'admin'){
      this.router.navigate(['/admin']);
    }else{
      this.router.navigate(['/pagina1']);
    }
  }



}
