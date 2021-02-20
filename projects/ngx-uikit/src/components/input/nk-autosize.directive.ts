import {AfterViewInit, Directive, DoCheck, ElementRef, HostListener, Input, NgZone, OnDestroy} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Platform} from '@angular/cdk/platform';
import {addClass} from '../core/util/ui-util';
import {toBoolean} from '../core/util/nk-util';

@Directive({
  selector: 'textarea[nk-autosize]',
  exportAs: 'nkAutosize',
  host: {
    rows: '1'
  }
})
export class NkAutosizeDirective implements AfterViewInit, DoCheck, OnDestroy {
  private autosize = false;
  _txtAutoSize: CdkTextareaAutosize;
  @Input() set nkMinRows( value: number) {
    this._txtAutoSize.minRows = value;
  }
  get nkMinRows(): number {
    return this._txtAutoSize.minRows;
  }
  @Input() set nkMaxRows( value: number) {
    this._txtAutoSize.maxRows = value;
  }
  get nkMaxRows(): number {
    return this._txtAutoSize.maxRows;
  }
  @Input('nk-autosize') set nkAutosize(value: string | boolean) {
    this.autosize = toBoolean(value);
  }
  get nkAutosize(): string | boolean {
    return this.autosize;
  }

  constructor(public _elementRef: ElementRef, public _platform: Platform, public _ngZone: NgZone) {
    this._txtAutoSize = new CdkTextareaAutosize(_elementRef, _platform, _ngZone);
    addClass(_elementRef, 'nk-textarea');
  }

  ngAfterViewInit(): void {
    if (this.autosize) {
      this._txtAutoSize.ngAfterViewInit();
    }
  }

  ngDoCheck(): void {
    if (this.autosize && this._platform.isBrowser) {
      this._txtAutoSize.resizeToFitContent();
    }
  }

  resizeToFitContent(force: boolean = false): void {
    this._txtAutoSize.resizeToFitContent(force);
  }

  @HostListener('input')
  _noopInputHandler(): void {
    // no-op handler that ensures we're running change detection on input events.
  }

  ngOnDestroy(): void {
    this._txtAutoSize.ngOnDestroy();
  }
}
