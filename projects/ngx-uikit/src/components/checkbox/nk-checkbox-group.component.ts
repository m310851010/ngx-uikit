import {
  ChangeDetectorRef,
  Component, DoCheck, EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkKeyValue, NkCheckable, ValueFormat} from '../core/type/nk-key-value';
import {Observable, of, Subscription} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {isObservable, isEmpty, isNotEmpty, isPlainObject, isArray, isNil} from '../core/util/nk-util';
import {getValueFormatFn} from '../core/util/ui-util';

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
export class NkCheckboxGroupComponent implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {

  /**
   * ngModel绑定的值,该值通过valueFormat转换后获得
   * 如果列表为空,则设置为null,为了适应表单的required
   */
  // tslint:disable-next-line
  modelValue: any[] | null = null;
  /**
   * label格式化, 默认取label属性
   */
  // tslint:disable-next-line
  _labelFormat = getValueFormatFn('nkLabel');
  /**
   * 值的格式化,默认取 value属性
   */
  // tslint:disable-next-line
  _valueFormat = getValueFormatFn('nkValue');
  /**
   * 界面显示使用的数据
   */
  // tslint:disable-next-line
  _options: NkCheckable[];
  private _optionsSubscription: Subscription | null;
  /**
   * 所有复选框列表
   */
  // tslint:disable-next-line
  @Input() nkOptions: any[] | Observable<any[]>;

  /**
   * 比较器, (o1=当前项, o2=当前值) => boolean
   */
  @Input() compareWith: CompareWith<{}> = defaultCompareWith;
  /**
   * label格式化
   */
  @Input() set nkLabelFormat(format: ValueFormat<{}>) {
    this._labelFormat = getValueFormatFn(format);
  }

  /**
   * 值的格式化
   */
  @Input() set nkValueFormat( format: ValueFormat<{}>) {
    this._valueFormat = getValueFormatFn(format);
  }

  /**
   * 触发ngModelChange的同时触发该事件,当所有复选框都没被选中时返回空数组
   */
  @Output() nkOnChange = new EventEmitter<NkCheckable[]>();
  /**
   * 当前复选框状态改变时触发该事件
   */
  @Output() nkOnItemChange = new EventEmitter<NkCheckable>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkItemChange
   */
  @Output() nkOnItemClick = new EventEmitter<{nkOption: NkCheckable, clickEvent: MouseEvent}>();

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
      map<any[], NkCheckable[]>(this._mapToCheckboxOptions.bind(this)),
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
   * 把原始值转换为 NkCheckable[]
   * @param value 原始值
   */
  // tslint:disable-next-line
  _mapToCheckboxOptions(value: any[]): NkCheckable[] {
    if (isEmpty(value)) {
      return [];
    }

    if (!isArray(value)) {
      value = [value];
    }

    const fnChecked = this.getCheckFn(this.modelValue);
    // 对象类型
    if (isPlainObject(value[0])) {
      return value.map<NkCheckable>(itValue => {
        // tslint:disable-next-line
        const it = itValue as NkKeyValue<any>;
        if (isNil(it.nkLabel)) {
          it.nkLabel = this._labelFormat(it);
        }
        if (isNil(it.nkValue)) {
          it.nkValue = this._valueFormat(it);
        }
        if (isNil(it.nkChecked)) {
          it.nkChecked = fnChecked(it.nkValue);
        }
        return it as NkCheckable;
      });
    }

    return value.map<NkCheckable>(it => ({
      nkLabel: it,
      nkValue: it,
      nkChecked: fnChecked(it)
    } as NkCheckable));
  }

  /**
   * 获取用于检测是否选中的函数
   */
  // tslint:disable-next-line
  private getCheckFn(value: any[] | null): (_v: any) => boolean {
    return isEmpty(value)
      // tslint:disable-next-line
      ? (_v: any) => false
      // tslint:disable-next-line
      : (_v: any) => (value as any[]).some(it => this.compareWith(_v, it));
  }

  /**
   * 当个界面checkbox状态变化事件
   * @param checked 是否被选中
   * @param indeterminate 是否半选
   * @param item 当前数据
   */
  // tslint:disable-next-line
  itemViewChange(checked: boolean, indeterminate: boolean, item: NkCheckable): void {
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
    this.modelValue = checkedValues.length ? checkedValues : null;
    if (emit) {
      this._onChange(this.modelValue);
    }
    this.nkOnChange.emit(checkedItems);
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
    this.updateCheckedState(obj);
  }

  /**
   * 更新value
   */
  // tslint:disable-next-line
  updateCheckedState(value: any[] | null): void {
    this.modelValue = isEmpty(value) ? null : (isArray(value) ? value : [value]);
    if (isNotEmpty(this._options)) {
      const fnChecked = this.getCheckFn(this.modelValue);
      this._options.forEach(it => {
        it.nkChecked = fnChecked(it.nkValue);
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
