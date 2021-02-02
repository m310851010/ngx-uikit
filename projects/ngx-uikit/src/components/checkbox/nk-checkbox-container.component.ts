import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkCheckboxOption} from '../core/type/nk-types';
import {NkCheckboxDirective} from './nk-checkbox.directive';
import {isArray, isEmpty, isNil, isNotNil} from '../core/util/nk-util';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

/**
 * nk-checkbox容器,可以访问子节点的nk-checkbox
 *
 */
@Component({
  selector: 'nk-checkbox-container',
  template: '<ng-content></ng-content>',
  exportAs: 'nkCheckboxContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkCheckboxContainerComponent),
      multi: true
    }
  ]
})
export class NkCheckboxContainerComponent implements OnInit, ControlValueAccessor {
  /**
   * ngModel绑定的值,该值通过valueFormat转换后获得
   * 如果列表为空,则设置为null,为了适应表单的required
   */
    // tslint:disable-next-line
  modelValue: any[] | null = null;

  /**
   * 触发ngModelChange的同时触发该事件,当所有复选框都没被选中时返回空数组
   */
  @Output() nkOnChange = new EventEmitter<NkCheckboxOption[]>();
  /**
   * 当前复选框状态改变时触发该事件
   */
  @Output() nkOnItemChange = new EventEmitter<NkCheckboxOption>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkItemChange
   */
  @Output() nkOnItemClick = new EventEmitter<{nkOption: NkCheckboxOption, clickEvent: MouseEvent}>();

  /**
   * 所有子节点的checkbox
   */
  _childrenNodes: NkCheckboxDirective[] = [];
  _onChange = (_: object | null) => { };
  _onTouched = () => { };

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: (_: object | null) => { }): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  // tslint:disable-next-line
  writeValue(value: any[]): void {
    this.modelValue = isEmpty(value) ? null : (isArray(value) ? value : [value]);
    this._childrenNodes.forEach(child => child.modelValue = this.modelValue);
    this.updateChildrenCheckedState();
  }

  setDisabledState(isDisabled: boolean): void {
    this._childrenNodes.forEach(value => value.setDisabledState(isDisabled));
  }

  updateChildrenCheckedState(): void {
    if (isEmpty(this._childrenNodes)) {
      return ;
    }

    if (isNil(this.modelValue)) {
      this._childrenNodes
        .filter(ck => ck.getCheckedState())
        .forEach(ck => {
          ck.setCheckedState(false);
        });
      return ;
    }

    this._childrenNodes.forEach(ck => ck.updateCheckedState());
  }

  /**
   * 更新ngModel的值
   * @param emit 是否发布ngModelChange事件
   */
  updateModelValue(emit: boolean = true): void {
    const checkedItems = this._childrenNodes.filter(it => it.getCheckedState());
    const checkedValues = checkedItems.map(it => it.nkValue);
    this.modelValue = isEmpty(checkedValues) ? null : checkedValues;
    const checkedOptions = checkedItems.map<NkCheckboxOption>(this._childToNkCheckboxOption);
    if (emit) {
      this._onChange(this.modelValue);
    }
    this.nkOnChange.emit(checkedOptions);
  }

  /**
   * 子节点checkbox注册到该容
   * @param child 节点checkbox
   */
  registerChild(child: NkCheckboxDirective): void {
    this._childrenNodes.push(child);
    child.modelValue = this.modelValue;
    child.updateCheckedState();

    child.nkOnChange.subscribe(() => {
      this.updateModelValue();
      this.nkOnItemChange.emit(this._childToNkCheckboxOption(child));
    });
  }

  /**
   * 把NkCheckboxDirective转换为NkCheckboxOption
   * @param checkbox NkCheckboxDirective
   */
  private _childToNkCheckboxOption(checkbox: NkCheckboxDirective): NkCheckboxOption {
    return {
      nkValue: checkbox.nkValue,
      nkChecked: checkbox.nkValue !== null,
      nkLabel: checkbox.nkLabel,
      nkDisabled: checkbox.nkDisabled,
      nkIndeterminate: checkbox.nkIndeterminate
    } as NkCheckboxOption;
  }

  /**
   * 删除子节点的checkbox
   * @param child 子节点的checkbox
   */
  removeChild(child: NkCheckboxDirective): boolean {
    const index = this._childrenNodes.indexOf(child);
    if (index > -1) {
      this._childrenNodes.splice(index, 1);
      return true;
    }
    return false;
  }
}
