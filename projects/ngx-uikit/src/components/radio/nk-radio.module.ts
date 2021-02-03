import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkRadioGroupComponent} from './nk-radio-group.component';
import {NkRadioListComponent} from './nk-radio-list.component';
import {NkRadioDirective} from './nk-radio.directive';
import {NkRadioButtonComponent} from './nk-radio-button.component';

const COMPONENTS = [NkRadioDirective, NkRadioListComponent, NkRadioGroupComponent, NkRadioButtonComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkRadioModule { }
