# Staterkit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


快速删除 node_modules
node_modules 文件夹中包含了大量 node 需要的依赖包，如果直接删除的话，非常耗时。

我们可以通过以下方式快速删除node_modules:

安装 rimraf

rimraf包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可以删除。

执行 npm i rimraf -g 命令来全局安装 rimraf

进入需要清理的项目中，执行 rimraf node_modules 命令即可将node_modules文件删除干净

最后通过 npm install（简写：npm i）或者 yarn 来重新下载所有相关依赖包，之后会自动生成node_modules文件夹


<!--/*
UserName:
situtest-1@skysh163.onmicrosoft.com
password: k1*itu@1234!6
*/-->
