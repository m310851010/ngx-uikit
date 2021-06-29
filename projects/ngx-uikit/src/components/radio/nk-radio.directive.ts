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
import {NkRadioGroupComponent} from './nk-radio-group.component';
import {addClass, NkAny} from 'ngx-uikit/core';

@Directive({
  selector: 'input[nk-radio]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NkRadioDirective),
    multi: true,
  }],
  host: {
    type: 'radio',
    '[disabled]': 'disabled',
    '(change)': 'handleCheckedState($event.target.checked)',
    '(click)': 'nkOnItemClick.emit($event)',
    '(blur)': '_onTouched()'
  }
})
export class NkRadioDirective extends NkBaseCheckble implements OnInit, OnDestroy {

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkRadioGroupComponent))
    public container: NkRadioGroupComponent) {
    super(elementRef, render);
    addClass(this._elementRef, 'nk-radio');
  }

  ngOnInit(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.registerChild(this);
    }
    super.ngOnInit();
  }

  protected getCheckedState4ModelValue(newValue: NkAny, nkValue: NkAny): boolean {
    return this.compareWith(newValue, this.nkValue);
  }

  ngOnDestroy(): void {
    if (this.container && this.nkRegisterContainer) {
      this.container.removeChild(this);
    }
    super.ngOnDestroy();
  }
}
