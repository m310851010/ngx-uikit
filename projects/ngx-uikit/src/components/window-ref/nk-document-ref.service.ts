import { Injectable } from '@angular/core';

@Injectable()
export class NkDocumentRefService {

  constructor() {
  }

  get body(): HTMLBodyElement {
    return document.body as HTMLBodyElement;
  }

  get documentElement(): HTMLElement {
    return document.documentElement;
  }
}
