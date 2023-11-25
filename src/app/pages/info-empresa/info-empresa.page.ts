import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.page.html',
  styleUrls: ['./info-empresa.page.scss'],
})
export class InfoEmpresaPage implements OnInit {
  informacionEmpresa: any;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.obtenerInformacionEmpresa();
  }

  obtenerInformacionEmpresa() {
    this.api
      .obtenerInformacionEmpresa()
      .then((data) => {
        this.informacionEmpresa = data;
        console.log('Información de la empresa:', this.informacionEmpresa);
      })
      .catch((error) => {
        console.error(
          'Error al obtener información de la empresa:',
          error.message
        );
      });
  }
  volver() {
    this.router.navigate(['principal']);
  }
}
