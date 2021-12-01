import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { AngularFireModule } from '@angular/fire/compat';

/* 
Agragamos la librerias necesarias para trabajar nuestra persistencia de forma local 

*/
import { Storage } from '@ionic/storage';// permite generar persistencia
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    Storage,
    AuthenticationService, 
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner, Base64ToGallery
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
