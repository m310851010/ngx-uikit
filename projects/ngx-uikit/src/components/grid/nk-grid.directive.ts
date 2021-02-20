import {Directive, ElementRef, Input} from '@angular/core';
import {addClass} from '../core/util/ui-util';

@Directive({
  // tslint:disable-next-line
  selector: '[nk-grid]',
  exportAs: 'nkGrid',
  host: {
    '[class.nk-grid-match]': 'nkMatched',
    '[class.nk-grid-divider]': 'nkDivided',
    '[class.nk-grid-small]': `nkGutter === 'small'`,
    '[class.nk-grid-medium]': `nkGutter === 'medium'`,
    '[class.nk-grid-large]': `nkGutter === 'large'`,
    '[class.nk-grid-collapse]': `nkGutter === 'collapse'`,
  }
})
export class NkGridDirective {

  @Input() nkDivided: boolean;
  @Input() nkMatched: boolean;
  @Input() nkGutter: 'small' | 'medium' | 'large' | 'collapse';
  constructor(public _elementRef: ElementRef) {
    addClass(_elementRef, 'nk-grid');
  }

}
