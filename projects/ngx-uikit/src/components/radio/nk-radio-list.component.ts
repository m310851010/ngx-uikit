import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isEmpty, isNil, NkRadioOption} from 'ngx-uikit/core';
import {NkBaseCheckbleGroupComponent} from './nk-base-checkble-group.component';

/**
 * 复选框组。 设计思想是,通过给定任意数组或Observable发射的数组创建多个复选框
 * 其中, label和value可以通过自定义属性名称或函数生成, 当ngModel
 */
@Component({
  selector: 'nk-radio-list',
  templateUrl: './nk-radio-list.component.html',
  exportAs: 'nkRadioList',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkRadioListComponent),
      multi: true
    }
  ]
})
export class NkRadioListComponent extends NkBaseCheckbleGroupComponent<NkRadioOption> {

  _prevOption: NkRadioOption | null;

  constructor(public _cdr: ChangeDetectorRef) {
    super(_cdr);
  }

  // tslint:disable-next-line
  toModelValue(value: any): any {
    return isNil(value) ?  null : value;
  }

  mapOptions(options: NkRadioOption[]): NkRadioOption[] {
    let checked = false;
    for (const opt of options) {
      if (checked) {
        opt.nkChecked = false;
      }
      if (opt.nkChecked) {
        checked = true;
      }
    }
    return options;
  }

  /**
   * 获取用于检测是否选中的函数
   */
  // tslint:disable-next-line
  protected getCheckFn(value: any | null): (_v: any) => boolean {
    let checked: boolean;
    return isNil(value)
      // tslint:disable-next-line
      ? (_v: any) => false
      // tslint:disable-next-line
      : (_v: any) => {
        if (!checked) {
          checked = this.compareWith(_v, value);
          return checked;
        }
        return  false;
      };
  }

  /**
   * 当个界面checkbox状态变化事件
   * @param checked 是否被选中
   * @param item 当前数据
   */
  // tslint:disable-next-line
  itemViewChange(checked: boolean, item: NkRadioOption): void {
    item.nkChecked = checked;
    this.updateModelValue();
    this.nkOnItemChange.emit(item);
  }

  /**
   * 更新ngModel
   * @param emit 是否发布ngModelChange事件
   */
  updateModelValue(emit: boolean = true): void {
    let checkedItem: NkRadioOption | null = null;
    for (const opt of this._options) {
      if (checkedItem) {
        opt.nkChecked = false;
      }
      if (opt.nkChecked) {
        checkedItem = opt;
      }
    }

    this.modelValue = this.toModelValue(checkedItem ? checkedItem.nkValue : null);
    if (emit) {
      this._onChange(this.modelValue);
    }
    this.nkOnChange.emit(checkedItem);
  }

  handleItemClick(arg: { nkOption: NkRadioOption, clickEvent: MouseEvent}): void {
    this.nkOnItemClick.emit(arg);
    if (this._prevOption === arg.nkOption) {
      return ;
    }
    if (this._prevOption) {
      this._prevOption.nkChecked = false;
    }
    this._prevOption = arg.nkOption;
  }

  // tslint:disable-next-line
  writeValue(obj: any[]): void {
    this.modelValue = this.toModelValue(obj);

    if (isEmpty(this._options)) {
      this._prevOption = null;
      return;
    }

    const fnChecked = this.getCheckFn(this.modelValue);
    this._options.forEach(it => {
      it.nkChecked = fnChecked(it.nkValue);
      if (it.nkChecked) {
        this._prevOption = it;
      }
    });
  }
}
