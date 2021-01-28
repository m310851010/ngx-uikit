import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DemoCheckboxComponent} from './demo-checkbox/demo-checkbox.component';

const routes: Routes = [
  { path: 'index', component: DemoCheckboxComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoCheckboxRoutingModule {}
