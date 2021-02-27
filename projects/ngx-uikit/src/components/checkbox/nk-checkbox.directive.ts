import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Inject,
  Input, OnDestroy, OnInit, Optional,
  Renderer2
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkBaseCheckble} from 'ngx-uikit/radio';
import {NkCheckboxGroupComponent} from './nk-checkbox-group.component';

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
    type: 'checkbox',
    '[indeterminate]': '_indeterminate',
    '[disabled]': 'disabled',
    '(change)': 'handleCheckedState($event.target.checked)',
    '(click)': 'nkOnItemClick.emit($event)',
    '(blur)': '_onTouched()'
  }
})
export class NkCheckboxDirective extends NkBaseCheckble implements OnInit, OnDestroy {

  _indeterminate = false;
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

  // tslint:disable-next-line
  private _checkedStateFn: (newValue: any, nkValue: any) => boolean;

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkCheckboxGroupComponent))
    public container: NkCheckboxGroupComponent) {
    super(elementRef, render);
    this.render.addClass(this._elementRef.nativeElement, 'nk-checkbox');
  }

  ngOnInit(): void {
    if (this.container && this.nkRegisterContainer) {
      // @ts-ignore
      this._checkedStateFn = (newValue, nkValue) => (newValue || []).some(it => this.compareWith(it, nkValue));
      this.container.registerChild(this);
    } else {
      this._checkedStateFn = (newValue, nkValue) => this.compareWith(newValue, nkValue);
    }
    super.ngOnInit();
  }

  // tslint:disable-next-line
  protected getCheckedState4ModelValue(newValue: any, nkValue: any): boolean {
    return this._checkedStateFn(newValue, nkValue);
  }

  ngOnDestroy(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.removeChild(this);
    }
    super.ngOnDestroy();
  }
}
