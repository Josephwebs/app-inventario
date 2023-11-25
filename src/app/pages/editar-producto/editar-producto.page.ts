import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  selectedProductId: number;
  inventario: any[]; // Asegúrate de tener la estructura correcta
  mdl_nombreProducto: string;
  mdl_descripcion: string;
  mdl_cantidad: number;
  mdl_precio: number;
  mdl_ubicacion: string;
  mdl_cantidadMaxima: number;
  mdl_cantidadMinima: number;
  constructor(
    private toastController: ToastController,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarInventario();
  }

  cargarInventario() {
    this.api
      .getInventario()
      .then((inventario: any[]) => {
        this.inventario = inventario;
      })
      .catch((error) => {
        console.error('Error al cargar el inventario:', error);
      });
  }

  cargarProducto() {
    if (this.selectedProductId) {
      this.api
        .getProductoPorId(this.selectedProductId)
        .then((producto: any) => {
          // Asignar los valores del producto a los campos de edición
          this.mdl_nombreProducto = producto.nombre;
          this.mdl_descripcion = producto.descripcion;
          this.mdl_cantidad = producto.cantidad;
          this.mdl_precio = producto.precio;
          this.mdl_ubicacion = producto.ubicacion;
          this.mdl_cantidadMaxima = producto.cantidad_maxima;
          this.mdl_cantidadMinima = producto.cantidad_minima;
        })
        .catch((error) => {
          console.error('Error al cargar el producto:', error);
        });
    }
  }

  guardarCambios() {
    if (this.selectedProductId) {
      const productoActualizado = {
        id_producto: this.selectedProductId,
        nombre: this.mdl_nombreProducto,
        descripcion: this.mdl_descripcion,
        cantidad: this.mdl_cantidad,
        precio: this.mdl_precio,
        ubicacion: this.mdl_ubicacion,
        cantidad_maxima: this.mdl_cantidadMaxima,
        cantidad_minima: this.mdl_cantidadMinima,
      };

      this.api
        .actualizarProducto(productoActualizado)
        .then((response: any) => {
          this.presentToast('Cambios guardados con éxito!', 'success');
          console.log('RFS: ' + response.mensaje);
        })
        .catch((error) => {
          this.presentToast('Error al guardar cambios', 'danger');
          console.error('Error al actualizar el producto:', error);
        });
    } else {
      // Manejar caso en el que no se ha seleccionado ningún producto
      console.error('No se ha seleccionado ningún producto para editar');
    }
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
