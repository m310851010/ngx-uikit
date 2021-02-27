import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {NkI18nService } from './nk-i18n.service';
import {Subscription} from 'rxjs';
import {equals} from 'ngx-uikit/core';

@Pipe({
  name: 'nkI18n',
  pure: false
})
export class NkI18nPipe implements PipeTransform, OnDestroy {

  protected _value = '';
  protected _lastKey: string;
  protected _lastParams?: object;
  protected _onLangChange: Subscription | null;

  constructor(protected _locale: NkI18nService, protected _i18n: NkI18nService) {
  }

  transform(path: string, keyValue?: object): string {
    if (this._lastKey === path && equals(this._lastParams, keyValue)) {
      return this._value;
    }

    this._lastKey = path;
    this._lastParams = keyValue;
    this._value = this._locale.translate(path, keyValue);
    this._dispose();

    if (!this._onLangChange) {
      this._onLangChange = this._i18n.localeChange.subscribe(() => {
        if (this._lastKey) {
          this._value = this._locale.translate(this._lastKey, this._lastParams);
        }
      });
    }
    return this._value;
  }

  private _dispose(): void {
    if (this._onLangChange) {
      this._onLangChange.unsubscribe();
      this._onLangChange = null;
    }
  }

  ngOnDestroy(): void {
    this._dispose();
  }

}
