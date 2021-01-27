import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NK_I18N_TOKEN} from '../../../ngx-uikit/src/components/i18n/nk-i18n.token';
import {NgxUikitModule} from '../../../ngx-uikit/src/components/ngx-uikit.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUikitModule
  ],
  providers: [{provide: NK_I18N_TOKEN, useValue: 'zh_CN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
