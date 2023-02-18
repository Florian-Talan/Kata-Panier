import { NgModule } from '@angular/core';

import { ProduitComponent } from './component/produit/produit.component';
import { ProduitRoutingModule } from './produit-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProduitComponent],
  imports: [SharedModule, ProduitRoutingModule],
  bootstrap: [ProduitComponent],
})
export class ProduitModule {}
