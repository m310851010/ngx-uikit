import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkInputDirective} from './nk-input.directive';

const COMPONENTS = [NkInputDirective];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkInputModule { }
