import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkButtonComponent} from './nk-button.component';
import {NkIconModule} from '../icon/nk-icon.module';
import {ObserversModule} from '@angular/cdk/observers';

const COMPONENTS = [NkButtonComponent];

@NgModule({
  imports: [
    CommonModule,
    ObserversModule,
    NkIconModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class NkButtonModule { }
