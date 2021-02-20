import {Directive, EmbeddedViewRef, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[nkTemplateOutlet]',
  exportAs: 'nkTemplateOutlet'
})
export class NkTemplateOutletDirective implements OnChanges {
  // tslint:disable-next-line
  private _viewRef: EmbeddedViewRef<any> | null = null;
  private context = new NkTemplateOutletContext();
  // tslint:disable-next-line
  @Input() public nkTemplateOutletContext !: any;
  // tslint:disable-next-line
  @Input() public nkTemplateOutlet: TemplateRef<any>;
  // tslint:disable-next-line
  constructor(private _viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) {
  }

  ngOnChanges(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.nkTemplateOutlet) {
      this.context.$implicit = changes.nkTemplateOutlet.currentValue;
    }
    const recreateView = this._shouldRecreateView(changes);
    const isTemplateRef = this.nkTemplateOutlet instanceof TemplateRef;
    const context = isTemplateRef ? this.nkTemplateOutletContext : this.context;

    if (recreateView) {
      const viewContainerRef = this._viewContainerRef;
      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }
      const templateRef = isTemplateRef ? this.nkTemplateOutlet : this.templateRef;
      this._viewRef = viewContainerRef.createEmbeddedView(templateRef, context);
    } else if (this._viewRef) {
      this._updateExistingContext(context);
    }
  }

  private _shouldRecreateView(changes: { [K in keyof this]?: SimpleChange } & SimpleChanges): boolean {
    const ctxChange = changes.nkTemplateOutletContext;
    return !!changes.nkTemplateOutlet || ((!!ctxChange) && this._hasContextShapeChanged(ctxChange));
  }

  private _hasContextShapeChanged(ctxChange: SimpleChange): boolean {
    const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
    const currCtxKeys = Object.keys(ctxChange.currentValue || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const propName of currCtxKeys) {
        if (prevCtxKeys.indexOf(propName) === -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  // tslint:disable-next-line
  private _updateExistingContext(ctx: any): void {
    if (ctx) {
      // tslint:disable-next-line
      const oldCtx = this._viewRef!.context as any;
      for (const propName of Object.keys(ctx)) {
        oldCtx[propName] = ctx[propName];
      }
    }
  }
}

export class NkTemplateOutletContext {
  // tslint:disable-next-line
  public $implicit: any;
}