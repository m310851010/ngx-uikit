import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NkI18nModule} from '../../../ngx-uikit/src/components/i18n/nk-i18n.module';
import {NK_I18N_TOKEN} from '../../../ngx-uikit/src/components/i18n/nk-i18n.token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NkI18nModule
  ],
  providers: [{provide: NK_I18N_TOKEN, useValue: 'en_US'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
