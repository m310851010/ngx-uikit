import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NK_I18N_TOKEN} from '../../../ngx-uikit/src/components/i18n/nk-i18n.token';
import {DemoCheckboxComponent} from './demo-checkbox/demo-checkbox.component';
import {DemoButtonComponent} from './demo-button/demo-button.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxUikitModule} from '../../../ngx-uikit/src/components/ngx-uikit.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoCheckboxComponent,
    DemoButtonComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUikitModule,
    AppRoutingModule,
  ],
  providers: [{provide: NK_I18N_TOKEN, useValue: 'zh_CN'}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
