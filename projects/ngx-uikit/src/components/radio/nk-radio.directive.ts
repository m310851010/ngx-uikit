import {
  Directive,
  ElementRef,
  forwardRef,
  Host,
  Inject, OnDestroy,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkBaseCheckble} from './nk-base-checkble';
import {NkRadioContainerComponent} from './nk-radio-container.component';
import {isNil} from '../core/util/nk-util';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[nk-radio]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NkRadioDirective),
    multi: true,
  }],
  host: {
    type: 'radio',
    '[disabled]': 'nkDisabled',
    '(change)': 'handleCheckedState($event.target.checked)',
    '(click)': 'nkOnItemClick.emit($event)',
    '(blur)': '_onTouched()'
  }
})
export class NkRadioDirective extends NkBaseCheckble implements OnInit, OnDestroy {

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkRadioContainerComponent))
    public container: NkRadioContainerComponent) {
    super(elementRef, render);
    this.render.addClass(this._elementRef.nativeElement, 'nk-radio');
  }

  ngOnInit(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.registerChild(this);
    }
    super.ngOnInit();
  }

  // tslint:disable-next-line
  protected getCheckedState4ModelValue(newValue: any, nkValue: any): boolean {
    return this.compareWith(newValue, this.nkValue);
  }

  ngOnDestroy(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.removeChild(this);
    }
    super.ngOnDestroy();
  }
}
