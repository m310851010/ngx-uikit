import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isArray, isEmpty, isNil, NkCheckboxOption} from 'ngx-uikit/core';
import {NkBaseCheckbleGroupComponent} from 'ngx-uikit/radio';

/**
 * 复选框组。 设计思想是,通过给定任意数组或Observable发射的数组创建多个复选框
 * 其中, label和value可以通过自定义属性名称或函数生成, 当ngModel
 */
@Component({
  selector: 'nk-checkbox-list',
  templateUrl: './nk-checkbox-list.component.html',
  exportAs: 'nkCheckboxList',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkCheckboxListComponent),
      multi: true
    }
  ]
})
export class NkCheckboxListComponent extends NkBaseCheckbleGroupComponent<NkCheckboxOption> {
  /**
   * ngModel绑定的值,该值通过valueFormat转换后获得
   * 如果列表为空,则设置为null,为了适应表单的required
   */
  // tslint:disable-next-line
  modelValue: any[] | null = null;

  constructor(public _cdr: ChangeDetectorRef) {
    super(_cdr);
  }

  // tslint:disable-next-line
  toModelValue(value: any): any {
    if (isEmpty(value)) {
      return null;
    }

    return isArray(value) ? value : [value];
  }

  mapOptions(options: NkCheckboxOption[]): NkCheckboxOption[] {
    return options;
  }

  /**
   * 当个界面checkbox状态变化事件
   * @param checked 是否被选中
   * @param indeterminate 是否半选
   * @param item 当前数据
   */
  // tslint:disable-next-line
  itemViewChange(checked: boolean, indeterminate: boolean, item: NkCheckboxOption): void {
    item.nkChecked = checked;
    item.nkIndeterminate = indeterminate;
    this.updateModelValue();
    this.nkOnItemChange.emit(item);
  }

  /**
   * 更新ngModel
   * @param emit 是否发布ngModelChange事件
   */
  updateModelValue(emit: boolean = true): void {
    const checkedItems = this._options.filter(val => val.nkChecked);
    const checkedValues = checkedItems.map(val => val.nkValue);
    this.modelValue = this.toModelValue(checkedValues);
    if (emit) {
      this._onChange(this.modelValue);
    }
    this.nkOnChange.emit(checkedItems);
  }

  /**
   * 获取用于检测是否选中的函数
   */
  // tslint:disable-next-line
  protected getCheckFn(value: any | null): (_v: any) => boolean {
    return isNil(value)
      // tslint:disable-next-line
      ? (_v: any) => false
      // tslint:disable-next-line
      : (_v: any) => (value as any[]).some(it => this.compareWith(_v, it));
  }

  // tslint:disable-next-line
  writeValue(obj: any[]): void {
    this.updateCheckedState(obj);
  }

  /**
   * 更新value
   */
  // tslint:disable-next-line
  updateCheckedState(value: any | null): boolean {
    this.modelValue = this.toModelValue(value);

    if (isEmpty(this._options)) {
      return false;
    }

    const fnChecked = this.getCheckFn(this.modelValue);
    this._options.forEach(it => {
      it.nkChecked = fnChecked(it.nkValue);
    });
    return true;
  }
}
