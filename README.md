# tf-vue

> The tf56 vue demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev / npm run start

# json server to mock data at localhost:3000
npm run mock

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##目录结构说明

```bash
+ build 构建相关目录
  - build.js 生产环境构建时的入口文件
  - check-versions.js node环境检测
  - utils.js 工具类，提供css-loader及notifier函数
  - vue-loader.conf.js vue-loader配置
  - webpack.base.conf.js webpack基础配置
  - webpack.dev.conf.js webpack开发环境配置
  - webpack.prod.conf.js webpack生产环境配置
+ config 开发/构建配置
  - index.js 开发/构建配置
+ dist 构建目录
  ...
+ mock 数据模拟
  + data 数据目录，整合json静态数据以及js动态数据
    - array.json 静态json数组，会导出以文件名为key，数组为value的对象
    - dynamic.js 动态数据模拟
    - static.json 静态json数据
  - data.js 读取data目录下的数据并整合
  - router.json 路由转发规则配置
  - server.js json server 启动入口
+ src 源码目录
  + assets 静态资源目录
    - css 样式目录
    - custom-theme tf-components主题定制目录，定制方法参看elementUI官网 http://element-cn.eleme.io/#/zh-CN/component/custom-theme 采用官方推荐的【变量覆盖】方式
    - images 图片目录
    - favicon.ico 网站标识
  + components 组件目录
    ...
  + routes 路由配置目录
    - index.js 路由主入口
    - ***-route.js 路由模块文件
  + multi-page （多页面扩展目录，根据实际情况扩展）
    - page1 多页目录，最终打包以目录名生成对应的page1.html
    ...
  + store VueX状态管理目录
    - modules 状态管理多模块
  + utils JavaScript工具目录
    ...
  + views 视图目录
    ...
  - App.vue 主视图
  - index.html 首页模板
  - index.js 入口文件
```

##开发建议

> 该项目使用了tf-components组件库，基于ElementUI二次封装，后期会持续扩展组件或者进行组件改造替换，未做其他特殊说明的情况下，组件的使用请参照ElementUI官方文档

##相关技术文档

> Vue（基础知识）

https://cn.vuejs.org/v2/guide/

> tf-components（封装组件库）

http://121.40.84.146/tf.html

> Element（组件库）

http://element.eleme.io/#/zh-CN/component/installation

> vue-router（路由）

https://router.vuejs.org/zh-cn/essentials/getting-started.html

> Vuex（状态管理）

https://vuex.vuejs.org/zh/

> Font Awesome（字体图标）

https://fontawesome.com/icons?d=gallery&m=free

> axios（ajax），项目中使用封装后的 Vue.prototype.$ajax

https://www.npmjs.com/package/axios

> bluebird（Promise）替代 ES6 的 Promise

http://bluebirdjs.com/docs/getting-started.html

> lodash（功能函数库）

https://lodash.com/docs/4.17.10

> jsonServer & Mock.js（数据接口模拟）

https://www.npmjs.com/package/json-server

http://mockjs.com/examples.html

https://www.jianshu.com/p/ebb823bfbcb2

##开发环境配置

> 安装 Node.js

https://nodejs.org/en/

> 安装 git

https://git-scm.com/

> 配置文件修改 config/index.js

```javascript
module.exports = {
  dev: {
    // ...
    // 代理设置
    proxyTable: {
      "/api/*": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    },

    // 开发环境配置
    port: 8888 // 根据实际情况修改
    // ...
  }
};
```
