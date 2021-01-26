
import {isObservable as rxIsObservable, Observable} from 'rxjs';

// tslint:disable-next-line:no-any
export function isString(str: any): str is string {
  return typeof str === 'string';
}

// tslint:disable-next-line:no-any
export function isDate(value: any): value is Date {
  return value instanceof Date || Object.prototype.toString.call(value) === '[object Date]';
}

// tslint:disable-next-line:no-any
export function isBoolean(value: any): value is boolean {
  return value === true || value === false;
}

export function isDateValid(date: Date): boolean {
  return date && date.getTime && !isNaN(date.getTime());
}

// tslint:disable-next-line
export function isFunction(fn: any): fn is Function {
  return (
    fn instanceof Function ||
    Object.prototype.toString.call(fn) === '[object Function]'
  );
}

// tslint:disable-next-line:no-any
export function isNumber(value?: any): value is number {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}

// tslint:disable-next-line:no-any
export function isArray<T>(input: any): input is T[] {
  return (
    input instanceof Array ||
    Object.prototype.toString.call(input) === '[object Array]'
  );
}

// tslint:disable-next-line:no-any
export function isObject<T>(input: any): input is T {
  return (
    isNotEmpty(input) && Object.prototype.toString.call(input) === '[object Object]'
  );
}

// tslint:disable-next-line:no-any
export function isObjectEmpty(obj: any): boolean {
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(obj).length === 0);
  }
  let k;
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }

  return true;
}

// tslint:disable-next-line:no-any
export function isUndefined(input: any): boolean {
  return input === void 0;
}
/**
 * 判断数据是否是null或者undefined或者.length为0
 * @param value 一个可为null的值
 */
// tslint:disable-next-line:no-any
export function isEmpty(value: any): boolean {
  return value === undefined || value === null || value.length === 0;
}

/**
 * 判断数据是否不为null或者undefined
 * @param value 一个可为null的值
 */
// tslint:disable-next-line:no-any
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

// tslint:disable-next-line:no-any
export function isBlank(input: any): boolean {
  if (isEmpty(input)) {
    return true;
  }
  return /^\s*$/g.test(input);
}

// tslint:disable-next-line:no-any
export function isNotBlank(input: any): boolean {
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

// tslint:disable-next-line
export function isEmptyObject( obj?: any ) {
  // tslint:disable-next-line:forin
  for (const name in obj ) {
    return false;
  }
  return true;
}

// tslint:disable-next-line:no-any
export function isObservable(obj: any): boolean {
  return rxIsObservable(obj);
}

// tslint:disable-next-line:no-any
export function isPromise(value: any): value is PromiseLike<any> {
  return value && typeof (value).subscribe !== 'function' && typeof (value).then === 'function';
}

// tslint:disable
export function noop() { }

export function getSystemLocaleId(): string {
  return (navigator.languages ? navigator.languages[0] : null) || navigator.language;
}
