import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroProductoPageRoutingModule } from './registro-producto-routing.module';

import { RegistroProductoPage } from './registro-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroProductoPageRoutingModule
  ],
  declarations: [RegistroProductoPage]
})
export class RegistroProductoPageModule {}
