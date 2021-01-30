import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DemoCheckboxComponent} from './demo-checkbox/demo-checkbox.component';
import {DemoButtonComponent} from './demo-button/demo-button.component';

const routes: Routes = [
  {path: 'checkbox', component: DemoCheckboxComponent, data: {name: 'Checkbox', cnName: '复选框'}},
  {path: 'button', component: DemoButtonComponent, data: {name: 'Button', cnName: '复选框'}},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
