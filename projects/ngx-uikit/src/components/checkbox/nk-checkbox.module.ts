import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkCheckboxDirective} from './nk-checkbox.directive';
import {NkCheckboxGroupComponent} from './nk-checkbox-group.component';

const COMPONENTS = [NkCheckboxDirective, NkCheckboxGroupComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkCheckboxModule { }
