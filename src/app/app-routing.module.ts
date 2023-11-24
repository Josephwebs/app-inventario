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
