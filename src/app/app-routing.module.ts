import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { path } from './data/path.data';

const routes: Routes = [
  {
    path: path.produit.relative,
    loadChildren: () =>
      import('./module/produit/produit.module').then((m) => m.ProduitModule),
  },
  {
    path: path.panier.relative,
    loadChildren: () =>
      import('./module/panier/panier.module').then((m) => m.PanierModule),
  },
  {
    path: '**',
    redirectTo: path.produit.relative,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
