import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private alert: AlertController) { }



    //crea una notificacion para los mensajes de alerta
    async notificacion(header, message){
      const alert = await this.alert.create({
        header: header,
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
}
