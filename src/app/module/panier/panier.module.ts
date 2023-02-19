import { PanierComponent } from './component/panier/panier.component';
import { PannierRoutingModule } from './panier-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PanierComponent],
  imports: [SharedModule, PannierRoutingModule],
})
export class PanierModule {}
