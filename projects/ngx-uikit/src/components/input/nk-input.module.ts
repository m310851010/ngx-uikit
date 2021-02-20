import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkInputDirective} from './nk-input.directive';
import {NkInputGroupComponent} from './nk-input-group.component';
import {NkAutosizeDirective} from './nk-autosize.directive';
import {TextFieldModule} from '@angular/cdk/text-field';
import {NkTemplateOutletModule} from '../outlet/nk-template-outlet.module';
import {NkIconModule} from '../icon/nk-icon.module';

const COMPONENTS = [NkInputDirective, NkAutosizeDirective, NkInputGroupComponent];
@NgModule({
  imports: [
    CommonModule,
    TextFieldModule,
    NkTemplateOutletModule,
    NkIconModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkInputModule { }
