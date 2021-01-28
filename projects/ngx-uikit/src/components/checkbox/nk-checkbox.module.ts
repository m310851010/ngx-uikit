import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkCheckboxDirective} from './nk-checkbox.directive';
import {NkCheckboxGroupComponent} from './nk-checkbox-group.component';
import { NkCheckboxContainerComponent } from './nk-checkbox-container.component';

const COMPONENTS = [NkCheckboxDirective, NkCheckboxGroupComponent, NkCheckboxContainerComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkCheckboxModule { }
