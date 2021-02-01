import {Component, ElementRef, forwardRef, Host, Inject, OnInit, Optional, Renderer2} from '@angular/core';
import {NkRadioDirective} from './nk-radio.directive';
import {NkRadioContainerComponent} from './nk-radio-container.component';

@Component({
  selector: '[nk-radio-button]',
  exportAs: 'nkRadioButton',
  templateUrl: './nk-radio-button.component.html'
})
export class NkRadioButtonComponent extends NkRadioDirective implements OnInit {

  constructor(
    public elementRef: ElementRef,
    public render: Renderer2,
    @Optional() @Host() @Inject(forwardRef(() => NkRadioContainerComponent))
    public container: NkRadioContainerComponent) {
    super(elementRef, render, container);
  }

  ngOnInit(): void {
  }

  getMaxPathLength() {

  }

}
