import { ProduitCategoryFilterComponent } from './../shared/component/produit-category-filter/produit-category-filter.component';
import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { ProduitRoutingModule } from './produit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProduitCardComponent } from './component/produit-card/produit-card.component';
import { FilterProduitsByCategoryPipe } from '../shared/pipe/filter-produits-by-category.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProduitComponent,
    ProduitCardComponent,
    ProduitCategoryFilterComponent,
    FilterProduitsByCategoryPipe,
  ],
  imports: [SharedModule, ProduitRoutingModule, ReactiveFormsModule],
})
export class ProduitModule {}
