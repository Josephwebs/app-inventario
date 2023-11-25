import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.page.html',
  styleUrls: ['./registro-producto.page.scss'],
})
export class RegistroProductoPage implements OnInit {
  constructor(
    private api: ApiService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  mdl_idProducto: string;
  mdl_nombreProducto: string;
  mdl_descripcion: string;
  mdl_cantidad: number;
  mdl_precio: number;
  mdl_ubicacion: string;
  mdl_cantidadMaxima: number;
  mdl_cantidadMinima: number;

  registrarProducto() {
    const producto = {
      id_producto: this.mdl_idProducto,
      nombre: this.mdl_nombreProducto,
      descripcion: this.mdl_descripcion,
      cantidad: this.mdl_cantidad,
      precio: this.mdl_precio,
      ubicacion: this.mdl_ubicacion,
      cantidad_maxima: this.mdl_cantidadMaxima,
      cantidad_minima: this.mdl_cantidadMinima,
    };

    this.api
      .registrarProducto(producto)
      .then((response) => {
        console.log(response);
        // Restablecer los campos a valores vacíos o nulos después del registro exitoso
        this.mdl_idProducto = '';
        this.mdl_nombreProducto = '';
        this.mdl_descripcion = '';
        this.mdl_cantidad = null;
        this.mdl_precio = null;
        this.mdl_ubicacion = '';
        this.mdl_cantidadMaxima = null;
        this.mdl_cantidadMinima = null;
        this.presentToast('Articulo registrado con éxito!', 'success');
      })
      .catch((error) => {
        this.presentToast('Error al registrar articulo', 'danger');
        console.error('Error al registrar el producto:', error);
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
