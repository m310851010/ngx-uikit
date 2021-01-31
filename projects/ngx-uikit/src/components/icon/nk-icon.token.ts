import { InjectionToken } from '@angular/core';
import {NkIcon} from '../core/type/nk-types';

/**
 * 图标的URL根地址,默认'assets/icons/',注意:必须以'/'结尾
 */
export const NK_ICON_ROOT_URL_TOKEN = new InjectionToken<string>('NK-ICON-ROOT-URL-TOKEN');

/**
 * 通过静态导入的图标集合,默认使用ajax的方式, 建议按需添加
 */
export const NK_ICON_TOKEN = new InjectionToken<NkIcon[]>('NK-ICON-TOKEN');
