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
  value = 'XXXX';
  colorValue = '#6cd95e';
  constructor() { }

  ngOnInit(): void {
  }

}
