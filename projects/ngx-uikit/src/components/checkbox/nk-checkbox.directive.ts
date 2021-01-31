import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Inject,
  Input, OnChanges, OnDestroy, OnInit, Optional,
  Renderer2
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkBaseCheckble} from '../radio/nk-base-checkble';
import {NkCheckboxContainerComponent} from './nk-checkbox-container.component';

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
    '[disabled]': 'nkDisabled',
    '(change)': 'handleCheckedState($event.target.checked)',
    '(click)': 'nkOnItemClick.emit($event)',
    '(blur)': '_onTouched()'
  }
})
export class NkCheckboxDirective extends NkBaseCheckble implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  _indeterminate = false;
  /**
   * 是否半选状态
   */
  @Input() set nkIndeterminate(value: boolean) {
    this._indeterminate = value;
  }

  get nkIndeterminate(): boolean {
    this._indeterminate = this.elementRef.nativeElement.indeterminate;
    return this._indeterminate;
  }

  /**
   * 如果父组件是nk-checkbox-container(NkCheckboxContainerComponent)时,
   * 是否向父组件注册, 如果不注册将不受nk-checkbox-container控制
   */
  @Input() nkRegisterContainer = true;

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkCheckboxContainerComponent))
    public container: NkCheckboxContainerComponent) {
    super(elementRef, render);
    this.render.addClass(this.elementRef.nativeElement, 'nk-checkbox');
  }

  ngOnInit(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.registerChild(this);
    }
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.removeChild(this);
    }
    super.ngOnDestroy();
  }
}
