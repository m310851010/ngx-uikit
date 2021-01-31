import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkRadioContainerComponent} from './nk-radio-container.component';
import {NkRadioGroupComponent} from './nk-radio-group.component';
import {NkRadioDirective} from './nk-radio.directive';

const COMPONENTS = [NkRadioDirective, NkRadioGroupComponent, NkRadioContainerComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkRadioModule { }
