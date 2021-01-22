# ngx-uikit

`ngx-uikit` 基于[UIkit](https://getuikit.com/)  | [UIkit中文网](http://getuikit.work/) 的 Angular UI 组件库，主要用于研发企业级中后台产品。全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd?ref=badge_shield)

## 支持环境

`ngx-uikit` 与 `@angular/core` 保持相同的主版本号，目前支持 Angular ^6.0.0 版本。

- Angular `^6.0.0`
- 现代浏览器，以及 Internet Explorer 11+


## 安装

使用 `@angular/cli` 工具链安装，不包含`$`。

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add ngx-uikit
```

使用`npm`安装

```bash
$ npm i ngx-uikit --save
```

## 使用

在每一个需要使用组件的 module 中引入 `NgxUIkitModule`。

```ts
import { NgxUIkitModule } from 'ngx-uikit';

@NgModule({
  imports: [ NgxUIkitModule ]
})
export class AppModule {
}
```

然后在 `angular.json` 文件中引入样式和 SVG icon 资源。

```diff
{
  "assets": [
+   {
+     "glob": "**/*",
+     "input": "./node_modules/ngx-uikit/src/icons/",
+     "output": "/assets/"
+   }
  ],
  "styles": [
+   "node_modules/ngx-uikit/src/uikit.min.css"
  ]
}
```

## 授权协议

[MIT](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)
