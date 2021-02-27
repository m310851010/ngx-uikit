import { Injectable } from '@angular/core';
import {NkDocumentRefService, NkWindowRefService} from 'ngx-uikit/window-ref';
import {isArray} from 'ngx-uikit/core';

@Injectable()
export class NkPositioningService {

  constructor(public documentRef: NkDocumentRefService, public windowRef: NkWindowRefService) {
  }

  position(element: HTMLElement, round = true): ClientRect {
    let elPosition: ClientRect;
    let parentOffset: ClientRect = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };

    if (this.getStyle(element, 'position') === 'fixed') {
      elPosition = element.getBoundingClientRect();
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== this.documentRef.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      parentOffset.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  offset(element: HTMLElement, round = true): ClientRect {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: this.windowRef.pageYOffset - this.documentRef.documentElement.clientTop,
      left: this.windowRef.pageXOffset - this.documentRef.documentElement.clientLeft
    };

    const elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  getScrollParent(element: HTMLElement): HTMLElement {
    let style = getComputedStyle(element);
    const excludeStaticParent = style.position === 'absolute';
    const overflowRegex = /(auto|scroll|hidden)/;

    if (style.position === 'fixed') {
      return this.documentRef.body;
    }
    for (let parent = element; parent.parentElement; parent.parentElement !== this.documentRef.body) {
      parent = parent.parentElement;
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (overflowRegex.test(`${style.overflow}${style.overflowY}${style.overflowX}`)) {
        return parent;
      }
    }

    return this.documentRef.body;
  }

  positionElements(host: HTMLElement, target: HTMLElement, placement: string | string[], appendToBody?: boolean): NkClientBound {
    const hostElPosition = appendToBody ? this.offset(host, false) : this.position(host, false);
    const shiftWidth = {
      left: hostElPosition.left,
      center: hostElPosition.left + hostElPosition.width / 2 - target.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width,
      top: 0,
      bottom: 0
    };
    const shiftHeight = {
      top: hostElPosition.top,
      center: hostElPosition.top + hostElPosition.height / 2 - target.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height,
      left: 0,
      right: 0
    };
    const targetElBCR = target.getBoundingClientRect();

    const targetElPosition: NkClientBound = {
      height: targetElBCR.height || target.offsetHeight,
      width: targetElBCR.width || target.offsetWidth,
      top: 0,
      bottom: targetElBCR.height || target.offsetHeight,
      left: 0,
      right: targetElBCR.width || target.offsetWidth,
    };

    let placementPrimary: NkPlacement;
    let placementSecondary: NkPlacement;

    if (isArray(placement)) {
      const targetPlacement = this.getPlacement(host, target, placement);
      placementPrimary = targetPlacement[0];
      placementSecondary = targetPlacement[1];
    } else {
      placement = placement || '';
      placementPrimary = (placement.split('-')[0] || 'top') as NkPlacement;
      placementSecondary = (placement.split('-')[1] || 'center') as NkPlacement;
    }

    switch (placementPrimary) {
      case 'top':
        targetElPosition.top = hostElPosition.top - target.offsetHeight;
        targetElPosition.bottom += hostElPosition.top - target.offsetHeight;

        targetElPosition.left = placementSecondary === 'right'
          ? shiftWidth[placementSecondary] - target.offsetWidth : shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'bottom':
        targetElPosition.top = shiftHeight[placementPrimary];
        targetElPosition.bottom += shiftHeight[placementPrimary];
        targetElPosition.left = placementSecondary === 'right'
          ? shiftWidth[placementSecondary] - target.offsetWidth : shiftWidth[placementSecondary];
        targetElPosition.right += shiftWidth[placementSecondary];
        break;
      case 'left':
        targetElPosition.top = placementSecondary === 'bottom'
          ? shiftHeight[placementSecondary] - target.offsetHeight : shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left = hostElPosition.left - target.offsetWidth;
        targetElPosition.right += hostElPosition.left - target.offsetWidth;
        break;
      case 'right':
        targetElPosition.top = placementSecondary === 'bottom'
          ? shiftHeight[placementSecondary] - target.offsetHeight : shiftHeight[placementSecondary];
        targetElPosition.bottom += shiftHeight[placementSecondary];
        targetElPosition.left = shiftWidth[placementPrimary];
        targetElPosition.right += shiftWidth[placementPrimary];
        break;
    }

    targetElPosition.top = Math.round(targetElPosition.top);
    targetElPosition.bottom = Math.round(targetElPosition.bottom);
    targetElPosition.left = Math.round(targetElPosition.left);
    targetElPosition.right = Math.round(targetElPosition.right);
    targetElPosition.placementPrimary = placementPrimary;
    targetElPosition.placementSecondary = placementSecondary;

    return targetElPosition;
  }

  // 根据传入数组选取第一个合适的位置
  private getPlacement(host: HTMLElement, target: HTMLElement, placement: string[]): [NkPlacement, NkPlacement] {

    const hostElPosition = this.offset(host, false);
    const shiftWidth = {
      left: hostElPosition.left,
      center: hostElPosition.left + hostElPosition.width / 2 - target.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width,
      top: 0,
      bottom: 0
    };
    const shiftHeight = {
      top: hostElPosition.top,
      center: hostElPosition.top + hostElPosition.height / 2 - target.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height,
      left: 0,
      right: 0
    };

    let placementPrimary: NkPlacement = (placement[0].split('-')[0] || 'top') as NkPlacement;
    let placementSecondary: NkPlacement = (placement[0].split('-')[1] || 'center') as NkPlacement;

    for (const it of placement) {

    }
    for (const it of placement) {
      const placementPrimaryTemp = it.split('-')[0] || 'top';
      const placementSecondaryTemp = it.split('-')[1] || 'center';

      let top = 0;
      let left = 0;
      switch (placementPrimaryTemp) {
        case 'top':
          top = hostElPosition.top - target.offsetHeight;
          left = placementSecondaryTemp === 'right'
          ? shiftWidth[placementSecondaryTemp] - target.offsetWidth : shiftWidth[placementSecondary];
          break;
        case 'bottom':
          top = shiftHeight[placementPrimaryTemp];
          left = placementSecondaryTemp === 'right'
          ? shiftWidth[placementSecondaryTemp] - target.offsetWidth : shiftWidth[placementSecondary];
          break;
        case 'left':
          top = placementSecondaryTemp === 'bottom'
            ? shiftHeight[placementSecondaryTemp] - target.offsetHeight : shiftHeight[placementSecondary];
          left = hostElPosition.left - target.offsetWidth;
          break;
        case 'right':
          top = placementSecondaryTemp === 'bottom'
            ? shiftHeight[placementSecondaryTemp] - target.offsetHeight : shiftHeight[placementSecondary];
          left = shiftWidth[placementPrimaryTemp];
          break;
      }
      if (this.isInViewPort(target, {offsetLeft: left, offsetTop: top})) {
        placementPrimary = (it.split('-')[0] || 'top') as NkPlacement;
        placementSecondary = (it.split('-')[1] || 'center') as NkPlacement;
        return [placementPrimary, placementSecondary];
      }
    }
    return [placementPrimary, placementSecondary];
  }

  private isInViewPort(ele: HTMLElement, {offsetLeft, offsetTop}: {offsetLeft: number, offsetTop: number}): boolean {
    const targetElBCR = ele.getBoundingClientRect();
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = targetElBCR.height || targetElBCR.offsetHeight;
    const width = targetElBCR.width || targetElBCR.offsetWidth;
    offsetTop = offsetTop || ele.offsetTop;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const top = offsetTop - scrollTop;
    offsetLeft = offsetLeft || ele.offsetLeft;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const left = offsetLeft - scrollLeft;

    return top + height <= viewPortHeight && top > 0 && left + width <= viewPortWidth && left > 0;
  }

  private getStyle(element: HTMLElement, prop: keyof CSSStyleDeclaration): string {
    return this.windowRef.getComputedStyle(element)[prop];
  }

  private isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

  private offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl = (element.offsetParent || this.documentRef.documentElement) as HTMLElement;

    while (offsetParentEl && offsetParentEl !== this.documentRef.documentElement && this.isStaticPositioned(offsetParentEl)) {
      offsetParentEl = offsetParentEl.offsetParent as HTMLElement;
    }

    return offsetParentEl || this.documentRef.documentElement;
  }
}

export interface NkClientBound {
  top: number;
  bottom: number;
  width: number;
  height: number;
  left: number;
  right: number;
  placementPrimary?: NkPlacement;
  placementSecondary?: NkPlacement;
}

export type NkPlacement = 'top' | 'center' | 'bottom' | 'left' | 'right';
