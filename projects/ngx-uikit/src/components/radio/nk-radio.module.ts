import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkRadioDirective} from './nk-radio.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NkRadioDirective],
  exports: [NkRadioDirective]
})
export class NkRadioModule { }
