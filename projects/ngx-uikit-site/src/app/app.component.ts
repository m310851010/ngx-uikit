import {Component, OnInit} from '@angular/core';
import {NkI18nService} from '../../../ngx-uikit/src/components/i18n/nk-i18n.service';
import {IconService} from '../../../ngx-uikit/src/components/icon/icon.service';

@Component({
  selector: 'site-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ngx-uikit-site';

  constructor(public i18n: NkI18nService, protected iconService: IconService) {
    this.i18n.localeChange.subscribe(value => {
      console.log('收到国际化变更===', value);
    });
    iconService.dynamicLoadIcon('500px', 'assets/images/500px.svg').subscribe(v => {
      console.log(v);
    });
  }

  ngOnInit(): void {
    this.i18n.localeChange.subscribe(value => {
      console.log('收到国际化变更===', value);
    });
  }
}
