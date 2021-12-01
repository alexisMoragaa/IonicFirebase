import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  constructor(public toastController: ToastController, private router: Router, private auth: AuthenticationService) { }



  ngOnInit() {
  }

  

  logout(){//la funcion logout redirecciona al servicio de authentification al metodo logout y finaliza la sesion
    this.auth.logout()  
  }



    restartPass(rut:string){
      //esta funcion redirecciona  a la pagina 5 enviando el username como parametro
      this.router.navigate(['/pagina5',rut])
    }


}
