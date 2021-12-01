import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {


  constructor(public toastController: ToastController,
              private auth: AuthenticationService) { }


  logout(){//la funcion logout redirecciona al servicio de authentification al metodo logout y finaliza la sesion
                this.auth.logout()  
              }
 

  async crearNotificacionQR() {
    const notificacionQR = await this.toastController.create({
      message: '¡QR generado!',
      duration: 2000,
      position: 'top'
    });
    notificacionQR.present();    
  }




  ngOnInit() {
  }

}
