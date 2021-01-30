import { Component, OnInit } from '@angular/core';
import {Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {CompareWith, NkCheckable, ValueFormat} from '../../../../ngx-uikit/src/components/core/type/nk-key-value';

@Component({
  selector: 'demo-checkbox',
  templateUrl: './demo-checkbox.component.html',
  styleUrls: ['./demo-checkbox.component.less']
})
export class DemoCheckboxComponent implements OnInit {

  stringOptions: string[] = ['111', '222'];
  numberOptions: number[] = [1, 2];
  singleString = '单字符串';
  singleNumber = 123;
  objectOptions: NkCheckable[] = [{nkLabel: '语文', nkValue: 1}, {nkLabel: '数学', nkValue: 2}, {nkLabel: '英语', nkValue: 3}];
  asyncOptions: Observable<NkCheckable[]> = timer(3000).pipe(map(() => {
    return [{nkLabel: 'Async语文', nkValue: 1}, {nkLabel: 'Async数学', nkValue: 2}, {nkLabel: 'Async英语', nkValue: 3}];
  }));
  anyObjectOptions: NkCheckable[] = [{name: '高级', code: 'hight', sss: 'ddd'}, {name: '中级', code: 'middle'}, {name: '初级', code: 'normal'}];

  anyValueOptions: NkCheckable[] = [
    {name: '开发', info: {name: 'zhangSan', id: 1}},
    {name: '测试', info: {name: 'LiSi', id: 2} },
    {name: '运维', info: {name: 'WangWu', id: 3}}];

  anyValueModel: {name: string, id: number}[];

  checkedOptions: NkCheckable[] = [
    {nkLabel: '语文', nkValue: 1, nkChecked: true},
    {nkLabel: '数学', nkValue: 2, nkChecked: true, nkDisabled: true},
    {nkLabel: '英语', nkValue: 3}];

  customOptions: NkCheckable[] = [
    {firstName: '张', lastName: '三', sex: 1, id: '1'},
    {firstName: '李', lastName: '四', sex: 2, id: '2'},
    {firstName: '王', lastName: '五', sex: 1, id: '3'}
  ];

  objectCheckedOptions: NkCheckable[] = [
    {nkLabel: '赵六', nkValue: {name: 'zhangSan', id: 1}},
    {nkLabel: '钱七', nkValue: {name: 'LiSi', id: 2} },
    {nkLabel: '孙八', nkValue: {name: 'WangWu', id: 3}}];

  objectCheckedModel: NkCheckable[] = [{id: 1}, {id: 3}];
  compareWith: CompareWith<NkCheckable>  = (o1, o2) =>  o1.id === o2.id;

  nkLabelFormat: ValueFormat<NkCheckable> = it => `${it.firstName}${it.lastName}(${it.sex === 1 ? '先生' : '女士' })`;
  constructor() { }

  ngOnInit(): void {
    this.anyValueModel = [this.anyValueOptions[1].info];
    setTimeout(() => this.changeData(), 5000);
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
