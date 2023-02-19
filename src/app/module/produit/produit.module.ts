import { ProduitCategoryFilterComponent } from './../shared/component/produit-category-filter/produit-category-filter.component';
import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { ProduitRoutingModule } from './produit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProduitCardComponent } from './component/produit-card/produit-card.component';
import { FilterProduitsByCategoryPipe } from '../shared/pipe/filter-produits-by-category.pipe';

@NgModule({
  declarations: [
    ProduitComponent,
    ProduitCardComponent,
    ProduitCategoryFilterComponent,
    FilterProduitsByCategoryPipe,
  ],
  imports: [SharedModule, ProduitRoutingModule],
})
export class ProduitModule {}
