import { AppRoutingModule } from './app-routing.module';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{provide: LOCALE_ID, useValue: 'fr-FR'},
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'EUR'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
