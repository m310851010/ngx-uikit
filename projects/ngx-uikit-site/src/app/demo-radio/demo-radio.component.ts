import { Component, OnInit } from '@angular/core';
import {NkRadioOption} from '../../../../ngx-uikit/src/components/core/type/nk-types';

@Component({
  selector: 'demo-demo-radio',
  templateUrl: './demo-radio.component.html',
  styleUrls: ['./demo-radio.component.less']
})
export class DemoRadioComponent implements OnInit {

  value = '2';
  nkOptions: NkRadioOption[] = [
    {nkLabel: 'dddd', nkValue: '1', nkChecked: true},
    {nkLabel: 'dddd', nkValue: '2', nkChecked: true}
    ];
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
    }, 2000);
  }

  // tslint:disable-next-line:no-any
  trace(evt: any): void {
    console.log(evt);
  }
}
