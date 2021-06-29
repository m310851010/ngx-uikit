import { Component, OnInit } from '@angular/core';
import {NkAny, NkRadioOption} from '../../../../ngx-uikit/src/components/core/type/nk-types';

@Component({
  selector: 'demo-demo-radio',
  templateUrl: './demo-radio.component.html',
  styleUrls: ['./demo-radio.component.less']
})
export class DemoRadioComponent implements OnInit {

  value = '2';
  nkOptions: NkRadioOption[] = [
    {nkLabel: 'AAA', nkValue: '1', nkChecked: true},
    {nkLabel: 'BBB', nkValue: '2'},
    {nkLabel: 'CCC', nkValue: '3'}
    ];
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
    }, 2000);
  }

  changeValue(): void {
    this.value = '3';
  }

  trace(evt: NkAny): void {
    console.log(evt);
  }
}
