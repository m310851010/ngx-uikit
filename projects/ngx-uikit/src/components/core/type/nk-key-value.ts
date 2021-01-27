/**
 * key/value对象
 */
export interface NkKeyValue<V> {
  [key: string ]: V;
}

/**
 * 图标对象
 */
export interface NkIcon {
  name: string;
  /**
   * SVG图的viewBox,例如 '0 0 20 20'
   */
  viewBox: string;
  icon: string;
}

/**
 * 框架异常
 */
export class NkError extends Error {
  constructor(module: string, message: string) {
    super(`[ngx-uikit/${module}]:${message}`);
  }
}

export class UrlNotSafeError extends NkError {
  constructor(module: string, url: string) {
    super(module, `The url "${url}" is unsafe.`);
  }
}

export class IconNotFoundError extends NkError {
  constructor(icon: string) {
    super('icon', `the icon ${icon} does not exist or is not registered.`);
  }
}

/**
 * 比较器函数
 */
export type CompareWith<T> = (o1: T, o2: T) => boolean;

/**
 * 默认比较器
 * @param o1 对象1
 * @param o2 对象2
 */
// tslint:disable-next-line
export const defaultCompareWith: CompareWith<any> = (o1, o2) => o1 === o2;

/**
 * 格式化函数
 */
// tslint:disable-next-line
export type OptionFormat<T> = string | ((item: T) => string | number | any);

/**
 * 默认格式化函数
 * @param item
 */
// tslint:disable-next-line
export const defaultOptionFormat: OptionFormat<any> = item => item;
