// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import rootRoutes from './routes/index'
import Router from 'vue-router'
import store from './store/index'
import ElementUI from 'element-ui'
import TfComponents from './components/tf-components'
import ajax from './utils/ajax'

Vue.use(Router)
Vue.use(ElementUI, {size: 'small'})
Vue.use(TfComponents)
Vue.use(ajax)

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
