import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NkPopoverComponent } from './nk-popover.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    A11yModule,
    OverlayModule
  ],
  declarations: [NkPopoverComponent]
})
export class NkPopoverModule { }
