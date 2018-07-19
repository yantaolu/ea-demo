export default {
  path: '/examples',
  title: 'Examples',
  order: 999,
  icon: 'fa-dribbble',
  children: [{
    path: '/records',
    title: '订单查询',
    icon: 'tickets',
    multi: true, // 支持标签页多开
    component: () => import('../views/order/records')
  }, {
    path: '/status',
    title: '状态管理',
    component: () => import('../views/order/status')
  }, {
    path: '/roles',
    title: '角色管理',
    component: () => import('../views/system/roles'),
    buttons: {
      'add-role': '新增角色',
      'edit-role': '编辑角色',
      'delete-role': '删除角色'
    }
  }]
}
