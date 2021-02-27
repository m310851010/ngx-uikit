import {Component, ElementRef, Input, OnInit, Optional, Renderer2, Self, TemplateRef} from '@angular/core';
import {addClass, removeClass} from 'ngx-uikit/core';
import {NkInputDirective} from './nk-input.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'nk-input-group',
  templateUrl: './nk-input-group.component.html',
  host: {
    '[class.nk-form-large]': `nkSize === 'large'`,
    '[class.nk-form-small]': `nkSize === 'small'`,
    '[class.nk-form-blank]': 'nkBlank',
    '[class.disabled]': '_disabled',
    '[class.nk-form-danger]': `nkState === 'danger'`,
    '[class.nk-form-success]': `nkState === 'success'`,
    '[class.nk-input-group]': `nkSuffix || nkPrefix`,
  }
})
export class NkInputGroupComponent extends NkInputDirective implements OnInit {

  @Input() nkPrefix: string | TemplateRef<void>;
  @Input() nkPrefixIcon: string;
  @Input() nkSuffix: string | TemplateRef<void>;
  @Input() nkSuffixIcon: string;

  constructor(public _elementRef: ElementRef, public render: Renderer2, @Optional() @Self() public ngControl: NgControl) {
    super(_elementRef, render, ngControl);
    addClass(_elementRef, 'nk-input-group-compact');
    removeClass(this._elementRef, 'nk-input');
  }

  ngOnInit(): void {
  }
}
