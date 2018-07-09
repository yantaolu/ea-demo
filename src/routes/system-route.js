export default {
  path: '/system',
  title: '系统管理',
  order: 999,
  icon: 'fa-cogs',
  children: [{
    path: '/roles',
    title: '角色管理',
    component: () => import('../views/system/roles'),
    buttons: {
      'add-role': '新增角色',
      'edit-role': '编辑角色',
      'delete-role': '删除角色'
    }
  }, {
    path: '/menus',
    title: '菜单管理',
    component: () => import('../views/system/menus')
  }]
}
