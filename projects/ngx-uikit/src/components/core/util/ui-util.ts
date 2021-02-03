// tslint:disable-next-line
import {ValueFormat} from '../type/nk-types';
import {isFunction, isNode, isNotNil, isString, toArray} from './nk-util';
import {ElementRef, TemplateRef} from '@angular/core';

/**
 * 根据ValueFormat转换为函数
 * @param format ValueFormat
 */
// tslint:disable-next-line
export function getValueFormatFn(format: ValueFormat<any>): (item: any) => string | number | any {
  if (isString(format)) {
    return item => item ? item[format as string] : '';
  }
  if (isFunction(format)) {
    return format;
  }
  return item => item;
}

/**
 * 提供insertAfter()
 * @param newElement
 * @param targetElement
 * @return 是否插入成功
 */
export function insertAfter(newElement: Element, targetElement: Element): boolean {
  const parent = targetElement.parentNode;
  if (!parent) {
    return false;
  }

  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
  return true;
}

// tslint:disable-next-line:no-any
export function isTemplateRef(value: any): boolean {
  return value instanceof TemplateRef;
}

export function findFirstNotEmptyNode(element: Element): Node | null {
  const children = element.childNodes;
  for (let i = 0; i < children.length; i++) {
    const node = children.item(i);
    if (filterNotEmptyNode(node)) {
      return node;
    }
  }
  return null;
}

export function filterNotEmptyNode(node: Node): Node | null {
  if (!node) {
    return null;
  }

  if (node.nodeType === 1 && (node as Element).outerHTML.toString().trim().length !== 0) {
    return node;
  } else if (node.nodeType === 3 && node.textContent !== null && node.textContent.toString().trim().length !== 0) {
    return node;
  }
  return null;
}

// tslint:disable-next-line:no-any
export function toNode<T extends Element>(element: any): T {
  return toNodes<T>(element)[0];
}

// tslint:disable-next-line:no-any
export function toNodes<T extends Element>(element: any): T[] {
  return element && (isNode(element) ? [element] : toArray(element).filter(isNode)) || [];
}

export function find<T extends Element>(selector: string, context?: Element): Element {
  return toNode<T>((context || document).querySelector(selector));
}

export function findAll<T extends Element>(selector: string, context?: Element): T[] {
  return toNodes<T>((context || document).querySelectorAll(selector));
}

export function coerceElement<T>(elementOrRef: ElementRef<T> | T): T {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

function getClazz(className: string | string[]): string[] {
  return isString(className) ? className.split(/\s+/) : className;
}

export function addClass<T extends Element>(elementOrRef: ElementRef<T> | T, className: string | string[]): void {
  if (elementOrRef && className) {
    const ele = coerceElement<T>(elementOrRef);
    ele.classList.add.apply(ele.classList, getClazz(className));
  }
}

export function removeClass<T extends Element>(elementOrRef: ElementRef<T> | T, className: string | string[]): void {
  if (elementOrRef && className) {
    const ele = coerceElement<T>(elementOrRef);
    ele.classList.remove.apply(ele.classList, getClazz(className));
  }
}

export function toggleClass<T extends Element>(elementOrRef: ElementRef<T> | T, className: string | string[]): void {
  if (elementOrRef && className) {
    const ele = coerceElement<T>(elementOrRef);
    ele.classList.toggle.apply(ele.classList, getClazz(className));
  }
}
