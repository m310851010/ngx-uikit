import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkInputDirective} from './nk-input.directive';
import {NkInputGroupComponent} from './nk-input-group.component';

const COMPONENTS = [NkInputDirective];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS, NkInputGroupComponent],
  exports: [COMPONENTS]
})
export class NkInputModule { }
