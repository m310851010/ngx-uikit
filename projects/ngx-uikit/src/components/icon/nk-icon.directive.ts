import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChange, SimpleChanges} from '@angular/core';
import {NkIconService} from './nk-icon.service';
import {NkIcon} from '../core/type/nk-types';
import {isEmpty, isNotEmpty} from '../core/util/nk-util';
import {findAll} from '../core/util/ui-util';

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
  @Input() nkWidth = 20;
  @Input() nkHeight = 20;
  /**
   * 是否执行stroke动画
   */
  @Input() nkStrokeAnimation: boolean;
  _svg: SVGElement | null;

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
          this.strokeAnimation(svg);
        });
      }
      return;
    }

    if (!this._svg) {
      return;
    }

    if (changes.nkRotate) {
      this.handleRotate(this._svg);
    }

    if ((changes.nkHeight || changes.nkWidth)) {
      this.handleWidthHeight(this._svg);
    }

    if (changes.nkStrokeAnimation) {
      this.strokeAnimation(this._svg);
    }
  }

  clearSVGElement(): void {
    if (this._svg) {
      const el = this.elementRef.nativeElement;
      this.renderer.removeChild(el, this._svg);
      this._svg = null;
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

  strokeAnimation(svg?: SVGElement): void {
    const newSvg = svg || this._svg;
    if (!newSvg) {
      return ;
    }

    if (this.nkStrokeAnimation) {
      const length = this.getMaxPathLength(newSvg);
      this.addAnimationStyle(newSvg, length);
    } else {
      this.removeAnimationStyle(newSvg);
    }
  }

  addAnimationStyle(svg: SVGElement, length: number): void {
    if (length) {
      svg.style.setProperty('--nk-animation-stroke', `${length}`);
      svg.classList.add('nk-animation-stroke');
    }
  }

  removeAnimationStyle(svg: SVGElement): void {
    if (svg.classList.contains('nk-animation-stroke')) {
      svg.style.removeProperty('--nk-animation-stroke');
      svg.classList.remove('nk-animation-stroke');
    }
  }

  getMaxPathLength(svg: SVGElement): number {
      return Math.ceil(
        Math.max(0, ...findAll<SVGPathElement>('[stroke]', svg).map(stroke => {
            try {
              return stroke.getTotalLength();
            } catch (e) {
              return 0;
            }
          })
        ));
  }
}
