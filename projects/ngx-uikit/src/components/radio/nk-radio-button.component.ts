import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Host, HostListener,
  Inject, Input, OnChanges,
  OnInit,
  Optional,
  Renderer2, SimpleChange, SimpleChanges,
  ViewChild, ViewEncapsulation
} from '@angular/core';
import {NkRadioDirective} from './nk-radio.directive';
import {NkRadioGroupComponent} from './nk-radio-group.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NkButtonSize, NkButtonType} from '../core/type/nk-types';

@Component({
  selector: '[nk-radio-button]',
  exportAs: 'nkRadioButton',
  templateUrl: './nk-radio-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NkRadioDirective),
      multi: true
    },
    {
      provide: NkRadioDirective,
      useExisting: forwardRef(() => NkRadioButtonComponent)
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nk-button-default]': `nkType === 'default'`,
    '[class.nk-button-primary]': `nkType === 'primary'`,
    '[class.nk-button-secondary]': `nkType === 'secondary'`,
    '[class.nk-button-danger]': `nkType === 'danger'`,
    '[class.nk-button-link]': `nkType === 'link'`,
    '[class.nk-button-text]': `nkType === 'text'`,
    '[class.nk-button-small]': `nkSize === 'small'`,
    '[class.nk-button-large]': `nkSize === 'large'`,
    '[class.uk-width-1-1]': 'nkBlock',
  }
})
export class NkRadioButtonComponent extends NkRadioDirective implements OnInit, OnChanges {

  /**
   * 按钮大小
   */
  @Input() nkSize: NkButtonSize;
  /**
   * 按钮类型
   */
  @Input() nkType: NkButtonType = 'default';
  /**
   * 是否块级方式显示
   */
  @Input() nkBlock: boolean;

  @ViewChild('inputElement', {read: ElementRef}) inputElement: ElementRef;

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkRadioGroupComponent))
    public container: NkRadioGroupComponent) {
    super(elementRef, render, container);
    this.render.removeClass(this.elementRef.nativeElement, 'nk-radio');
    this.render.addClass(this.elementRef.nativeElement, 'nk-button');
    this.render.addClass(this.elementRef.nativeElement, 'nk-button-default');
  }

  ngOnInit(): void {
    this._elementRef = this.inputElement;
    if (this.container) {
      this.render.addClass(this.container.elementRef.nativeElement, 'nk-button-group');
    }
    super.ngOnInit();
  }

  handleCheckedButtonState(checked: boolean): void {
    this.render.setProperty(this.inputElement.nativeElement, 'checked', checked);
    super.handleCheckedState(checked);
    this.setButtonChecked(checked);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.nkOnItemClick.emit(event);
    this._onTouched();

    const checked = this.getCheckedState();
    if (checked) {
      return;
    }
    this.handleCheckedButtonState(true);
  }

  setCheckedState(checked: boolean): void {
    super.setCheckedState(checked);
    this.setButtonChecked(checked);
  }

  private setButtonChecked(checked: boolean): void {
    if (checked) {
      this.render.addClass(this.elementRef.nativeElement, 'nk-active');
    } else {
      this.render.removeClass(this.elementRef.nativeElement, 'nk-active');
    }
  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.setButtonDisabled(isDisabled);
  }
  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.nkDisabled) {
      this.setButtonDisabled(this.nkDisabled);
    }
  }

  setButtonDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.render.addClass(this.elementRef.nativeElement, 'disabled');
      this.render.addClass(this.elementRef.nativeElement, 'overlay-disabled');
    } else {
      this.render.removeClass(this.elementRef.nativeElement, 'disabled');
      this.render.removeClass(this.elementRef.nativeElement, 'overlay-disabled');
    }
  }
}
