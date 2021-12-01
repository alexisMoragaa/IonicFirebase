import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { NotificationService } from '../notification.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore : AngularFirestore, private noti: NotificationService) { }


  async add(key,data){
    try{
      await this.firestore.collection(key).add(data);
      this.noti.notificacion("Exito","El registro se agrego con exito");
    }catch(e){
      this.noti.notificacion('Error', 'Error al guardar registro: ('+e+')');
    }
  }

  

  async delete(key, id){
    try{
      await this.firestore.collection(key).doc(id).delete();
    }catch(e){
      this.noti.notificacion('Error', 'Error al eliminar registro: ('+e+')');
    }
  }


  async show(key, id){
    try{
      return await this.firestore.collection(key).doc(id).get();
    }catch(e){
      this.noti.notificacion('Error', 'Error al mostrar registro: ('+e+')');
    }
  }



  async list(key){
    try{
      return await this.firestore.collection(key).snapshotChanges()
    }catch(e){
      this.noti.notificacion('Error', 'Error al listar registros: ('+e+')');
    }
  }



 async update(key, id, data){
    try{
      await this.firestore.collection(key).doc(id).set(data);
      this.noti.notificacion("Exito","El registro se actualizo con exito");
    }catch(e){
      this.noti.notificacion('Error', 'Error al actualizar registro: ('+e+')');
    }
  
  }
  


}
