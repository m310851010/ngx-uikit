import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NkGridDirective } from './nk-grid.directive';

const COMPONENTS = [NkGridDirective];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [...COMPONENTS],
  exports: [COMPONENTS]
})
export class NkGridModule { }
