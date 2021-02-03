import {Directive, ElementRef, Renderer2} from '@angular/core';
import {addClass} from '../core/util/ui-util';

/**
 * input file控件, 需要父级元素设置 style包含 position: relative
 * @example
 <button nk-button>
 <input file>
 选择文件
 </button>
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[nk-file]',
  host: {
    type: 'file'
  }
})
export class NkFileDirective {

  constructor(public _elementRef: ElementRef,
              public render: Renderer2) {
    addClass(this._elementRef, 'nk-file');
  }

}
