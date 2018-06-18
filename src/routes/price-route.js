export default {
  path: '/price',
  title: '价格管理', // 一级菜单标题、标签页标题
  menu: true, // 是否在导航菜单中存在入口，默认为true
  order: 1, // 一级菜单序号，越小越靠前
  icon: 'list-alt', // 一级菜单图标
  children: [{
    path: '/maintain',
    title: '价格维护',
    component: () => import('../views/price/maintain')
  }, {
    path: '/receipt',
    title: '回单价格设置',
    component: () => import('../views/price/receipt')
  }, {
    path: '/delivery',
    // menu: false,
    title: '代收货款价格设置',
    component: () => import('../views/price/delivery')
  }]
}
