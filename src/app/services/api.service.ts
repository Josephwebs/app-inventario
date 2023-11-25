import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ruta: string = 'http://127.0.0.1:5000'; //ruta para cuando se levanta la app en web
  //ruta: string = 'http://10.0.2.2:5000'; // ruta para cuando se levanta la app en emulador

  //la diferenciacion esque si usaramos la ruta localhost mientras estamos en el emulador,
  //la app detectara localhost como el mismo telefono, en este caso la ruta correcta seria la segunda

  constructor(private http: HttpClient) {}

  //Seccion de login

  loginPersona(correo, contrasena) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.ruta + '/api/login', {
          nombre_usuario: correo,
          contrasena: contrasena,
        })
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: DOMException) => {
          console.error('RDS Error:', error.message);
          reject(error);
        });
    });
  }

  //generacion de informes desde pagina
  getInformes(torta: string, tabla: string, grafico: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.ruta + '/v2/api/informes', {
          params: {
            torta: torta,
            tabla: tabla,
            grafico: grafico,
          },
        })
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: Error) => {
          console.error('RDS Error:', error.message);
          reject(error);
        });
    });
  }

  // obtiene todos los productos en inventario

  getInventario() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.ruta + '/api/inventario')
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: Error) => {
          console.error('RDS Error:', error.message);
          reject(error);
        });
    });
  }

  obtenerVentas() {
    let that = this;

    return new Promise((resolve) => {
      resolve(that.http.get(that.ruta + '/api/ultimas_ventas').toPromise());
    });
  }

  registrarUsuario(data: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.ruta + '/api/register', data) // Cambiado a '/api/register'
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: DOMException) => {
          console.error('Error al registrar usuario:', error.message);
          reject(error);
        });
    });
  }

  registrarProducto(producto: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.ruta + '/api/registrar_producto', producto)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: DOMException) => {
          console.error('Error al registrar el producto:', error.message);
          reject(error);
        });
    });
  }

  actualizarProducto(productoActualizado: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.ruta}/api/actualizar_producto`, productoActualizado)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: Error) => {
          console.error('Error al actualizar el producto:', error.message);
          reject(error);
        });
    });
  }

  getProductoPorId(id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.ruta}/api/inventario/${id}`)
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((error: Error) => {
          console.error('Error al obtener el producto por ID:', error.message);
          reject(error);
        });
    });
  }
}
