import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NkPaddingDirective } from './nk-padding.directive';

const COMPONENTS = [NkPaddingDirective];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: COMPONENTS
})
export class NkPaddingModule { }
