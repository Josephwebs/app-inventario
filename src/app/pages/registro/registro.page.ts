import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  mdl_correo: string;
  mdl_pass: string;
  mdl_rol: string;
  constructor(
    private api: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  registrarUser() {
    const data = {
      nombre_usuario: this.mdl_correo,
      contrasena: this.mdl_pass,
      rol_id: this.mdl_rol,
    };

    this.api
      .registrarUsuario(data)
      .then((response) => {
        this.presentToast('Usuario registrado con exito!', 'success');
      })
      .catch((error) => {
        // Manejar errores
        this.presentToast('Error al registrar usuario', 'danger');
      });
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

  volver() {
    this.router.navigate(['principal']);
  }
}
