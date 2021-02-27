import {NgModule} from '@angular/core';
import {NkPositioningService} from './nk-positioning.service';
import {NkWindowRefModule} from 'ngx-uikit/window-ref';

@NgModule({
  imports: [NkWindowRefModule],
  providers: [NkPositioningService]
})

export class NkPositioningModule {
}
