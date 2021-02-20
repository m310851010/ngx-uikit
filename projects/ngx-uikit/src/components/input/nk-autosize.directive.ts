import {Directive, ElementRef, Input, Optional, Renderer2, Self} from '@angular/core';
import {addClass} from '../core/util/ui-util';
import {NgControl} from '@angular/forms';
import {toBoolean} from '../core/util/nk-util';

@Directive({
  // tslint:disable-next-line
  selector: '[nk-input]',
  exportAs: 'nkInput',
  host: {
    '[class.nk-form-large]': `nkSize === 'large'`,
    '[class.nk-form-small]': `nkSize === 'small'`,
    '[class.nk-form-blank]': 'nkBlank',
    '[class.disabled]': '_disabled',
    '[class.nk-form-danger]': `nkState === 'danger'`,
    '[class.nk-form-success]': `nkState === 'success'`,
  }
})
export class NkInputDirective {
  _disabled = false;

  @Input() nkSize: NkInputSize = 'default';
  @Input() nkState: NkInputState = 'default';
  @Input() nkBlank: boolean;

  /**
   * 是否禁用
   */
  @Input() get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  constructor(public _elementRef: ElementRef, public render: Renderer2, @Optional() @Self() public ngControl: NgControl) {
    addClass(this._elementRef, 'nk-input');
  }
}

export type NkInputSize = 'small' | 'default' | 'large';
export type NkInputState = 'danger' | 'default' | 'success';
