import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  inventario: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api
      .getInventario()
      .then((data: any) => {
        this.inventario = data;
      })
      .catch((error: Error) => {
        console.error('Error:', error.message);
      });
  }

  volver() {
    this.router.navigate(['principal']);
  }
}
