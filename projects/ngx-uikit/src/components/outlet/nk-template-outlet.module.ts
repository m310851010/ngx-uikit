import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkTemplateOutletDirective} from './nk-template-outlet.directive';

const COMPONENTS = [NkTemplateOutletDirective];
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkTemplateOutletModule { }
