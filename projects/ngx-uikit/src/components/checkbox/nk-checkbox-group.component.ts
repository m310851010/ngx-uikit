import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CompareWith, defaultCompareWith, NkKeyValue, OptionFormat} from '../core/type/nk-key-value';
import {Observable, of, Subscription} from 'rxjs';
import {map, share, tap} from 'rxjs/operators';
import {isFunction, isString, isObservable} from '../core/util/nk-util';

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
   * 被选中的值列表
   */
  // tslint:disable-next-line
  _value: any[] = [];
  /**
   * label格式化, 默认取label属性
   */
  // tslint:disable-next-line
  _labelFormat = this._getFormat('label');
  /**
   * 值的格式化,默认取 value属性
   */
  // tslint:disable-next-line
  _valueFormat = this._getFormat('value');
  /**
   * 界面显示使用的数据
   */
  // tslint:disable-next-line
  _options: NkCheckboxOption[];
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
    this._labelFormat = this._getFormat(format);
  }

  /**
   * 值的格式化
   */
  @Input() set valueFormat( format: OptionFormat<{}>) {
    this._valueFormat = this._getFormat(format);
  }
  constructor(protected _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ngOnInit-----');
    this.subscribeOptions(isObservable(this.nkOptions) ? this.nkOptions : of(this.nkOptions));
  }

  // tslint:disable-next-line
  subscribeOptions(obs: Observable<any[]>): void {
    this.unSubscribeOptions();

    this._optionsSubscription = obs.pipe(
      // tslint:disable-next-line
      map<any[], NkCheckboxOption[]>(this._mapToCheckboxOptions.bind(this)),
      share())
      .subscribe(value => {
        this._options = value;
        // this._cdr.markForCheck();
      });
  }

  unSubscribeOptions(): void {
    if (this._optionsSubscription) {
      this._optionsSubscription.unsubscribe();
      this._optionsSubscription = null;
    }
  }

  // tslint:disable-next-line
  protected _getFormat(format: OptionFormat<any>): (item: any) => string | number | any {
    if (isString(format)) {
      return item => item ? item[format as string] : '';
    }
    if (isFunction(format)) {
      return format;
    }
    return item => item;
  }

  // tslint:disable-next-line
  _mapToCheckboxOptions(value: any[]): NkCheckboxOption[] {
    return (value || []).map(v => {
      const _value = this._valueFormat(v);
      return {
        data: v,
        _label: this._labelFormat(v),
        _value,
        _checked: this._value.some(it => this.compareWith(it, _value))
      };
    });
  }

  // tslint:disable-next-line
  itemChange(checked: boolean, item: NkCheckboxOption): void {
    item._checked = checked;
    console.log('====>checked:' + checked + '====', item);
  }

  registerOnChange(fn: string | number): void {
  }

  registerOnTouched(fn: string | number): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  // tslint:disable-next-line
  writeValue(obj: any[]): void {
    this._value = obj || [];
    this._options.forEach(v => {
      v._checked = this._value.some(it => this.compareWith(it, v._value));
    });
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

export interface NkCheckboxOption {
  _checked: boolean;
  // tslint:disable-next-line
  _value: any;
  _label: string;
  /**
   * 原始数据
   */
  // tslint:disable-next-line
  data: any;
}
