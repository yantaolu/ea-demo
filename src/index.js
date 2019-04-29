// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import rootRoutes from './routes/index'
import Router from 'vue-router'
import store from './store/index'
import ElementAdmin from 'element-admin'
import Components from './components/custom-components'
// import locale from 'element-admin/lib/locale/lang/en'
// font-awesome 字体图标库
import 'element-admin/lib/css/font-awesome.min.css'
// import 'element-admin/lib/css/element-admin.css'

Vue.use(Router)
Vue.use(ElementAdmin, {size: 'small'})
Vue.use(Components)

const router = new Router({
  mode: 'history',
  routes: rootRoutes
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
