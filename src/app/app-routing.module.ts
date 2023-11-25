import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadChildren: () =>
      import('./pages/ingreso/ingreso.module').then((m) => m.IngresoPageModule),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: 'e404',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
  {
    path: 'ventas',
    loadChildren: () =>
      import('./pages/ventas/ventas.module').then((m) => m.VentasPageModule),
  },
  {
    path: 'informes',
    loadChildren: () =>
      import('./pages/informes/informes.module').then(
        (m) => m.InformesPageModule
      ),
  },
  {
    path: 'inventario',
    loadChildren: () =>
      import('./pages/inventario/inventario.module').then(
        (m) => m.InventarioPageModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'registro-producto',
    loadChildren: () =>
      import('./pages/registro-producto/registro-producto.module').then(
        (m) => m.RegistroProductoPageModule
      ),
  },
  {
    path: 'editar-producto',
    loadChildren: () =>
      import('./pages/editar-producto/editar-producto.module').then(
        (m) => m.EditarProductoPageModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
