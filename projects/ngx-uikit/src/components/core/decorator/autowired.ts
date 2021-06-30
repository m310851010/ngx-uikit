import {NkAny} from 'ngx-uikit/core';

/**
 * 属性注入，来代替constructor注入
 * @param token token值
 * @param optional 是否可选, 默认 false, true 获取不到返回null; false 获取不到抛出异常
 * @param injector 注入器名称, 默认injector
 * @example
 <code>@Component({
  ...
})
 export class DemoComponent{
  \@Autowired(TestService) test: TestService;
  constructor(private injector: Injector) {
  }
   ngOnInit(): void {
    console.log(this.test); // 获取注入后的TestService
  }
  }
 </code>
 */
// tslint:disable-next-line:typedef
function Autowired(token: NkAny, optional: boolean = false, injector: string = 'injector') {
    return (target: NkAny, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            // tslint:disable-next-line
            get: once(function() {
                if (optional) {
                    try {
                        // @ts-ignore
                        // tslint:disable-next-line:no-invalid-this
                        return this[injector].get(token);
                    } catch (e) {
                        // ignore error
                    }
                    return null;
                }
                // @ts-ignore
                // tslint:disable-next-line:no-invalid-this
                return this[injector].get(token);
            }),
            enumerable: true,
            configurable: true
        });
    };
}

/**
 * 一次性函数, 缓存第一次执行结果
 * @param fn 要包装的函数
 */
// tslint:disable-next-line:typedef
function once(fn: null | (() => NkAny)) {
    let result: NkAny = null;
    // tslint:disable-next-line:only-arrow-functions
    return function(): NkAny {
        if (fn) {
            // @ts-ignore
            // tslint:disable-next-line:no-invalid-this
            result = fn.apply(this, arguments);
            fn = null;
        }
        return result;
    };
}

export {Autowired};
