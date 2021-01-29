import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChange, SimpleChanges} from '@angular/core';
import {NkIconService} from './nk-icon.service';
import {NkIcon} from '../core/type/nk-key-value';
import {isEmpty, isNotEmpty} from '../core/util/nk-util';

/**
 * 图标指令
 * @example
 * <i nk-icon="close"></i>
 */
@Directive({
  // tslint:disable-next-line
  selector: '[nk-icon]',
  exportAs: 'nkIcon',
  host: {
    class: 'nk-icon',
  }
})
export class NkIconDirective implements OnChanges {

  @Input('nk-icon') nkIcon: string | NkIcon;
  @Input() nkRotate = 0;
  @Input() nkWidth: number;
  @Input() nkHeight: number;
  _svg: SVGElement;

  constructor(
    public iconService: NkIconService,
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) { }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkIcon) {
      this.clearSVGElement();
      if (isEmpty(this.nkIcon)) {
        return;
      }

      const icon = this.iconService.getIconElement(this.nkIcon);
      if (icon) {
        icon.subscribe( svg => {
          this._svg = svg;
          this.renderer.appendChild(this.elementRef.nativeElement, svg);
          this.handleRotate(svg);
          this.handleWidthHeight(svg);
        });
      }
      return;
    }

    if (this._svg) {
      this.handleRotate(this._svg);
      this.handleWidthHeight(this._svg);
    }
  }

  clearSVGElement(): void {
    const el = this.elementRef.nativeElement;
    const children = el.childNodes;
    for (const child of children) {
      if (child && child.tagName && child.tagName.toLowerCase() === 'svg') {
        this.renderer.removeChild(el, child);
      }
    }
  }

  private handleRotate(svg: SVGElement): void {
    if (this.nkRotate) {
      this.renderer.setStyle(svg, 'transform', `rotate(${this.nkRotate}deg)`);
    } else {
      this.renderer.removeStyle(svg, 'transform');
    }
  }

  private handleWidthHeight(svg: SVGElement): void {
    if (isNotEmpty(this.nkWidth)) {
      this.renderer.setAttribute(svg, 'width', this.nkWidth.toString());
    } else {
      this.renderer.removeAttribute(svg, 'width');
    }

    if (isNotEmpty(this.nkHeight)) {
      this.renderer.setAttribute(svg, 'height', this.nkHeight.toString());
    } else {
      this.renderer.removeAttribute(svg, 'height');
    }
  }
}
