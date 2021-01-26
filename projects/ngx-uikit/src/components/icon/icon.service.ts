import {Injectable, SecurityContext} from '@angular/core';
import {NkIcon, NkTypes, UrlNotSafeError} from '../core/type/nk-types';
import {Observable, of} from 'rxjs';
import {isString} from '../core/util/nk-util';
import {DomSanitizer} from '@angular/platform-browser';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {map} from 'rxjs/operators';

import { NkIconAccordionClose } from './icon-type/accordion-close';
import { NkIconAccordionOpen } from './icon-type/accordion-open';
import { NkIconDividerIcon } from './icon-type/divider-icon';
import { NkIconFormCheckboxIndeterminate } from './icon-type/form-checkbox-indeterminate';
import { NkIconFormCheckbox } from './icon-type/form-checkbox';
import { NkIconFormDatalist } from './icon-type/form-datalist';
import { NkIconFormRadio } from './icon-type/form-radio';
import { NkIconFormSelect } from './icon-type/form-select';
import { NkIconListBullet } from './icon-type/list-bullet';
import { NkIconNavParentClose } from './icon-type/nav-parent-close';
import { NkIconNavParentOpen } from './icon-type/nav-parent-open';
import { NkIconCloseIcon } from './icon-type/close-icon';
import { NkIconCloseLarge } from './icon-type/close-large';
import { NkIconMarker } from './icon-type/marker';
import { NkIconNavbarToggleIcon } from './icon-type/navbar-toggle-icon';
import { NkIconOverlayIcon } from './icon-type/overlay-icon';
import { NkIconPaginationNext } from './icon-type/pagination-next';
import { NkIconPaginationPrevious } from './icon-type/pagination-previous';
import { NkIconSearchIcon } from './icon-type/search-icon';
import { NkIconSearchLarge } from './icon-type/search-large';
import { NkIconSearchNavbar } from './icon-type/search-navbar';
import { NkIconSlidenavNextLarge } from './icon-type/slidenav-next-large';
import { NkIconSlidenavNext } from './icon-type/slidenav-next';
import { NkIconSlidenavPreviousLarge } from './icon-type/slidenav-previous-large';
import { NkIconSlidenavPrevious } from './icon-type/slidenav-previous';
import { NkIconSpinner } from './icon-type/spinner';
import { NkIconTotop } from './icon-type/totop';

export const NK_ICONS_USED_COMPONENT: NkIcon[] = [
  NkIconAccordionClose,
  NkIconAccordionOpen,
  NkIconDividerIcon,
  NkIconFormCheckboxIndeterminate,
  NkIconFormCheckbox,
  NkIconFormDatalist,
  NkIconFormRadio,
  NkIconFormSelect,
  NkIconListBullet,
  NkIconNavParentClose,
  NkIconNavParentOpen,
  NkIconCloseIcon,
  NkIconCloseLarge,
  NkIconMarker,
  NkIconNavbarToggleIcon,
  NkIconOverlayIcon,
  NkIconPaginationNext,
  NkIconPaginationPrevious,
  NkIconSearchIcon,
  NkIconSearchLarge,
  NkIconSearchNavbar,
  NkIconSlidenavNextLarge,
  NkIconSlidenavNext,
  NkIconSlidenavPreviousLarge,
  NkIconSlidenavPrevious,
  NkIconSpinner,
  NkIconTotop
];

@Injectable({
  providedIn: 'root'
})
export class IconService {
  /**
   * 缓存图标
   */
  protected readonly _svgIcons: NkTypes<NkIcon> = {};
  /**
   * 图标资源的根目录,必须以'/'结尾
   */
  protected _iconUrlRoot = '';
  /**
   * 是否懒加载,默认false
   */
  protected lazyLoad = false;
  constructor( protected sanitizer: DomSanitizer) {
    this.addIcon(...NK_ICONS_USED_COMPONENT);
  }

  /**
   * 添加图标到缓存数据
   * @param icons
   */
  addIcon(...icons: NkIcon[]): void {
    for (const icon of icons) {
      this._svgIcons[icon.name] = icon;
    }
  }

  getIconElement(icon: string | NkIcon): Observable<SVGElement> | null {
    const iconType: NkIcon | null = isString(icon) ? this._svgIcons[icon] : icon;
   // iconType ? of(iconType) :
    return null;
  }

  dynamicLoadIcon(icon: string, url: string): Observable<NkIcon | null> {
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, url);
    if (!safeUrl) {
      throw new UrlNotSafeError('icon', url);
    }

    return ajax({
        url,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        responseType: 'text'
      }).pipe(map<AjaxResponse, NkIcon>(resp => {
        let viewBox = resp.response.match(/viewBox[ =]*"([\d ]+)"/);
        viewBox = viewBox && viewBox.length ? viewBox[1] : '0 0 20 20';
        const svgContent = resp.response.replace(/<svg[^>]*>/, '')
          .replace('</svg>', '')
          .trim();
        return {name: icon, icon: svgContent, viewBox};
      }));
  }
}
