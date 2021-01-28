import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NK_I18N_TOKEN} from '../../../ngx-uikit/src/components/i18n/nk-i18n.token';
import {DemoCheckboxModule} from './demo-checkbox/demo-checkbox.module';
import {DemoShareModule} from './demo-share.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DemoShareModule,
    AppRoutingModule,
    DemoCheckboxModule,
  ],
  providers: [{provide: NK_I18N_TOKEN, useValue: 'zh_CN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
