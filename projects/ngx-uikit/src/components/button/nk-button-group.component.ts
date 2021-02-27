import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges, Renderer2,
  SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {addClass} from 'ngx-uikit/core';

@Component({
  selector: 'nk-button-group',
  exportAs: 'nkButtonGroup',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.nk-button-group-small]': `nkSize === 'small'`,
    '[class.nk-button-group-large]': `nkSize === 'large'`,
    '[class.nk-button-group-default]': `nkSize === 'default'`,
  }
})
export class NkButtonGroupComponent {

  /**
   * 按钮大小
   */
  @Input() nkSize: NkButtonGroupSize = 'default';

  constructor(public elementRef: ElementRef, public render: Renderer2) {
    addClass(this.elementRef, 'nk-button-group');
  }
}

export type NkButtonGroupSize = 'large' | 'default' | 'small';
