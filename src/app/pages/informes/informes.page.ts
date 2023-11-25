import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { File } from '@ionic-native/file/ngx';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {
  data: any;
  imgSrc: SafeUrl;
  imgSrc2: SafeUrl;
  constructor(
    private api: ApiService,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  volver() {
    this.router.navigate(['principal']);
  }

  async openModal(data: string, type: string) {
    let img1 = 'no';
    let tabla = 'no';
    let img2 = 'no';

    switch (data) {
      case 'torta':
        img1 = 'si';
        break;
      case 'tabla':
        tabla = 'si';
        break;
      case 'grafico':
        img2 = 'si';
        break;
    }

    // Crear el loading
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });

    // Mostrar el loading
    await loading.present();

    this.api
      .getInformes(img1, tabla, img2)
      .then((response: any) => {
        let data;
        switch (type) {
          case 'image/png':
            data = response.img_base64;
            if (img2 === 'si') {
              data = response.img_base64_2;
            }
            break;
          case 'text/html':
            data = response.tablas;
            break;
        }
        this.presentModal(data, type);
        loading.dismiss();
      })
      .catch((error) => {
        // Cerrar el loading en caso de error
        loading.dismiss();
        console.error('Error:', error.message);
        this.presentToast(
          'Hubo un error al cargar los datos, intente nuevamente',
          'danger'
        );
      });
  }

  async presentModal(data: string, type: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        data: data,
        type: type,
      },
    });
    return await modal.present();
  }

  async presentToast(mensaje, color) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1700,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }
}
