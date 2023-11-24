import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //ruta: string = 'http://127.0.0.1:5000'; //ruta para cuando se levanta la app en web
  ruta: string = 'http://10.0.2.2:5000'; // ruta para cuando se levanta la app en emulador

  //la diferenciacion esque si usaramos la ruta localhost mientras estamos en el emulador,
  //la app detectara localhost como el mismo telefono, en este caso la ruta correcta seria la segunda

  constructor(private http: HttpClient) {}

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

  AlmacenarUsuario(correo, contrasena, nombre, apellido) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'UsuarioAlmacenar',
            parametros: [correo, contrasena, nombre, apellido],
          })
          .toPromise()
      );
    });
  }

  obtenerVentas() {
    let that = this;

    return new Promise((resolve) => {
      resolve(that.http.get(that.ruta + '/api/ultimas_ventas').toPromise());
    });
  }

  registrarAsistencia(CORREO: string, ID_CLASE: string) {
    let that = this;

    return new Promise((resolve) => {
      resolve(
        that.http
          .post(that.ruta, {
            nombreFuncion: 'AsistenciaAlmacenar',
            parametros: [CORREO, ID_CLASE],
          })
          .toPromise()
      );
    });
  }
}
