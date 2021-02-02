import { Component, OnInit } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {CompareWith, NkCheckboxOption, ValueFormat} from '../../../../ngx-uikit/src/components/core/type/nk-types';

@Component({
  selector: 'demo-checkbox',
  templateUrl: './demo-checkbox.component.html',
  styleUrls: ['./demo-checkbox.component.less']
})
export class DemoCheckboxComponent implements OnInit {
  containerModelValue = [1, 5];
  stringModelValue = '222';
  stringOptions: string[] = ['111', '222'];
  numberOptions: number[] = [1, 2];
  singleString = '单字符串';
  singleNumber = 123;
  objectOptions: NkCheckboxOption[] = [{nkLabel: '语文', nkValue: 1}, {nkLabel: '数学', nkValue: 2}, {nkLabel: '英语', nkValue: 3}];
  asyncOptions: Observable<NkCheckboxOption[]> = timer(3000).pipe(map(() => {
    return [{nkLabel: 'Async语文', nkValue: 1}, {nkLabel: 'Async数学', nkValue: 2}, {nkLabel: 'Async英语', nkValue: 3}];
  }));
  anyObjectOptions: NkCheckboxOption[] = [{name: '高级', code: 'hight', sss: 'ddd'}, {name: '中级', code: 'middle'}, {name: '初级', code: 'normal'}];
  anyValueOptions: NkCheckboxOption[] = [
    {name: '开发', info: {name: 'zhangSan', id: 1}},
    {name: '测试', info: {name: 'LiSi', id: 2} },
    {name: '运维', info: {name: 'WangWu', id: 3}}];

  anyValueModel: {name: string, id: number}[];

  checkedOptions: NkCheckboxOption[] = [
    {nkLabel: '语文', nkValue: 1, nkChecked: true},
    {nkLabel: '数学', nkValue: 2, nkChecked: true, nkDisabled: true},
    {nkLabel: '英语', nkValue: 3}];

  customOptions: NkCheckboxOption[] = [
    {firstName: '张', lastName: '三', sex: 1, id: '1'},
    {firstName: '李', lastName: '四', sex: 2, id: '2'},
    {firstName: '王', lastName: '五', sex: 1, id: '3'}
  ];

  objectCheckedOptions: NkCheckboxOption[] = [
    {nkLabel: '赵六', nkValue: {name: 'zhangSan', id: 1}},
    {nkLabel: '钱七', nkValue: {name: 'LiSi', id: 2} },
    {nkLabel: '孙八', nkValue: {name: 'WangWu', id: 3}}];

  objectCheckedModel: NkCheckboxOption[] = [{id: 1}, {id: 3}];
  compareWith: CompareWith<NkCheckboxOption>  = (o1, o2) =>  o1.id === o2.id;

  nkLabelFormat: ValueFormat<NkCheckboxOption> = it => `${it.firstName}${it.lastName}(${it.sex === 1 ? '先生' : '女士' })`;
  constructor() { }

  ngOnInit(): void {
    this.anyValueModel = [this.anyValueOptions[1].info];

    setTimeout(() => {
      this.changeData();
      this.objectOptions = [...this.objectOptions, {nkLabel: '化学', nkValue: 5}];
    }, 5000);
  }

  changeData(): void {
    this.singleString = '测试';
  }

  // tslint:disable-next-line
  trace(evt: any, tag: string) {
    console.log(`[${tag}] `, evt);
    console.log(this.anyValueModel);
  }
}
