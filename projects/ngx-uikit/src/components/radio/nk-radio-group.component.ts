import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkCheckboxOption, NkRadioOption} from '../core/type/nk-types';
import {isArray, isNil} from '../core/util/nk-util';
import {NkBaseCheckbleGroupComponent} from './nk-base-checkble-group.component';

/**
 * 复选框组。 设计思想是,通过给定任意数组或Observable发射的数组创建多个复选框
 * 其中, label和value可以通过自定义属性名称或函数生成, 当ngModel
 */
@Component({
  selector: 'nk-radio-group',
  templateUrl: './nk-radio-group.component.html',
  exportAs: 'nkRadioGroup',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkRadioGroupComponent),
      multi: true
    }
  ]
})
export class NkRadioGroupComponent extends NkBaseCheckbleGroupComponent<NkRadioOption> {

  _prevOption: NkRadioOption;

  constructor(public _cdr: ChangeDetectorRef) {
    super(_cdr);
  }

  // tslint:disable-next-line
  toModelValue(value: any): any {
    if (isArray(value) && value.length) {
      return value[0];
    }
    return isNil(value) ?  null : value;
  }

  mapOptions(options: NkCheckboxOption[]): NkCheckboxOption[] {
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
  updateCheckedState(value: any | null): boolean {
   const notEmpty = super.updateCheckedState(value);
   if (notEmpty) {

     let checked = false;
     for (const opt of this._options) {
       if (checked) {
         opt.nkChecked = false;
       }
       if (opt.nkChecked) {
         checked = true;
         this._prevOption = opt;
       }
     }
   }
   return notEmpty;
  }
}
