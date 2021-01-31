import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkCheckboxOption} from '../core/type/nk-types';
import {isArray, isEmpty} from '../core/util/nk-util';
import {NkBaseCheckbleGroupComponent} from '../radio/nk-base-checkble-group.component';

/**
 * 复选框组。 设计思想是,通过给定任意数组或Observable发射的数组创建多个复选框
 * 其中, label和value可以通过自定义属性名称或函数生成, 当ngModel
 */
@Component({
  selector: 'nk-checkbox-group',
  templateUrl: './nk-checkbox-group.component.html',
  exportAs: 'nkCheckboxGroup',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkCheckboxGroupComponent),
      multi: true
    }
  ]
})
export class NkCheckboxGroupComponent extends NkBaseCheckbleGroupComponent<NkCheckboxOption> {
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
}
