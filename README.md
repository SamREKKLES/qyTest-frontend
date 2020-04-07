# medical-web

> A Vue.js project

## 技术栈
Vue + Vue-router + webpack + sass + eslint
Http库：[axios](https://github.com/mzabriskie/axios)
UI组件库：[iView](https://www.iviewui.com/)
图表库：[echarts](http://echarts.baidu.com/index.html)

## 项目结构说明
-- index.html
-- src
    -- assets
        -- imgs         // 图片
    -- components       // vue 普通组件
    -- page             // vue 页面组件
    -- router           // vue 路由配置
    App.vue             // 入口组件
    main.js             // vue配置
-- build                // webpack配置等
-- config
-- node_modules         // 模块目录
-- static               
-- .eslint*             // eslint语法校验配置
-- package.json         // npm 配置

## Build Setup

首先，需要安装nodejs及npm，并且建议安装cnpm（使用淘宝镜像，下载较快）。   
clone项目到本地后，使用`cnpm install`先安装以来，然后才可以使用`npm run dev`命令运行项目。

``` bash
# install dependencies
npm install
建议安装cnpm, 使用cnpm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
