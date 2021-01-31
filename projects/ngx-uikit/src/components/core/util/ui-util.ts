// tslint:disable-next-line
import {ValueFormat} from '../type/nk-types';
import {isFunction, isNotNil, isString} from './nk-util';
import {TemplateRef} from '@angular/core';

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
export function insertAfter(newElement: Node | HTMLElement, targetElement: Node | HTMLElement): boolean {
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

export function findFirstNotEmptyNode(element: HTMLElement): Node | null {
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

  if (node.nodeType === 1 && (node as HTMLElement).outerHTML.toString().trim().length !== 0) {
    return node;
  } else if (node.nodeType === 3 && node.textContent !== null && node.textContent.toString().trim().length !== 0) {
    return node;
  }
  return null;
}
