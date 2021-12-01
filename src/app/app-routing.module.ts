import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//importamos los servicios para controlar la autentificacion de los usuarios
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
    {
    path: '',
    redirectTo: 'pagina1',
    pathMatch: 'full'
  },
  {
    path: 'pagina1',
    loadChildren: () => import('./pages/pagina1/pagina1.module').then( m => m.Pagina1PageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'pagina2',
    loadChildren: () => import('./pages/pagina2/pagina2.module').then( m => m.Pagina2PageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'pagina3',
    loadChildren: () => import('./pages/pagina3/pagina3.module').then( m => m.Pagina3PageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'pagina4',
    loadChildren: () => import('./pages/pagina4/pagina4.module').then( m => m.Pagina4PageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios

  },
  {
    path: 'pagina5/:rut',
    loadChildren: () => import('./pages/pagina5/pagina5.module').then( m => m.Pagina5PageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'pagina6',
    loadChildren: () => import('./pages/pagina6/pagina6.module').then( m => m.Pagina6PageModule)//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/generar-qr/generar-qr.module').then( m => m.GenerarQRPageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios

  },
  {
    path: 'lista-usuarios',
    loadChildren: () => import('./pages/lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios

  },
  
  {
    path: 'editar-user/:id',
    loadChildren: () => import('./pages/editar-user/editar-user.module').then( m => m.EditarUserPageModule),
    canActivate: [AuthGuardService]//Añadimos el metodo canActivate para controlar la autentificacion de los usuarios

  },







  
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
