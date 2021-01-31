import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input, OnChanges, Renderer2,
  SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

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
export class NkButtonGroupComponent implements OnChanges {

  /**
   * 按钮大小
   */
  @Input() nkSize: NkButtonGroupSize = 'default';

  constructor(public elementRef: ElementRef, public render: Renderer2) {
    this.elementRef.nativeElement.classList.add('nk-button-group');
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {

  }
}

export type NkButtonGroupSize = 'large' | 'default' | 'small';
