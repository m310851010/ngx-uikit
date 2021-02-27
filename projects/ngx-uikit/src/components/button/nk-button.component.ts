import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, Optional, Renderer2, Self,
  ViewEncapsulation
} from '@angular/core';
import {addClass, NkButtonSize, NkButtonType, NkIcon} from 'ngx-uikit/core';
import {NgControl} from '@angular/forms';

@Component({
  selector: '[nk-button]',
  exportAs: 'nkButton',
  templateUrl: './nk-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.nk-button-default]': `nkType === 'default'`,
    '[class.nk-button-primary]': `nkType === 'primary'`,
    '[class.nk-button-secondary]': `nkType === 'secondary'`,
    '[class.nk-button-danger]': `nkType === 'danger'`,
    '[class.nk-button-link]': `nkType === 'link'`,
    '[class.nk-button-text]': `nkType === 'text'`,
    '[class.nk-button-small]': `nkSize === 'small'`,
    '[class.nk-button-large]': `nkSize === 'large'`,
    '[class.uk-width-1-1]': 'nkBlock',
    '[class.overlay]': 'nkOverlay',
    '[class.disabled]': 'disabled',
    '[class.overlay-disabled]': 'disabled'
  }
})
export class NkButtonComponent {

  /**
   * 是否循环旋转图标,如果nkLoading为true, nkIcon为空则默认显示loading图标
   */
  @Input() nkLoading: boolean;
  /**
   * 按钮大小
   */
  @Input() nkSize: NkButtonSize;
  /**
   * 按钮类型
   */
  @Input() nkType: NkButtonType = 'default';

  /**
   * 显示的图标
   */
  @Input() nkIcon: string | NkIcon;
  /**
   * 是否块级方式显示
   */
  @Input() nkBlock: boolean;
  /**
   * 是否显示遮罩,当显示遮罩时, hover效果消失
   */
  @Input() nkOverlay: boolean;

  /**
   * 是否禁用
   */
  @Input() disabled: boolean;

  constructor(public elementRef: ElementRef,
              public render: Renderer2,
              @Optional() @Self() public ngControl: NgControl) {
    addClass(this.elementRef, 'nk-button');
  }
}
