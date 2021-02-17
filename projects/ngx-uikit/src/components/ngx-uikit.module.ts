import {NgModule} from '@angular/core';
import {NkI18nModule} from './i18n/nk-i18n.module';
import {NkIconModule} from './icon/nk-icon.module';
import {NkMarginModule} from './margin/nk-margin.module';
import {NkPaddingModule} from './padding/nk-padding.module';
import {NkRadioModule} from './radio/nk-radio.module';
import {NkCheckboxModule} from './checkbox/nk-checkbox.module';
import {NkButtonModule} from './button/nk-button.module';
import {NkInputModule} from './input/nk-input.module';
import {NkFileModule} from './file/nk-file.module';

@NgModule({
  exports: [
    NkI18nModule,
    NkIconModule,
    NkRadioModule,
    NkCheckboxModule,
    NkButtonModule,
    NkInputModule,
    NkFileModule,
    NkMarginModule,
    NkPaddingModule
  ],
})
export class NgxUikitModule {
}
