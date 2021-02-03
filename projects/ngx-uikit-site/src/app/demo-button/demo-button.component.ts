import { Component, OnInit } from '@angular/core';
import {NkButtonGroupSize} from '../../../../ngx-uikit/src/components/button/nk-button-group.component';

@Component({
  selector: 'demo-button',
  templateUrl: './demo-button.component.html',
  styleUrls: ['./demo-button.component.less']
})
export class DemoButtonComponent implements OnInit {

  groupSize: NkButtonGroupSize = 'default';
  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:no-any
  trace(evt: any): void {
    console.log(evt);
  }
}
