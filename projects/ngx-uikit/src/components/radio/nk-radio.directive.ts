import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[nk-radio]',
  host: {
    class: 'nk-radio'
  }
})
export class NkRadioDirective {

  constructor() { }

}
