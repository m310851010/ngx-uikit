import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkKeyValue, NkOption, OptionFormat} from '../core/type/nk-key-value';
import {Observable, of, Subscription} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {isObservable, isEmpty, isNotEmpty, isPlainObject, isArray} from '../core/util/nk-util';
import {getOptionFormatFn} from '../core/util/ui-util';

/**
 * 复选框组。 设计思想是,通过给定任意数组或Observable发射的数组创建多个复选框
 * 其中, label和value可以通过自定义属性名称或函数生成, 当ngModel
 */
@Component({
  selector: 'nk-checkbox-group',
  exportAs: 'nkCheckboxGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nk-checkbox-group.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkCheckboxGroupComponent),
      multi: true
    }
  ]
})
export class NkCheckboxGroupComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {

  /**
   * ngModel绑定的值,该值通过valueFormat转换后获得
   * 如果列表为空,则设置为null,为了适应表单的required
   */
  // tslint:disable-next-line
  value: any[] | null = null;
  /**
   * label格式化, 默认取label属性
   */
  // tslint:disable-next-line
  _labelFormat = getOptionFormatFn('label');
  /**
   * 值的格式化,默认取 value属性
   */
  // tslint:disable-next-line
  _valueFormat = getOptionFormatFn('value');
  /**
   * 界面显示使用的数据
   */
  // tslint:disable-next-line
  _options: NkOption[];
  private _optionsSubscription: Subscription | null;
  /**
   * 所有复选框列表
   */
  // tslint:disable-next-line
  @Input() nkOptions: any[] | Observable<any[]>;

  /**
   * 比较器
   */
  @Input() compareWith: CompareWith<{}> = defaultCompareWith;
  /**
   * label格式化
   */
  @Input() set labelFormat(format: OptionFormat<{}>) {
    this._labelFormat = getOptionFormatFn(format);
  }

  /**
   * 值的格式化
   */
  @Input() set valueFormat( format: OptionFormat<{}>) {
    this._valueFormat = getOptionFormatFn(format);
  }

  /**
   * 触发ngModelChange的同时触发该事件,当所有复选框都没被选中时返回空数组
   */
  @Output() nkChange = new EventEmitter<NkOption[]>();
  /**
   * 当前复选框状态改变时触发该事件
   */
  @Output() nkItemChange = new EventEmitter<NkOption>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkItemChange
   */
  @Output() nkItemClick = new EventEmitter<{nkOption: NkOption, clickEvent: MouseEvent}>();

  /**
   * 是否禁用,用于全局设置,数据的disabled和全局只要有一个为true则禁用
   */
  _disabled: boolean;
  _onChange = (_: object | null) => { };
  _onTouched = () => { };

  constructor(protected _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribeOptions(isObservable(this.nkOptions) ? this.nkOptions : of(this.nkOptions));
  }

  // tslint:disable-next-line
  subscribeOptions(obs: Observable<any[]>): void {
    this.unSubscribeOptions();

    this._optionsSubscription = obs.pipe(
      // tslint:disable-next-line
      map<any[], NkOption[]>(this._mapToCheckboxOptions.bind(this)),
      share())
      .subscribe(value => {
        this._options = value;
        this._cdr.markForCheck();
      });
  }

  unSubscribeOptions(): void {
    if (this._optionsSubscription) {
      this._optionsSubscription.unsubscribe();
      this._optionsSubscription = null;
    }
  }

  /**
   * 把原始值转换为 NkOption[]
   * @param value 原始值
   */
  // tslint:disable-next-line
  _mapToCheckboxOptions(value: any[]): NkOption[] {
    if (isEmpty(value) || !isArray(value)) {
      return [];
    }

    const fnChecked = this.getCheckFn();
    // 对象类型
    if (isPlainObject(value[0])) {
      return value.map<NkOption>(itValue => {
        // tslint:disable-next-line
        const it = itValue as NkKeyValue<any>;
        if (!it.hasOwnProperty('label')) {
          it.label = this._labelFormat(it);
        }
        if (!it.hasOwnProperty('value')) {
          it.value = this._valueFormat(it);
        }
        if (!it.hasOwnProperty('checked')) {
          it.checked = fnChecked(it.value);
        }
        return it as NkOption;
      });
    }

    return value.map<NkOption>(it => ({label: it, value: it, checked: fnChecked(it)} as NkOption));
  }

  /**
   * 获取用于检测是否选中的函数
   */
  // tslint:disable-next-line
  private getCheckFn(): (_v: any) => boolean {
    return isEmpty(this.value)
      // tslint:disable-next-line
      ? (_v: any) => false
      // tslint:disable-next-line
      : (_v: any) => (this.value as any[]).some(it => this.compareWith(it, _v));
  }

  /**
   * 当个checkbox状态变化事件
   * @param checked 是否被选中
   * @param item 当前数据
   */
  // tslint:disable-next-line
  itemChange(checked: boolean, item: NkOption): void {
    item.checked = checked;
    const checkedItems = this._options.filter(val => val.checked);
    const checkedValues = checkedItems.map(val => val.value);
    this.value = checkedValues.length ? checkedValues : null;
    this.nkChange.emit(checkedItems);
    this.nkItemChange.emit(item);
    this._onChange(this.value);
  }

  registerOnChange(fn: (_: object | null) => { }): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  // tslint:disable-next-line
  writeValue(obj: any[]): void {
    this.value = obj;

    if (isNotEmpty(this._options)) {
      const fnChecked = this.getCheckFn();
      this._options.forEach(it => {
        it.checked = fnChecked(it.value);
      });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribeOptions();
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkOptions && !changes.nkOptions.isFirstChange()) {
      this.subscribeOptions(isObservable(this.nkOptions) ? this.nkOptions : of(this.nkOptions));
    }
  }
}
