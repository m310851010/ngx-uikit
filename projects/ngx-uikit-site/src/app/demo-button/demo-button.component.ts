import { Component, OnInit } from '@angular/core';
import {NkButtonGroupSize} from '../../../../ngx-uikit/src/components/button/nk-button-group.component';
import {NkAny} from 'ngx-uikit/core';

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
  trace(evt: NkAny): void {
    console.log(evt);
  }
}
