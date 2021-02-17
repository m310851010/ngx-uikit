import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges} from '@angular/core';
import {isEmpty, isString} from '../core/util/nk-util';
import {addClass, removeClass} from '../core/util/ui-util';

@Directive({
  // tslint:disable-next-line
  selector: '[nk-padding]',
  exportAs: 'nkPadding'
})
export class NkPaddingDirective implements OnInit, OnChanges {
  protected _prevClass: string[];
  @Input('nk-padding') nkPadding: nkPadding | nkPadding[] | string;

  constructor(public _elementRef: ElementRef, public render: Renderer2) {
  }

  getClass(className: nkPadding | nkPadding[] | string): string[] {
    if (isEmpty(className)) {
      return ['nk-padding'];
    }

    const newClassName = isString(className) ? className.split(/\s+/) :  className as string[];
    return newClassName.map(value => `nk-padding-${value}`);
  }

  toggleClass(className: nkPadding | nkPadding[] | string): void {
    removeClass(this._elementRef, this._prevClass);
    const newClassName: string[] = this.getClass(className);
    addClass(this._elementRef, newClassName);
    this._prevClass = newClassName;
  }

  ngOnInit(): void {
    this.toggleClass(this.nkPadding);
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkPadding && !changes.nkPadding.isFirstChange()) {
      this.toggleClass(this.nkPadding);
    }
  }
}

export type nkPadding = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal'
  | 'small' | 'small-top' | 'small-bottom' | 'small-left' | 'small-right' | 'small-vertical' | 'small-horizontal'
  | 'large' | 'large-top' | 'large-bottom' | 'large-left' | 'large-right' | 'large-vertical' | 'large-horizontal'
  | 'remove' | 'remove-top' | 'remove-bottom' | 'remove-left' | 'remove-right' | 'remove-vertical' | 'remove-horizontal' | 'remove-adjacent'
  ;
