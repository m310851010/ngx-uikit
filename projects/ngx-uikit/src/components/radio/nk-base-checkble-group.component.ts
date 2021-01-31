import {
  ChangeDetectorRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChange, SimpleChanges,
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkCheckable, NkRadioOption, ValueFormat} from '../core/type/nk-types';
import {Observable, of, Subscription} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {isObservable, isEmpty, isNotEmpty, isPlainObject, isArray, isNil} from '../core/util/nk-util';
import {getValueFormatFn} from '../core/util/ui-util';

export abstract class NkBaseCheckbleGroupComponent<OPT extends NkCheckable & {nkChecked?: boolean | null}>
  implements OnInit, OnDestroy, OnChanges, ControlValueAccessor {

  /**
   * ngModel绑定的值,该值通过valueFormat转换后获得
   * 如果列表为空,则设置为null,为了适应表单的required
   */
  // tslint:disable-next-line
  modelValue: any | null = null;
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
  _options: OPT[];
  private _optionsSubscription: Subscription | null;
  /**
   * 所有复选框列表
   */
  // tslint:disable-next-line
  @Input() nkOptions: any | any[] | OPT[] | Observable<any[]>;

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
  @Output() nkOnChange = new EventEmitter<OPT[]>();
  /**
   * 当前复选框状态改变时触发该事件
   */
  @Output() nkOnItemChange = new EventEmitter<OPT>();
  /**
   * 复选框点击事件
   * 触发该事件时,并不能正确判断checked状态
   * 要获取正确的checked状态,请使用nkItemChange
   */
  @Output() nkOnItemClick = new EventEmitter<{nkOption: OPT, clickEvent: MouseEvent}>();

  /**
   * 是否禁用,用于全局设置,数据的disabled和全局只要有一个为true则禁用
   */
  _disabled: boolean;
  _onChange = (_: object | null) => { };
  _onTouched = () => { };

  protected constructor(public _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribeOptions(isObservable(this.nkOptions) ? this.nkOptions : of(this.nkOptions));
  }

  // tslint:disable-next-line
  subscribeOptions(obs: Observable<any[]>): void {
    this.unSubscribeOptions();

    this._optionsSubscription = obs.pipe(
      // tslint:disable-next-line
      map<any[], OPT[]>(this._mapToOptions.bind(this)),
      share())
      .subscribe(value => {
        this._options = this.mapOptions(value);
        this._cdr.markForCheck();
      });
  }

  unSubscribeOptions(): void {
    if (this._optionsSubscription) {
      this._optionsSubscription.unsubscribe();
      this._optionsSubscription = null;
    }
  }

  abstract mapOptions(options: OPT[]): OPT[];

  /**
   * 把原始值转换为 OPT[]
   * @param value 原始值
   */
  // tslint:disable-next-line
  _mapToOptions(value: any[]): OPT[] {
    if (isEmpty(value)) {
      return [];
    }

    if (!isArray(value)) {
      value = [value];
    }

    const fnChecked = this.getCheckFn(this.modelValue);
    // 对象类型
    if (isPlainObject(value[0])) {
      // tslint:disable-next-line
      return value.map<OPT>((itValue, index, array) => {
        const it = itValue as OPT;
        if (isNil(it.nkLabel)) {
          it.nkLabel = this._labelFormat(it);
        }
        if (isNil(it.nkValue)) {
          it.nkValue = this._valueFormat(it);
        }
        if (isNil(it.nkChecked)) {
          it.nkChecked = fnChecked(it.nkValue);
        }
        return it;
      });
    }

    return value.map<OPT>(it => ({
      nkLabel: it,
      nkValue: it,
      nkChecked: fnChecked(it)
    } as OPT));
  }

  /**
   * 获取用于检测是否选中的函数
   */
  // tslint:disable-next-line
  protected getCheckFn(value: any[] | null): (_v: any) => boolean {
    return isEmpty(value)
      // tslint:disable-next-line
      ? (_v: any) => false
      // tslint:disable-next-line
      : (_v: any) => (value as any[]).some(it => this.compareWith(_v, it));
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

  // tslint:disable-next-line
  abstract toModelValue(value: any): any;

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

  ngOnDestroy(): void {
    this.unSubscribeOptions();
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkOptions && !changes.nkOptions.isFirstChange()) {
      this.subscribeOptions(isObservable(this.nkOptions) ? this.nkOptions : of(this.nkOptions));
    }
  }
}
