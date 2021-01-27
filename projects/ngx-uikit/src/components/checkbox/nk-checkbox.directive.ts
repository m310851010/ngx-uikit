import {ChangeDetectionStrategy, Directive, ElementRef, forwardRef, Input, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith} from '../core/type/nk-key-value';

/**
 * checkbox指令, 注:不需要添加type="checkbox"
 * @example
 * <input nk-checkbox>
 */
@Directive({
  selector: 'input[nk-checkbox]',
  exportAs: 'nkCheckbox',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NkCheckboxDirective),
    multi: true,
  }],
  host: {
    class: 'nk-checkbox',
    type: 'checkbox',
    '[disabled]': 'nkDisabled',
    '(change)': '_onChange($event.target.checked ? nkValue : null)',
    '(blur)': '_onTouched()'
  }
})
export class NkCheckboxDirective implements ControlValueAccessor {
  /**
   * 组件value, 相当于checkbox value属性
   */
  protected _nkValue: object;
  /**
   * 获取复选框的值
   */
  get nkValue(): object {
    return this._nkValue;
  }

  /**
   * 设置复选框的值, 可以是任意类型
   * @param value
   */
  @Input() set nkValue(value: object) {
    this._nkValue = value;
    this.writeValue(value);
  }

  /**
   * 比较器
   */
  @Input() compareWith: CompareWith<object> = defaultCompareWith;

  /**
   * 禁用状态
   */
  @Input() nkDisabled: boolean;

  _onChange = (_: object) => { };
  _onTouched = () => { };

  constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
    // tslint:disable-next-line
    this._nkValue = null as any;
  }

  registerOnChange(fn: (_: object) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nkDisabled = isDisabled;
  }

  writeValue(value: object): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this.compareWith(value, this.nkValue));
  }
}
