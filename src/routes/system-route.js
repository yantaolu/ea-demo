export default {
  path: '/system',
  title: '系统管理',
  order: 1,
  icon: 'cogs',
  children: [{
    path: '/roles',
    title: '角色管理',
    component: () => import('../views/system/roles')
  }, {
    path: '/menus',
    title: '菜单管理',
    component: () => import('../views/system/menus')
  }, {
    path: '/ssss/dddd',
    title: '组织管理',
    children: [
      {
        path: '/menus',
        title: '菜单管理',
        multi: true,
        component: () => import('../views/system/menus')
      }
    ]
  }]
}
