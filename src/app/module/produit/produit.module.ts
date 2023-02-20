import { PanierService } from './service/panier.service';
import { ProduitCategoryFilterComponent } from './../shared/component/produit-category-filter/produit-category-filter.component';
import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { ProduitRoutingModule } from './produit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProduitCardComponent } from './component/produit/produit-card/produit-card.component';
import { FilterProduitsByCategoryPipe } from '../shared/pipe/filter-produits-by-category.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from './service/produit.service';
import { PanierComponent } from './component/panier/panier.component';
import { MainComponent } from './component/main/main.component';
import { PanierLineComponent } from './component/panier/panier-line/panier-line.component';

@NgModule({
  declarations: [
    ProduitComponent,
    ProduitCardComponent,
    ProduitCategoryFilterComponent,
    PanierComponent,
    PanierLineComponent,
    FilterProduitsByCategoryPipe,
    MainComponent,
  ],
  imports: [SharedModule, ProduitRoutingModule, ReactiveFormsModule],
  providers: [PanierService, ProduitService],
})
export class ProduitModule {}
