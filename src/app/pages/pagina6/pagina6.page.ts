import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-pagina6',
  templateUrl: './pagina6.page.html',
  styleUrls: ['./pagina6.page.scss'],
})
export class Pagina6Page implements OnInit {

  constructor(
    private storage:Storage,
    private router:Router,
    private noti:NotificationService
    ) { }




  ngOnInit() {
  }

  // Controlador formulario en grupo.
  mail = new FormGroup ({
    correo : new FormControl('', [Validators.email ,Validators.required]),
    
  });

  changePass(){
    this.storage.create()
    this.storage.get('usuarios').then (  (usuarios)=>{
      let existe: boolean = false
      for(let u of usuarios){
        console.log (u)
        if (this.mail.controls.correo.value == u.correo){
          existe = true          
          break
        } 
      } 
      if (existe) {
        this.noti.notificacion ("Exito","Se ha enviado mail para restablecer su contraseña")
        this.router.navigate(['/login'])
      } else{
        this.noti.notificacion("Error","El mail ingresado no se encuentra registrado")
      }

    } )
    
    

  }

}