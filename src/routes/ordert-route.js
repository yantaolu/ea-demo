export default {
  path: '/order',
  title: '订单管理', // 一级菜单标题、标签页标题
  menu: true, // 是否在导航菜单中存在入口，默认为true
  order: 0, // 一级菜单序号，越小越靠前
  icon: 'list-alt', // 一级菜单图标
  children: [{
    path: '/records',
    title: '订单查询',
    multi: true, // 支持标签页多开
    component: () => import('../views/order/records')
  }, {
    path: '/status',
    title: '状态管理',
    component: () => import('../views/order/status')
  }, {
    path: '/logistics',
    // menu: false,
    title: '车辆跟踪',
    component: () => import('../views/order/logistics')
  }]
}
