import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkDropDirective} from './nk-drop.directive';
import {NkDropService} from './nk-drop.service';

const COMPONENTS = [NkDropDirective];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [COMPONENTS],
  providers: [NkDropService],
  exports: []
})
export class NkDropModule { }
