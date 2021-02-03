import {
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2, SimpleChange, SimpleChanges
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {CompareWith, defaultCompareWith} from '../core/type/nk-types';
import {isNil, isNotEmpty} from '../core/util/nk-util';
import {insertAfter} from '../core/util/ui-util';

export abstract class NkBaseCheckble implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  /**
   * ngModel绑定的值
   */
    // tslint:disable-next-line
  modelValue: any;

  /**
   * 显示的文本
   */
  @Input() nkLabel: string;
  /**
   * 组件是否显示文本, 默认true, false则不渲染
   */
  @Input() nkViewNkLabel = true;

  /**
   * 组件value, 相当于原生组件 value属性, 可以是任意类型
   */
  // tslint:disable-next-line
  @Input() nkValue: any

  /**
   * 如果父组件是nk-checkbox-container、nk-radio-container时,
   * 是否向父组件注册, 如果不注册将不受nk-checkbox-container、nk-radio-container控制
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
  @Input() disabled = false;

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
  _elementRef: ElementRef;
  // tslint:disable-next-line
  _onChange = (_: any | null) => { };
  _onTouched = () => { };

  protected constructor(public elementRef: ElementRef, public render: Renderer2) {
    this._elementRef = elementRef;
  }

  ngOnInit(): void {
    this.updateCheckedState();
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
    this.disabled = isDisabled;
  }

  writeValue(value: object): void {
    this.modelValue = value;
    this.updateCheckedState();
  }

  /**
   * 更新选状态,好nkValue比较来更新状态
   * @param newValue 当前值和nkValue比较
   * @return 是否选中
   */
  // tslint:disable-next-line
  updateCheckedState(newValue?: any): boolean {
    const isEq = this.getCheckedState4ModelValue(isNil(newValue) ? this.modelValue : newValue, this.nkValue);
    this.setCheckedState(isEq);
    return isEq;
  }

  /**
   * 设置复选状态
   * @param checked 是否选中
   */
  setCheckedState(checked: boolean): void {
    this.render.setProperty(this._elementRef.nativeElement, 'checked', checked);
  }

  /**
   * 获取checkbox选中状态
   */
  getCheckedState(): boolean {
    return this._elementRef.nativeElement.checked;
  }

  // tslint:disable-next-line
  protected abstract getCheckedState4ModelValue(newValue: any, nkValue: any): boolean;

  handleCheckedState(checked: boolean): void {
    const value = checked ? this.nkValue : null;
    this.nkOnChange.emit(value);
    this._onChange(value);
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (this.nkViewNkLabel && changes.nkLabel && !changes.nkLabel.isFirstChange()) {
      this._addNkLabelTag();
    }

    if (changes.nkValue && !changes.nkValue.isFirstChange()) {
      this.updateCheckedState();
    }
  }

  ngOnDestroy(): void {
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
      this.render.removeChild(parentNode, this._prevNkLabelElement);
    }
    this._prevNkLabelElement = null;
  }

  /**
   * 添加label节点
   */
  _addNkLabelTag(): void {
    if (!this.nkViewNkLabel) {
      return;
    }

    if (this._prevNkLabelElement) {
      this._prevNkLabelElement.textContent = isNil(this.nkLabel) ? '' : ` ${this.nkLabel}`;
      return;
    }

    if (isNotEmpty(this.nkLabel)) {
      const textTag = this.render.createText(` ${this.nkLabel}`);
      if (insertAfter(textTag, this._elementRef.nativeElement)) {
        this._prevNkLabelElement = textTag;
      }
    }
  }
}
