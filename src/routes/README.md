# 模块路由配置说明

> 由于系统采用标签页封装，故而在Vue传统路由的配置基础上增加了导航菜单的配置，
>>icon：需要在路由中配置导航菜单（一级菜单）的图标，当在子菜单中设置icon则为标签页图标 
>>
>>title：需要在路由中配置菜单及标签页名称（公用的）
>>
>>menu：该标签页是否需要菜单入口，默认是true，不需要时设置为false
>>
>>order：一级菜单顺序，数值越小越靠前
>>
>>buttons：预留按钮权限控制，数组，元素key为按钮组件<tf-button :authorityCode='create'>创建订单</tfbutton> authorityCode 属性，值为按钮名称
>>
>>其他属性均为Vue路由默认属性，注意路由path中不支持使用路径参数params，因为在路由入口中对模块路由进行了处理，所以在使用参数时需使用query方式
>>

```javascript
export default {
  path: '/order-management',
  title: '订单管理', // 一级菜单标题、标签页标题
  menu: true, // 是否在导航菜单中存在入口，默认为true
  order: 0, // 一级菜单序号，越小越靠前
  icon: 'list-alt', // 一级菜单图标
  children: [{
    path: '/order-records',
    title: '订单查询',
    component: () => import('../views/order-management/order-records'),
    buttons: [{'create': '创建订单'}]
  }, {
    path: '/status-management',
    title: '状态管理',
    component: () => import('../views/order-management/status-management')
  }, {
    path: '/logistics-tracking',
    menu: false,
    title: '车辆跟踪',
    component: () => import('../views/order-management/logistics-tracking')
  }]
}
```