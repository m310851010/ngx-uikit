/**
 * key/value对象
 */
export interface NkTypes<V> {
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
