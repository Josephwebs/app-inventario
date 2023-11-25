import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroProductoPage } from './registro-producto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroProductoPageRoutingModule {}
