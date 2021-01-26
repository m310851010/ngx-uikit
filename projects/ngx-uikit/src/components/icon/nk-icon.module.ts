import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IconDirective} from './icon.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IconDirective],
  exports: [IconDirective]
})
export class NkIconModule { }
