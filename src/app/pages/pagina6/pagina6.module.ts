import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Pagina6PageRoutingModule } from './pagina6-routing.module';
import { Pagina6Page } from './pagina6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pagina6PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Pagina6Page]
})
export class Pagina6PageModule {}
