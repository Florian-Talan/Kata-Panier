import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './component/main/main.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
