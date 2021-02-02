import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemoCheckboxComponent} from './demo-checkbox/demo-checkbox.component';
import {DemoButtonComponent} from './demo-button/demo-button.component';
import {DemoRadioComponent} from './demo-radio/demo-radio.component';
import {DemoIconComponent} from './demo-icon/demo-icon.component';

const routes: Routes = [
  {path: 'checkbox', component: DemoCheckboxComponent, data: {name: 'Checkbox', cnName: '复选框'}},
  {path: 'button', component: DemoButtonComponent, data: {name: 'Button', cnName: '复选框'}},
  {path: 'radio', component: DemoRadioComponent, data: {name: 'Radio', cnName: '单选框'}},
  {path: 'icon', component: DemoIconComponent, data: {name: 'Icon', cnName: '图标'}},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
