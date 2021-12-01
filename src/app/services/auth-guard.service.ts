import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private authService: AuthenticationService
    ) {}

/**
  Esta funcion sobreescribe la funcion canActivate y es usado en el archivo de rutas 
  para comprobar el estado de session de nuestra aplicacion 
 */
    canActivate(): boolean {
      return this.authService.isAuthenticated();
    }



}
