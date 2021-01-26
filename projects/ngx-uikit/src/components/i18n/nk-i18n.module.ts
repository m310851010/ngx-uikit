import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NkI18nPipe} from './nk-i18n.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NkI18nPipe],
  exports: [NkI18nPipe],
  providers: [DatePipe]
})
export class NkI18nModule { }
