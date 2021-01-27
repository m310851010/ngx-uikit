import {Inject, Injectable, Optional} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import zh_CN from './locale/zh_CN';
import { DateLocale, NkI18n } from './nk-i18n';
import { NK_DATE_TOKEN, NK_I18N_TOKEN } from './nk-i18n.token';
import {NkKeyValue} from '../core/type/nk-key-value';
import {NK_LOCALES} from './nk-locale';
import {getSystemLocaleId, isEmpty, isString} from '../core/util/nk-util';

@Injectable({
  providedIn: 'root'
})
export class NkI18nService {
  private _locale: NkI18n = this.getDefaultLocale();
  private _change = new BehaviorSubject<NkI18n>(this._locale);
  private dateLocale: DateLocale;
  private _allLocales = NK_LOCALES;

  get localeChange(): Observable<NkI18n> {
    return this._change.asObservable();
  }

  constructor(@Optional() @Inject(NK_I18N_TOKEN) locale: NkI18n, @Optional() @Inject(NK_DATE_TOKEN) dateLocale: DateLocale) {
    this.setLocale(locale || this.getDefaultLocale());
    this.setDateLocale(dateLocale || null);
  }

  // tslint:disable-next-line:no-any
  translate(path: string, data?: NkKeyValue<any>): string {
    let content = this._getObjectPath(this._locale, path);
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach(key => (content = content.replace(new RegExp(`%${key}%`, 'g'), data[key])));
      }
      return content;
    }
    return path;
  }

  /**
   * 设置当前国家区域语言,全局生效
   * @param locale 地区语言
   */
  setLocale(locale: string | NkI18n): void {
    const newLocale: NkI18n = isString(locale) ? this._allLocales[locale] : locale;
    if (isEmpty(newLocale)) {
      return;
    }
    if (this._locale.locale === newLocale.locale) {
      return;
    }
    this._locale = newLocale;
    this._allLocales[newLocale.locale as string] = newLocale;
    this._change.next(newLocale);
  }

  getLocale(): NkI18n {
    return this._locale;
  }

  setDateLocale(dateLocale: DateLocale): void {
    this.dateLocale = dateLocale;
  }

  getDateLocale(): DateLocale {
    return this.dateLocale;
  }

  // tslint:disable-next-line:no-any
  getLocaleData(path?: string, defaultValue?: any): any {
    const result = path ? this._getObjectPath(this._locale, path) : this._locale;
    return result || defaultValue;
  }

  getDefaultLocaleId(): string {
    return getSystemLocaleId();
  }

  getDefaultLocale(): NkI18n {
    const localeId = this.getDefaultLocaleId();
    return NK_LOCALES[localeId] || zh_CN;
  }

  // tslint:disable-next-line:no-any
  private _getObjectPath(obj: NkKeyValue<any>, path: string): string | object | any {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}
