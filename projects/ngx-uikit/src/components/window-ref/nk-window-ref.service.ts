import { ElementRef, Injectable } from '@angular/core';
import { NkDocumentRefService } from './nk-document-ref.service';
import {coerceElement} from 'ngx-uikit/core';

@Injectable()
export class NkWindowRefService {

  constructor(private  documentRef: NkDocumentRefService) {
  }

  get document(): NkDocumentRefService {
    return this.documentRef;
  }

  get pageXOffset(): number {
    return window.pageXOffset;
  }

  get pageYOffset(): number {
    return window.pageYOffset;
  }

  get innerHeight(): number {
    return window.innerHeight;
  }

  get innerWidth(): number {
    return window.innerWidth;
  }

  getComputedStyle(element: Element): CSSStyleDeclaration {
    return window.getComputedStyle(element);
  }

  getBoundingClientRect<T extends Element>(elementRef: ElementRef | T): ClientRect | DOMRect | null {
    if (!elementRef) {
      return null;
    }
    return coerceElement<T>(elementRef).getBoundingClientRect();
  }

}
