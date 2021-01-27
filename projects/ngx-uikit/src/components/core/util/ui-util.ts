// tslint:disable-next-line
import {OptionFormat} from '../type/nk-key-value';
import {isFunction, isString} from './nk-util';

/**
 * 根据OptionFormat转换为函数
 * @param format OptionFormat
 */
// tslint:disable-next-line
export function getOptionFormatFn(format: OptionFormat<any>): (item: any) => string | number | any {
  if (isString(format)) {
    return item => item ? item[format as string] : '';
  }
  if (isFunction(format)) {
    return format;
  }
  return item => item;
}
