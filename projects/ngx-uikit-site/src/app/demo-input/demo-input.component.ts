import { Component, OnInit } from '@angular/core';
import {NkInputSize, NkInputState} from '../../../../ngx-uikit/src/components/input/nk-input.directive';

@Component({
  selector: 'demo-demo-input',
  templateUrl: './demo-input.component.html',
  styleUrls: ['./demo-input.component.less']
})
export class DemoInputComponent implements OnInit {
  nkSize: NkInputSize = 'small';
  nkState: NkInputState = 'default';
  value = 'ddds';
  colorValue = '#6cd95e';
  nkMinRows = 3;
  str = '{{ctx}}';
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.nkMinRows = 5;
    }, 2000);
  }

}
