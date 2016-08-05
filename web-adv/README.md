# 广告业务端

## 如何开始
1. 安装[Node.js]
2. 安装[cnpm]，用cnpm是因为速度快一点
3. 在项目根目录下执行`cnpm install`，等待依赖安装完成
4. 在项目根目录下执行`npm start`，这个命令会启动，然后访问`http://localhost:8080`
5. 如果需要启动mock服务的话，可以执行`npm run mock`，mock服务在`3000`端口
6. 同时启动server及mock服务，可以执行`npm run dev-mock`

## 项目结构

    |-dist 生产目录，上线会将脚本打包放到这里面
    |-mock 后端服务的简单mock，降低前后端联调成本
    |  |-data mock数据，里面的每个js对应一个后端服务，GET, PUT, POST, DELETE 对应 查询, 修改, 添加, 删除 接口
    |  |-index.js mock服务启动脚本
    |-node_modules 依赖的模块都会放到这里，可以不用管这个模块
    |-src 代码目录
    |  |-components vue组件目录，请将所以组件都放在这里面，尽量做到共用
    |  |-pages vue页面入口，每一个页面对应一个vue文件
    |  |-filters vue filters目录，请将所有filter放在这里面
    |  |-img 这个目录存放引用的图片，后面可以写一个自动化脚本自动上传到CDN上
    |  |-store 数据处理接口
    |  |-main.js 入口初始化vue
    |  |-config.js 配置文件，现在自由server信息的配置，后期可以将公用的配置放在这里
    |  |-router.js 路由配置
    |-index.html 站点入口
    |-webpark.config.js 打包逻辑
    |-package.json 模块配置

注: [vue filters]

## 如何开发
开发方式为组件驱动

1. 第一步先在`pages`目录中新建一个页面，例如`Test.vue`
1. 然后在`router.js`中添加相应地路由规则，引用`Test.vue`
1. 如果这个模块可能需要用到后端服务的话，可以在`mock/data/`中添加一个对应的数据mock，例如`test.js`
1. 在`config.js`的`resources`添加一个对应的资源路径
1. 这样在其他地方就可以使用`store.getResource('test')`获得这个资源的处理对象，参考`Test.vue`

## 如何发布
命令行中执行`npm build`就会将资源build到dist目录中，然后把`index.html`和`dist`目录发到线上即可。

## Vue相关资源
* [Vue 教程](http://cn.vuejs.org/guide/)
* [Vue Router文档](http://vuejs.github.io/vue-router/zh-cn/index.html)
* [Vue RESTful 接口插件](https://github.com/vuejs/vue-resource)
* [Vue 表单验证插件](https://github.com/vuejs/vue-validator)
* [Vue 资源列表](https://github.com/vuejs/awesome-vue)

[Node.js]: https://nodejs.org/en/
[cnpm]: http://npm.taobao.org/
[vue filters]: http://cn.vuejs.org/guide/syntax.html#u8FC7_u6EE4_u5668