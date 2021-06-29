import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges} from '@angular/core';
import {isEmpty, isString, addClass, removeClass} from 'ngx-uikit/core';

@Directive({
  // tslint:disable-next-line
  selector: '[nk-margin]',
  exportAs: 'nkMargin'
})
export class NkMarginDirective implements OnInit, OnChanges {
  protected _prevClass: string[];
  @Input('nk-margin') nkMargin: NkMargin | NkMargin[] | string;

  constructor(public _elementRef: ElementRef, public render: Renderer2) {
  }

  getClass(className: NkMargin | NkMargin[] | string): string[] {
    if (isEmpty(className)) {
      return ['nk-margin'];
    }

    const newClassName = isString(className) ? className.split(/\s+/) :  className as string[];
    return newClassName.map(value => `nk-margin-${value}`);
  }

  toggleClass(className: NkMargin | NkMargin[] | string): void {
    removeClass(this._elementRef, this._prevClass);
    const newClassName: string[] = this.getClass(className);
    addClass(this._elementRef, newClassName);
    this._prevClass = newClassName;
  }

  ngOnInit(): void {
    this.toggleClass(this.nkMargin);
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkMargin && !changes.nkMargin.isFirstChange()) {
      this.toggleClass(this.nkMargin);
    }
  }
}

export type NkMargin = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal'
  | 'small' | 'small-top' | 'small-bottom' | 'small-left' | 'small-right' | 'small-vertical' | 'small-horizontal'
  | 'medium' | 'medium-top' | 'medium-bottom' | 'medium-left' | 'medium-right' | 'medium-vertical' | 'medium-horizontal'
  | 'large' | 'large-top' | 'large-bottom' | 'large-left' | 'large-right' | 'large-vertical' | 'large-horizontal'
  | 'xlarge' | 'xlarge-top' | 'xlarge-bottom' | 'xlarge-left' | 'xlarge-right' | 'xlarge-vertical' | 'xlarge-horizontal'
  | 'auto' | 'auto-top' | 'auto-bottom' | 'auto-left' | 'auto-right' | 'auto-vertical' | 'auto-horizontal'
  | 'remove' | 'remove-top' | 'remove-bottom' | 'remove-left' | 'remove-right' | 'remove-vertical' | 'remove-horizontal' | 'remove-adjacent'
  | 'remove-first-child'| 'remove-last-child'
  | 'remove-left@s' | 'remove-right@s' | 'remove-left@m' | 'remove-right@m' | 'remove-left@l' | 'remove-right@l' | 'remove-left@xl' | 'remove-right@xl'
  | 'auto-left@s' | 'auto-@s' | 'auto-right@s' | 'auto-left@m' | 'auto-@m' | 'auto-right@m' | 'auto-left@l' | 'auto-@l' | 'auto-right@l' | 'auto-left@xl' | 'auto-@xl' | 'auto-right@xl';
