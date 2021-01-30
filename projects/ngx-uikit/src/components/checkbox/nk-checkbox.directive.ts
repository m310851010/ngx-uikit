import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  Input, OnChanges, OnDestroy, OnInit, Optional,
  Output,
  Renderer2, SimpleChange, SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkCheckable} from '../core/type/nk-key-value';
import {NkCheckboxContainerComponent} from './nk-checkbox-container.component';
import {isNil, isNotEmpty} from '../core/util/nk-util';
import {insertAfter} from '../core/util/ui-util';

/**
 * checkbox指令, 注:不需要添加type="checkbox"
 * @example
 * <input nk-checkbox [nkValue]="'value'" nkLabel="nkLabel">
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
    '[indeterminate]': '_indeterminate',
    '[disabled]': 'nkDisabled',
    '(change)': 'handleCheckedState($event.target.checked)',
    '(click)': 'nkOnItemClick.emit($event)',
    '(blur)': '_onTouched()'
  }
})
export class NkCheckboxDirective implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  /**
   * 组件value, 相当于checkbox value属性
   */
    // tslint:disable-next-line
  _nkValue: any;
  _indeterminate = false;
  /**
   * ngModel绑定的值
   */
    // tslint:disable-next-line
  modelValue: any;
  /**
   * 获取复选框的值
   */
  // tslint:disable-next-line
  get nkValue(): any {
    return this._nkValue;
  }

  /**
   * 显示的文本
   */
  @Input() nkLabel: string;
  /**
   * 组件是否显示文本, 默认true, false则不渲染
   */
  @Input() nkViewNkLabel = true;
  /**
   * 是否半选状态
   */
  @Input() set nkIndeterminate(value: boolean) {
    this._indeterminate = value;
  }

  get nkIndeterminate(): boolean {
    this._indeterminate = this._elementRef.nativeElement.indeterminate;
    return this._indeterminate;
  }

  /**
   * 设置复选框的值, 可以是任意类型
   * @param value 复选框的值
   */
  // tslint:disable-next-line
  @Input() set nkValue(value: any) {
    this._nkValue = value;
    this.updateCheckedState();
  }

  /**
   * 如果父组件是nk-checkbox-container(NkCheckboxContainerComponent)时,
   * 是否向父组件注册, 如果不注册将不受nk-checkbox-container控制
   */
  @Input() nkRegisterContainer = true;

  /**
   * 比较器
   */
    // tslint:disable-next-line
  @Input() compareWith: CompareWith<any> = defaultCompareWith;

  /**
   * 禁用状态
   */
  @Input() nkDisabled = false;

  /**
   * 触发ngModelChange的同时触发该事件
   */
    // tslint:disable-next-line
  @Output() nkOnChange = new EventEmitter<any | null>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkChange或ngModel,ngModelChange
   */
  @Output() nkOnItemClick = new EventEmitter<MouseEvent>();

  _prevNkLabelElement: Node | null;
  // tslint:disable-next-line
  _onChange = (_: any | null) => { };
  _onTouched = () => { };

  constructor(
    public _renderer: Renderer2,
    public _elementRef: ElementRef,
    @Optional() @Host() @Inject(forwardRef(() => NkCheckboxContainerComponent)) public container: NkCheckboxContainerComponent) {
    // tslint:disable-next-line
    this._nkValue = null as any;
  }

  ngOnInit(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.registerNkCheckbox(this);
    }

    this._addNkLabelTag();
  }

  // tslint:disable-next-line
  registerOnChange(fn: (_: any | null) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nkDisabled = isDisabled;
  }

  writeValue(value: object): void {
    this.modelValue = value;
    this.updateCheckedState();
  }

  /**
   * 更新选状态,好nkValue比较来更新状态
   * @param newValue 当前值和nkValue比较
   */
  // tslint:disable-next-line
  updateCheckedState(newValue?: any): void {
    this.setCheckedState(this.compareWith(newValue || this.modelValue, this.nkValue));
  }

  /**
   * 设置复选状态
   * @param checked
   */
  setCheckedState(checked: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'checked', checked);
  }

  /**
   * 获取checkbox选中状态
   */
  getCheckedState(): boolean {
    return this._elementRef.nativeElement.checked;
  }

  handleCheckedState(checked: boolean): void {
    const value = checked ? this.nkValue : null;
    this.nkOnChange.emit(value);
    this._onChange(value);
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (this.nkViewNkLabel && changes.nkLabel && !changes.nkLabel.isFirstChange()) {
      this._addNkLabelTag();
    }
  }

  ngOnDestroy(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.removeNkCheckbox(this);
    }

    this._removeNkLabelTag();
  }

  /**
   * 删除label节点
   */
  _removeNkLabelTag(): void {
    if (!this.nkViewNkLabel) {
      return;
    }
    const parentNode = this._elementRef.nativeElement.parentNode;
    if (this._prevNkLabelElement && parentNode) {
      this._renderer.removeChild(parentNode, this._prevNkLabelElement);
    }
    this._prevNkLabelElement = null;
  }

  /**
   * 添加label节点
   */
  _addNkLabelTag(): void {
    if (!this.nkViewNkLabel) {
      return ;
    }

    if (this._prevNkLabelElement) {
      this._prevNkLabelElement.textContent = isNil(this.nkLabel) ? '' : ` ${this.nkLabel}`;
      return;
    }

    if (isNotEmpty(this.nkLabel)) {
      const textTag = this._renderer.createText(` ${this.nkLabel}`);
      // tslint:disable-next-line
      textTag.renderType = 'nk-checkbox:nkLabel';
      if (insertAfter(textTag, this._elementRef.nativeElement)) {
        this._prevNkLabelElement = textTag;
      }
    }
  }
}
