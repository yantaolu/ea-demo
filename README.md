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
    - custom-theme elementUI主题定制目录，定制方法参看elementUI官网 http://element-cn.eleme.io/#/zh-CN/component/custom-theme 采用官方推荐的【变量覆盖】方式
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

>该项目使用了tf-components组件库，基于ElementUI二次封装，后期会持续扩展组件或者进行组件改造替换，未做其他特殊说明的情况下，组件的使用请参照ElementUI官方文档

 * tf-button 使用指南（属性扩展）

 tf-button Attributes
 ----

参数 | 说明 | 类型 | 可选值 | 默认值
:---|:---|:---:|:---:|:---:|
authority-code|标签页内按钮权限控制编码|String|-|-

* tf-table 使用指南（组件封装），删除 tf-table-column 组件，请使用 columns 属性代替

tf-table Attributes
----

参数 | 说明 | 类型 | 可选值 | 默认值
:---|:---|:---:|:---:|:---:|
data|显示的数据或者获取数据的方法|Array/Function({page = 1, size = 20, setData, setTotal})|-
columns|数据表列数据|Array|[{TableColumn}]|[]
autoLoad|当data设置为Function时，是否自动加载数据|Boolean|true/false|true
flex|是否使用flex布局，需要表格自适应的场景，父元素也需要使用flex布局|Boolean|true/false|false
pagination|是否分页|Boolean|true/false|true
pageSizes|单页可显示行数|Array|-|[10, 20, 50, 100, 200]
pageSize|默认显示行数|Number|pageSizes中任意元素|20
showLoading|是否显示加载动画|Boolean|true/false|true
loading|加载中，在data是Function时，可在父组件内设置加载|Boolean|true/false|false

tf-table Methods
----

方法名|说明|参数或类型
:---|:---|:---
setData|设置列表显示的数据|Array
setTotal|设置分页列表数据总数|Number
refresh|加载/刷新当前页列表数据|-
reload|重新加载数据，从第一页开始|-
goTo|加载第n页数据|Number
showColumn|显示列|String: columnProp
hideColumn|隐藏列|String: columnProp

tf-table Slot
----

name|说明
:---|:---
-|插入到table-header之上，可用作tool-bar，例如列表的增删改查按钮操作，参数为{selection, currentRow, oldCurrentRow}

TableColumn（:columns属性的元素，支持el-table-column的所有Attributes转驼峰属性）
----

属性|说明|类型|可选值|默认值
:---|:---|:---:|:---:|:---:|
hidden|列默认是否隐藏|Boolean|true/false|false
renderCell|自定义表格内容|Function(h, {row, column, $index})|-|-

##相关技术文档

> Vue（基础知识）

https://cn.vuejs.org/v2/guide/

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
