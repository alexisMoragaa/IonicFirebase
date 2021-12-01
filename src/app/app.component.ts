import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private auth: AuthenticationService
  ) {
    /**
     * Si no e posible cargar el home redireccionamos de forma automatica al login
     */

    auth.authState.subscribe(state => {
      
      if (state) {

        if(this.auth.authUser.tipoUsuario == 'docente'){
          this.router.navigate(['/pagina2']);
        }else{
          this.router.navigate(['/pagina1']);
        }
      }else{

        this.router.navigate(['/login']);

      }
    });
  }
  
  
}
