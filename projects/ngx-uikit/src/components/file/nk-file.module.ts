import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkFileDirective} from './nk-file.directive';

const COMPONENTS = [NkFileDirective];
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkFileModule { }
