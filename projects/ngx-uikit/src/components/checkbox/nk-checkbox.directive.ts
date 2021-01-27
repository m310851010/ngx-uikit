import {ChangeDetectionStrategy, Directive, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkOption} from '../core/type/nk-key-value';

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
    '(change)': 'checkedChange($event.target.checked)',
    '(click)': 'nkItemClick.emit($event)',
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
   * @param value 复选框的值
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

  /**
   * 触发ngModelChange的同时触发该事件
   */
  @Output() nkChange = new EventEmitter<object | null>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkChange或ngModel,ngModelChange
   */
  @Output() nkItemClick = new EventEmitter<MouseEvent>();

  _onChange = (_: object | null) => { };
  _onTouched = () => { };

  constructor(protected _renderer: Renderer2, protected _elementRef: ElementRef) {
    // tslint:disable-next-line
    this._nkValue = null as any;
  }

  registerOnChange(fn: (_: object | null) => {}): void {
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

  checkedChange(checked: boolean): void {
    const value = checked ? this.nkValue : null;
    this.nkChange.emit(value);
    this._onChange(value);
  }
}
