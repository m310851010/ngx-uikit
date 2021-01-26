import { Pipe, PipeTransform } from '@angular/core';
import { NkI18nService } from './nk-i18n.service';

@Pipe({
  name: 'nkI18n'
})
export class NkI18nPipe implements PipeTransform {
  constructor(private _locale: NkI18nService) {}

  transform(path: string, keyValue?: object): string {
    return this._locale.translate(path, keyValue);
  }
}
