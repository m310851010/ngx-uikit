import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkIconDirective} from './nk-icon.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NkIconDirective],
  exports: [NkIconDirective]
})
export class NkIconModule { }
