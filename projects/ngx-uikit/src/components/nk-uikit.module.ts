import {NgModule} from '@angular/core';
import {NkI18nModule} from './i18n/nk-i18n.module';
import {NkIconModule} from './icon/nk-icon.module';

@NgModule({
  exports: [
    NkI18nModule,
    NkIconModule
  ]
})
export class NkUikitModule {
}
