import { InjectionToken } from '@angular/core';
import { DateLocale, NkI18n } from './nk-i18n';

/**
 * 导出国际化Token, 支持语言代码和NkI18n
 */
export const NK_I18N_TOKEN = new InjectionToken<string | NkI18n>('NK-I18N-TOKEN');

export const NK_DATE_TOKEN = new InjectionToken<DateLocale>('NK-DATE-TOKEN');
