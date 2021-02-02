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

export class IconLoadFailError extends NkError {
  constructor(icon: string, url: string) {
    super('icon', `failed to load icon "${icon}" from URL "${url}". you can:
    1. set the correct URL by "NK_ICON_ROOT_URL_TOKEN",
    2. register icon to NkIconService by "addIcon" function
    3. reset the name of the icon, e.g, "myDIr/${icon}"`);
  }
}

/**
 * 比较器函数, 与 SelectControlValueAccessor 相同
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
export type ValueFormat<T> = string | ((item: T) => string | number | any);

/**
 * 默认格式化函数
 * @param item 单个数据项
 */
// tslint:disable-next-line
export const defaultValueFormat: ValueFormat<any> = item => item;

/**
 * option类型基本数据定义
 */
// tslint:disable-next-line
export interface NkCheckable extends NkKeyValue<any> {

  /**
   * 是否禁用
   */
  nkDisabled?: boolean | null;
  /**
   * 值
   */
  // tslint:disable-next-line
  nkValue?: any | null;
  /**
   * 标签文本
   */
  nkLabel?: string | null;

}

export interface NkCheckboxOption extends NkCheckable {
  /**
   * 是否选中
   */
  nkChecked?: boolean | null;
  /**
   * 是否半选
   */
  nkIndeterminate?: boolean | null;
}

export interface NkRadioOption extends NkCheckable {
  /**
   * 是否选中, 有多个为true时,只对第一个有效
   */
  nkChecked?: boolean | null;
}

export type NkButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'text' | 'link';
export type NkButtonSize = 'large' | 'small' | 'default';
