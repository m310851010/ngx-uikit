import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges, Renderer2,
  SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {NkIcon} from '../core/type/nk-types';

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
    '[class.overlay]': 'nkOverlay'
  }
})
export class NkButtonComponent implements OnChanges {

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
   * 是否禁用,按钮使用disabled属性, 其他元素使用样式控制
   */
  @Input() nkDisabled: boolean;

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

  constructor(public elementRef: ElementRef,
              public render: Renderer2) {
    this.elementRef.nativeElement.classList.add('nk-button');
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkDisabled) {
      const node = this.elementRef.nativeElement;
      if (!node.tagName) {
        return;
      }

      const tagName = node.tagName.toLowerCase();
      if (tagName === 'button' || (tagName === 'input' && node.type === 'button')) {
        this.render.setProperty(node, 'disabled', this.nkDisabled);
        return;
      }

      if (this.nkDisabled) {
        this.render.addClass(node, 'disabled');
        this.render.addClass(node, 'overlay-disabled');
      } else {
        this.render.removeClass(node, 'disabled');
        this.render.removeClass(node, 'overlay-disabled');
      }
    }
  }
}

export type NkButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'text' | 'link';
export type NkButtonSize = 'large' | 'small' | 'default';
