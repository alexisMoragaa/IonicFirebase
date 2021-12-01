import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthenticationService } from 'src/app/services/authentication.service';//se importa el autentication service para usar el metodo login
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

export interface Usuario {
  rut: string,
  nombre: string,
  clave:string,
  correo: string,
  edad: string,
  tipoUsuario: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  

  //se crea la instancia de AutgenticationService en el constructor de la clase
  constructor( private router: Router, 
              private auth: AuthenticationService,
              private storage: Storage) { }


  

  ngOnInit() {    
    let u: Usuario;
    let lista: Usuario [] = [];
    u={
      rut: "20.234.234-7",
      nombre: "admin",
      clave:"admin",
      correo: "administrador@ad.cl",
      edad: "30",
      tipoUsuario: "admin"
    };
    lista.push(u);

    this.storage.create();
    this.storage.get('usuarios').then ((usuarios: Usuario[])=>{
      if(!usuarios){
        this.storage.set('usuarios',lista);
      }
    });
  }

    // Obtiene los valores del formulario login
    persona = new FormGroup ({
      usuario : new FormControl('', Validators.required),
      clave : new FormControl('', Validators.required)
    });



  ingresar(){
    this.auth.login(this.persona.controls.usuario.value, this.persona.controls.clave.value);//Usamos el metodo de login que tenemos dentro del servicio AutgenticationService
  }

  firstUsser(){
    let u: Usuario;
    let lista: Usuario [] = [];
    u={
      rut: "admin",
      nombre: "admin",
      clave:"admin",
      correo: "",
      edad: "",
      tipoUsuario: "admin"
    };
    lista.push(u);
    this.storage.create();
    this.storage.get('usuarios').then ((usuarios: Usuario[])=>{
      if(usuarios!=null){
        this.storage.set('usuario',lista);
      }
    });
  }
}
