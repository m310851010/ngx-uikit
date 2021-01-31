import {Inject, Injectable, Optional, Renderer2, SecurityContext} from '@angular/core';
import {IconLoadFailError, IconNotFoundError, NkIcon, NkKeyValue, UrlNotSafeError} from '../core/type/nk-types';
import {Observable, of, throwError} from 'rxjs';
import {isNotEmpty, isString} from '../core/util/nk-util';
import {DomSanitizer} from '@angular/platform-browser';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {catchError, finalize, map, share, tap} from 'rxjs/operators';

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
import {DOCUMENT} from '@angular/common';
import {NK_ICON_ROOT_URL_TOKEN, NK_ICON_TOKEN} from './nk-icon.token';
import {NkIconAccordionClose} from './icon-type/accordion-close';
import {NkIconLoading} from './icon-type/loading';

export const NK_ICONS_USED_COMPONENT: NkIcon[] = [
  NkIconAccordionOpen,
  NkIconAccordionClose,
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
  NkIconTotop,
  NkIconLoading
];

@Injectable({
  providedIn: 'root'
})
export class NkIconService {
  /**
   * 缓存图标
   */
  protected readonly _svgIcons: NkKeyValue<NkIcon> = {};
  protected readonly _svgElementCache: NkKeyValue<NkIconSvgElement> = {};
  /**
   * 正在处理中的图标
   */
  protected _inProgressIcon: NkKeyValue<Observable<NkIcon | null>> = {};
  /**
   * 图标资源的根目录,必须以'/'结尾
   */
  protected _iconUrlRoot = 'assets/icons/';

  constructor(
    protected _sanitizer: DomSanitizer,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) protected  _document: any,
    @Optional() @Inject(NK_ICON_ROOT_URL_TOKEN) protected _urlRoot: string,
    @Optional() @Inject(NK_ICON_TOKEN) protected _icons: NkIcon[]
  ) {
    if (isNotEmpty(_urlRoot)) {
      this._iconUrlRoot = _urlRoot;
    }
    if (isNotEmpty(_icons)) {
      this.addIcon(..._icons);
    }
    this.addIcon(...NK_ICONS_USED_COMPONENT);
  }

  /**
   * 添加图标到缓存数据
   * @param icons 添加图标集合
   */
  addIcon(...icons: NkIcon[]): void {
    for (const icon of icons) {
      this._svgIcons[this.getIconName(icon.name)] = icon;
    }
  }

  getIconElement(icon: string | NkIcon): Observable<SVGElement> | null {
    const iconType: NkIcon | null = isString(icon) ? this._svgIcons[this.getIconName(icon)] : icon;
    const iconObservable = iconType ? of(iconType) : this.dynamicLoadIcon(icon as string);
    return iconObservable.pipe(
      tap(ico => {
      if (!ico) {
        throw new IconNotFoundError(icon as string);
      }
      this._svgIcons[ico.name] = ico;
    }),
      map(ico => this.getSVGElement(ico as NkIcon)));
  }

  dynamicLoadIcon(icon: string): Observable<NkIcon | null> {
    const url = this._iconUrlRoot + icon + '.svg';
    const iconName = this.getIconName(icon);
    const safeUrl = this._sanitizer.sanitize(SecurityContext.URL, url);
    if (!safeUrl) {
      throw new UrlNotSafeError('icon', url);
    }

    let inProgress = this._inProgressIcon[iconName];
    if (inProgress) {
      return inProgress;
    }

    inProgress = ajax({
        url,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'get',
        responseType: 'text'
      }).pipe(
        map<AjaxResponse, NkIcon>(resp => {
        let viewBox = resp.response.match(/viewBox[ =]*"([\d ]+)"/);
        viewBox = viewBox && viewBox.length ? viewBox[1] : '0 0 20 20';
        const svgContent = resp.response.replace(/<svg[^>]*>/, '')
          .replace('</svg>', '')
          .trim();
        return {name: iconName, icon: svgContent, viewBox};
      }),
      share(),
      catchError( (error) => throwError(new IconLoadFailError(icon, safeUrl))),
      finalize(() => delete this._inProgressIcon[iconName]));

    this._inProgressIcon[iconName] = inProgress;
    return inProgress;
  }

  getSVGElement(icon: NkIcon): SVGElement {
    const iconName = this.getIconName(icon.name);
    const cached = this._svgElementCache[iconName];
    if (cached) {
      return this.cloneSVG(cached.icon);
    }

    const svg = this.createSVGElement(icon.icon, icon.viewBox);
    this._svgElementCache[iconName] = {...icon, icon: svg};
    return this.cloneSVG(svg);
  }

  getIconName(iconName: string): string {
    return iconName.replace(/\//g, '-');
  }

  createSVGElement(icon: string, viewBox: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = `<svg viewBox="${viewBox}" width="1em" height="1em" fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">${icon}</svg>`;
    return div.firstElementChild as SVGElement;
  }

  cloneSVG(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
  }

}

export interface NkIconSvgElement {
  icon: SVGElement;
  name: string;
  /**
   * SVG图的viewBox,例如 '0 0 20 20'
   */
  viewBox: string;
}
