import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxUikitModule} from '../../../ngx-uikit/src/components/ngx-uikit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUikitModule
  ],
  declarations: [],
  exports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUikitModule]
})
export class DemoShareModule { }
