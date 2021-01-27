import {NgModule} from '@angular/core';
import {NkI18nModule} from './i18n/nk-i18n.module';
import {NkIconModule} from './icon/nk-icon.module';
import {NkRadioModule} from './radio/nk-radio.module';
import {NkCheckboxModule} from './checkbox/nk-checkbox.module';

@NgModule({
  exports: [
    NkI18nModule,
    NkIconModule,
    NkRadioModule,
    NkCheckboxModule
  ],
  declarations: []
})
export class NgxUikitModule {
}
