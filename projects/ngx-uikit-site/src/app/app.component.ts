import {Component, OnInit} from '@angular/core';
import {NkCheckable} from '../../../ngx-uikit/src/components/core/type/nk-types';
import {NkI18nService} from '../../../ngx-uikit/src/components/i18n/nk-i18n.service';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ngx-uikit-site';
  category = '';
  subject = '';
  constructor(public i18n: NkI18nService) {
    this.i18n.localeChange.subscribe(value => {
      console.log('收到国际化变更===', value);
    });
  }

  ngOnInit(): void {
    this.i18n.localeChange.subscribe(value => {
      console.log('收到国际化变更===', value);
    });
  }
}
