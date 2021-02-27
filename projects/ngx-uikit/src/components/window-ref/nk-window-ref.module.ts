import { NgModule } from '@angular/core';
import { NkDocumentRefService } from './nk-document-ref.service';
import { NkWindowRefService } from './nk-window-ref.service';

@NgModule({
  providers: [
    NkDocumentRefService,
    NkWindowRefService,
  ],
})
export class NkWindowRefModule {
}
