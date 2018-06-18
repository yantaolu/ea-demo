import routesProcessor from './routes-processor'

const pageMode = 'tabs'

// 使用require.context读取当前目录下以route.js命名的路由模块
const tabRoutes = (req => {
  let routes = req
    .keys()
    .map(key => req(key).default)
  return routes
})(require.context('./', true, /\-route\.js$/))

// 原始路由配置，可以使用相应的方法将tabRoutes扩展进去
const rootRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }, {
    path: '/:tabCode?',
    name: 'index',
    component: () => import('../views/index')
  }, {
    path: '*',
    redirect: '/'
  }
]

// 处理标签页路由
const {components, tabs, menus, menuTree} = routesProcessor(rootRoutes, tabRoutes)
export {pageMode, components, tabs, menus, menuTree}
export default rootRoutes
