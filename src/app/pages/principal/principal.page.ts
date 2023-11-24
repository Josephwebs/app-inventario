import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  nombre: string;
  rol: number;

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private api: ApiService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    let idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario && idUsuario.length > 2) {
      this.nombre = idUsuario.substring(1, idUsuario.length - 1);
    }
    let rol_id = localStorage.getItem('rolId');
    if (rol_id !== null) {
      this.rol = Number(rol_id);
    }
  }

  cerrarSesion() {
    let extras: NavigationExtras = {
      replaceUrl: true,
      state: {},
    };
    localStorage.removeItem('idUsuario');
    this.router.navigate(['ingreso'], extras);
  }

  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
      color: color,
    });

    await toast.present();
  }

  capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  openFourthMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.open('fourth-menu');
  }

  openSecondMenu() {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    this.menuCtrl.open('second-menu');
  }

  openEndMenu() {
    /**
     * Open the menu by side
     * We can refer to the menu by side
     * here because only one "end" menu exists
     */
    this.menuCtrl.open('end');
  }

  ventas() {
    this.router.navigate(['ventas']);
  }
}
