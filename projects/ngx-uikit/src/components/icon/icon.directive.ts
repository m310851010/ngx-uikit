import {Directive, Input} from '@angular/core';

@Directive({
  selector: 'i.nk-icon, [nk-icon]',
  exportAs: 'nkIcon'
})
export class IconDirective {

  @Input('nz-icon') nzIcon!: string;
  constructor() { }
}
