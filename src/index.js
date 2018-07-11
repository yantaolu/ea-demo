// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import rootRoutes from './routes/index'
import Router from 'vue-router'
import store from './store/index'
import TfComponents from 'tf-components'
import Components from './components/custom-components'
// import locale from 'tf-components/lib/locale/lang/en'
// font-awesome 字体图标库
import 'tf-components/lib/css/font-awesome.min.css'
// import 'tf-components/lib/css/tf-components.css'

Vue.use(Router)
Vue.use(TfComponents, {size: 'small'})
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
