import { PanierService } from './service/panier.service';
import { ProduitCategoryFilterComponent } from './component/produit/produit-category-filter/produit-category-filter.component';
import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProduitCardComponent } from './component/produit/produit-card/produit-card.component';
import { FilterProduitsByCategoryPipe } from './pipe/filter-produits-by-category.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from './service/produit.service';
import { PanierComponent } from './component/panier/panier.component';
import { MainComponent } from './component/main/main.component';
import { PanierLineComponent } from './component/panier/panier-line/panier-line.component';
import { PanierResumeComponent } from './component/panier/panier-resume/panier-resume.component';

@NgModule({
  declarations: [
    ProduitComponent,
    ProduitCardComponent,
    ProduitCategoryFilterComponent,
    PanierComponent,
    PanierLineComponent,
    FilterProduitsByCategoryPipe,
    MainComponent,
    PanierResumeComponent,
  ],
  imports: [SharedModule, HomeRoutingModule, ReactiveFormsModule],
  providers: [PanierService, ProduitService],
})
export class HomeModule {}