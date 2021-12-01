import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {

  // Variable para obtener la fecha actual (al momento de generar el QR).
  momento = new Date();

  // Ordenar las partes de la fecha actual (dia, mes, año, hora y minuto)
  momentoDia = this.momento.getDate();
  momentoMes = this.momento.getMonth() + 1;
  momentoAnio = this.momento.getFullYear();
  momentoHora = this.momento.getHours();
  momentoMinuto = this.momento.getMinutes();

  // Transformar fecha y hora a un formato legible.
  momentoString = this.momentoDia + "/" + this.momentoMes + "/" +
                  this.momentoAnio + " " + this.momentoHora + ":" +
                  this.momentoMinuto;

  // Variable donde guardaremos el codigo QR. (Información del QR).
  qrData = this.momentoString;

  // Tipo de elemento posible a leer y generar. (Formato del QR).
  elementType : 'url' | 'img' | 'canvas' = 'canvas';

  // Constructor con Codigo QR.
  constructor(private barcodeScanner:BarcodeScanner, private base64ToGallery:Base64ToGallery) { }

  ngOnInit() {
  }

}
