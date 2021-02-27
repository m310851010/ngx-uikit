import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NkButtonGroupComponent} from './nk-button-group.component';
import {NkButtonComponent} from './nk-button.component';
import {NkIconModule} from 'ngx-uikit/icon';
import {ObserversModule} from '@angular/cdk/observers';

const COMPONENTS = [NkButtonComponent, NkButtonGroupComponent];

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
