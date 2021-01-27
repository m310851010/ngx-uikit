
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
  return Object.prototype.toString.call(input) === '[object Object]';
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

/**
 * 判断对象是否是Plain对象
 * @param obj 待验证对象
 */
// tslint:disable-next-line
export function isPlainObject(obj?: any) {
  if (!obj || !isObject(obj)) {
    return false;
  }

  const hasOwn = Object.prototype.hasOwnProperty;
  const hasOwnConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  let key;
  for (key in obj) { /**/ }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}

/**
 * 使用 === 深度比较两个对象的值是否相等
 * @param o1 第一个对象
 * @param o2 第二个对象
 */
// tslint:disable-next-line
export function equals(o1: any, o2: any): boolean {
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
  let t1 = typeof o1, t2 = typeof o2, length: number, key: any;
  // tslint:disable-next-line
  if (t1 != t2 || t1 != 'object') {
    return false;
  }

  if (isArray(o1)) {
    if (!isArray(o2)) {
      return false;
    }
    // tslint:disable-next-line
    if ((length = o1.length) == o2.length) {
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

// tslint:disable-next-line:no-any
export function isObservable<T>(obj: any): obj is Observable<T> {
  return obj && rxIsObservable(obj);
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
