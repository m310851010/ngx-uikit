import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {NkIcon} from '../core/type/nk-key-value';
import {findFirstNotEmptyNode} from '../core/util/ui-util';
import {isNotNil} from '../core/util/nk-util';

@Component({
  selector: '[nk-button]',
  exportAs: 'nkButton',
  templateUrl: './nk-button.component.html',
  styleUrls: ['./nk-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': `'nk-button nk-button-' + nkType + ' ' + (nkSize || nkSize === 'default' ? '' : ('nk-button-' + nkSize))`
  }
})
export class NkButtonComponent implements OnInit, AfterContentInit {

  /**
   * 是否循环旋转图标
   */
  @Input() nkLoading = false;
  @Input() nkSize: NkButtonSize;
  @Input() nkType: NkButtonType = 'default';
  @ViewChild('content', {read: ElementRef}) content: ElementRef;

  /**
   * 显示的图标
   */
  @Input() nkIcon: string | NkIcon;
  _hasContent = false;

  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.contentChange();
  }

  contentChange(): void {
    const node = findFirstNotEmptyNode(this.content.nativeElement);
    const hasElement = node !== null;
    if (hasElement !== this._hasContent) {
      this._hasContent = hasElement;
      console.log(this.content.nativeElement);
      this.cdr.detectChanges();
    }
  }

  ngAfterContentInit(): void {
    this.contentChange();
  }
}

export type NkButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'text' | 'link';
export type NkButtonSize = 'large' | 'small' | 'default';
