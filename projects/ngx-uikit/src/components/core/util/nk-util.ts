
import {isObservable as rxIsObservable, Observable} from 'rxjs';
import {_isNumberValue, coerceBooleanProperty} from '@angular/cdk/coercion';
import {NkAny} from 'ngx-uikit/core';
const {hasOwnProperty} = Object.prototype;

export function hasOwn(obj: NkAny, key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

export function isString(str: NkAny): str is string {
  return typeof str === 'string';
}

export function isNotString(input: NkAny): input is string {
  return !isString(input);
}

export function isDate(value: NkAny): value is Date {
  return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}

export function isBoolean(value: NkAny): value is boolean {
  return value === true || value === false;
}

export function isDateValid(date: Date): boolean {
  return date && date.getTime && !isNaN(date.getTime());
}

// tslint:disable-next-line
export function isFunction(fn: NkAny): fn is Function {
  return typeof fn === 'function';
}

export function isNumber(value?: NkAny): value is number {
  return typeof value === 'number';
}

export function isNotNumber(input: NkAny): input is number {
  return !isNumber(input);
}

export const {isArray} = Array;

export function isNotArray<T>(input: NkAny): input is T {
  return !isArray(input);
}

export function isObject<T>(input: NkAny): input is T {
  return input !== null && typeof input === 'object';
}

export function isNotObject<T>(input: NkAny): input is T {
  return !isObject(input);
}

export function isObjectEmpty(obj: NkAny): boolean {
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(obj).length === 0);
  }
  for (const k in obj) {
    if (hasOwn(obj, k)) {
      return false;
    }
  }

  return true;
}

export function isUndefined(input: NkAny): boolean {
  return input === void 0;
}

/**
 * 判断数据是否是null或者undefined或者.length为0
 * 字符串和数组长度为0,返回true
 * @param value 任意值
 */
export function isEmpty(value: NkAny): boolean {
  return isNil(value) || value.length === 0;
}

/**
 * 判断数据是否不为null或者undefined
 * @param value 任意值
 */
export function isNotEmpty(value: NkAny): boolean {
  return !isEmpty(value);
}

/**
 * 数据是否为null或者undefined
 * @param value 任意值
 */
export function isNil(value: NkAny): boolean {
  return value === undefined || value === null;
}

/**
 * 数据是否不为null或者undefined
 * @param value 任意值
 */
export function isNotNil(value: NkAny): boolean {
  return !isNil(value);
}

export function isBlank(input: NkAny): boolean {
  if (isEmpty(input)) {
    return true;
  }
  return /^\s*$/g.test(input);
}

export function isNotBlank(input: NkAny): boolean {
  return !isBlank(input);
}

export function ltrim(str: string): string {
  return isEmpty(str) ? str : str.replace(/^\s+/, '');
}

export function rtrim(str: string): string {
  return isEmpty(str) ? str : str.replace(/(\s+$)/g, '');
}

export function trim(str: string): string {
  if (isEmpty(str)) {
    return str;
  }

  str = str.replace(/^\s+/, '');
  for (let i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return str;
}

export function isEmptyObject( obj?: NkAny ): boolean {
  // tslint:disable-next-line:forin
  for (const name in obj ) {
    return false;
  }
  return true;
}

/**
 * 判断对象是否是Plain对象
 * @param obj 待验证对象
 */
export function isPlainObject(obj?: NkAny): boolean {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isWindow(obj: NkAny): boolean {
  // @ts-ignore
  return isObject(obj) && obj === obj.window;
}

function nodeType(obj: NkAny): number {
  // @ts-ignore
  return !isWindow(obj) && isObject(obj) && obj.nodeType;
}

export function isNode(obj: NkAny): boolean {
  return nodeType(obj) >= 1;
}

/**
 * 使用 === 深度比较两个对象的值是否相等
 * @param o1 第一个对象
 * @param o2 第二个对象
 */
// tslint:disable-next-line
export function equals(o1: NkAny, o2: NkAny): boolean {
  if (o1 === o2) {
    return true;
  }

  if (o1 === null || o2 === null) {
    return false;
  }

  // NaN === NaN
  if (o1 !== o1 && o2 !== o2) {
    return true;
  }

  // tslint:disable-next-line
  let t1 = typeof o1, t2 = typeof o2, length: number, key: NkAny;
  // tslint:disable-next-line
  if (t1 != t2 || t1 != 'object') {
    return false;
  }

  if (isArray(o1)) {
    if (!isArray(o2)) {
      return false;
    }

    length = o1.length;
    if (length === o2.length) {
      for (key = 0; key < length; key++) {
        if (!equals(o1[key], o2[key])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  if (isArray(o2)) {
    return false;
  }

  const keySet = Object.create(null);
  // tslint:disable-next-line
  for (key in o1) {
    if (!equals(o1[key], o2[key])) {
      return false;
    }
    keySet[key] = true;
  }
  for (key in o2) {
    if (!(key in keySet) && typeof o2[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

export function isObservable<T>(obj: NkAny): obj is Observable<T> {
  return obj && rxIsObservable(obj);
}

export function isPromise(value: NkAny): value is PromiseLike<NkAny> {
  return value && typeof (value).subscribe !== 'function' && typeof (value).then === 'function';
}

// @ts-ignore
export const toArray = Array.from || (value => Array.prototype.slice.call(value));

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

/**
 * 转换为boolean 值
 */
export const toBoolean = coerceBooleanProperty;

// tslint:disable-next-line:typedef
export function noop() { }

/**
 * 获取浏览器默认语言
 */
export function getSystemLocaleId(): string {
  return (navigator.languages ? navigator.languages[0] : null) || navigator.language;
}

/**
 * 当value为null或undefined时返回默认值,否则返回原始值
 * @param value 原始值
 * @param defaultValue 默认值
 */
export function defaultIfy<T>(value: T, defaultValue: T): T {
  return isNil(value) ? defaultValue : value;
}
