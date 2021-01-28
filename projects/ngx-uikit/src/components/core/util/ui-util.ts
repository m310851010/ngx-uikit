// tslint:disable-next-line
import {ValueFormat} from '../type/nk-key-value';
import {isFunction, isString} from './nk-util';

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
