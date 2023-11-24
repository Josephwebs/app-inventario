import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  ventas: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas() {
    this.api
      .obtenerVentas()
      .then((respuesta: any) => {
        // Elimina el primer elemento
        respuesta.ultimas_ventas.shift();

        // Ordena las ventas por fecha de la más reciente a la más antigua
        this.ventas = respuesta.ultimas_ventas.sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
      })
      .catch((error) => {
        console.error('Error al obtener las ventas:', error);
      });
  }

  volver() {
    this.router.navigate(['principal']);
  }
}
