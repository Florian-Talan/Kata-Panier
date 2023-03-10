import { path } from './resource/path.data';
import { ProduitComponent } from './component/produit/produit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PanierComponent } from './component/panier/panier.component';

const routes: Routes = [
  {
    path: path.produit.relative,
    component: ProduitComponent,
  },
  {
    path: path.panier.relative,
    component: PanierComponent,
  },
  {
    path: '**',
    redirectTo: path.produit.relative,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
