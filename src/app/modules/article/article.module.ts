import { PanierService } from './service/panier.service';
import { ProduitCategoryFilterComponent } from './component/produit/produit-category-filter/produit-category-filter.component';
import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProduitCardComponent } from './component/produit/produit-card/produit-card.component';
import { FilterProduitsByCategoryPipe } from './pipe/filter-produits-by-category.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProduitService } from './service/produit.service';
import { PanierComponent } from './component/panier/panier.component';
import { PanierLineComponent } from './component/panier/panier-line/panier-line.component';
import { PanierResumeComponent } from './component/panier/panier-resume/panier-resume.component';
import { TaxService } from './service/tax.service';

@NgModule({
  declarations: [
    ProduitComponent,
    ProduitCardComponent,
    ProduitCategoryFilterComponent,
    PanierComponent,
    PanierLineComponent,
    FilterProduitsByCategoryPipe,
    PanierResumeComponent,
  ],
  imports: [SharedModule, ArticleRoutingModule, ReactiveFormsModule],
  providers: [PanierService, ProduitService, TaxService],
})
export class ArticleModule {}
