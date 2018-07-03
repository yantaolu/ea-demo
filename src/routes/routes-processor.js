// 标签路由路由解析扩展
export default function (rootRoutes, tabRoutes) {
  // 存储解析后的各种属性
  let {components, menus, tabs, menuTree} = {
    // 存储标签页将要加载的异步组件
    components: {
      'tab-home': {
        component: () => import('../views/home'), // 组件名对应异步组件
        icon: 'home',
        title: '首页'
      }
    },
    // 存储导航菜单
    menus: [],
    // 存储标签页要使用到的图标以及标题等属性
    tabs: {
      'tab-home': {
        icon: 'home',
        title: '首页'
      }
    },
    menuTree: {
      label: '全部菜单',
      path: '/*',
      children: []
    }
  }

  // 标签页首页所在的路由位置，后续的标签页路由都将增加在首页之前，因为路由匹配规则从前到后匹配
  const homeIndex = rootRoutes.findIndex(route => route.path === '/:tabCode?')

  // 组装路由路径，将父子路由路径进行统一处理，去除空路径，将有效路径转换为数组，便于菜单以及标签页属性的生成
  const getValidPaths = (...paths) => {
    let valid = []
    paths.forEach(path => {
      if (!path) {
        return true
      }
      // eslint-disable-next-line
      valid.push(...path.replace(/^[\s\/]+/, '').replace(/[\s\/]+$/, '').split('/'))
    })
    return valid
  }

  /**
   * 路由解析（递归）
   * @param routes [Array] 路由
   * @param parent {Object} 父路由
   */
  const routesParser = (routes, parent) => {
    routes && routes.length && routes.forEach(route => {
      // 获取标准路径
      let pathArr = parent ? getValidPaths(parent.routePath, route.path) : getValidPaths(route.path)
      // 设置routePath属性用于递归计算
      route.routePath = `/${pathArr.join('/')}`

      // 生成对应菜单项以及完整菜单树
      let treeNode = {
        label: route.title,
        path: `/${pathArr.join('/')}`
      }
      let menuItem = {
        title: route.title,
        code: `${pathArr.join('/')}`
      }
      // 路由无对应的标签页且有子路由，则菜单需要创建子菜单
      if (!route.component && route.children) {
        menuItem.children = []
      }
      // 无父路由则为一级导航
      if (!parent) {
        menuItem.icon = route.icon
        menuItem.order = route.order !== undefined ? route.order : 99999
        // 路由配置在菜单显示
        if (route.menu !== false) {
          menus.push(menuItem)
          // 设置menu引用，用于递归计算
          route.menu = menuItem
        }
        menuTree.children.push(treeNode)
      } else if (route.menu !== false) {
        route.multi && (menuItem.multi = true)
        parent.menu && parent.menu.children && parent.menu.children.push(menuItem)
        route.menu = menuItem
      }

      route.treeNode = treeNode
      route.children && route.children.length && (treeNode.children = [])
      parent && parent.treeNode.children.push(treeNode)

      // 组件及属性
      if (route.component) {
        components[`tab-${pathArr.join('-')}`] = {
          component: route.component,
          title: route.title,
          icon: route.icon
        }
        tabs[`tab-${pathArr.join('-')}`] = {
          title: route.title,
          icon: route.icon
        }
      }

      // 当不存在子路由时需要路由扩展
      if (!route.children || !route.children.length) {
        // 路由名称，因为路由path和params不能同时使用，所以这里需要生成唯一路由名称
        let routeName = [...pathArr.slice(0, -1)].join('-')
        let routePath = `/${[...pathArr.slice(0, -1), ':tabCode?'].join('/')}`
        let index = rootRoutes.findIndex(route => route.path === routePath)
        index === -1 && rootRoutes.splice(homeIndex, 0, {
          path: routePath,
          name: routeName,
          component: () => import('../views/index')
        })
      }

      // 递归
      routesParser(route.children, route)
    })
  }

  routesParser(tabRoutes)

  // 导航菜单按照order排序（仅一级菜单，子菜单需按照顺序自行配置）
  menus.sort((a, b) => a.order - b.order)
  return {components, tabs, menus, menuTree}
}
