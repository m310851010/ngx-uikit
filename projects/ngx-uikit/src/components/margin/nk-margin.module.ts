import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NkMarginDirective } from './nk-margin.directive';
const COMPONENTS = [NkMarginDirective];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkMarginModule { }
