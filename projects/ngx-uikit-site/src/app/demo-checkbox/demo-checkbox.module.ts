import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxUikitModule} from '../../../../ngx-uikit/src/components/ngx-uikit.module';
import {DemoShareModule} from '../demo-share.module';
import {DemoCheckboxRoutingModule} from './demo-checkbox-routing.module';
import { DemoCheckboxComponent } from './demo-checkbox/demo-checkbox.component';

@NgModule({
  imports: [
    DemoShareModule,
    NgxUikitModule,
    DemoCheckboxRoutingModule
  ],
  declarations: [DemoCheckboxComponent]
})
export class DemoCheckboxModule { }
