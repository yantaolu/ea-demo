<template>
  <tabs-view>
    <tab-home slot="home"></tab-home>
  </tabs-view>
</template>

<script>
import TabHome from './home'
import {mapGetters, mapActions} from 'vuex'
// 路由中已经对标签页路由进行过处理，获取相关数据
import {components} from '../routes/index'
import {TabsView} from 'tf-components'

TabsView.registerComponents(components)

export default {
  components: Object.assign({
    TabHome,
    TabsView
  }),
  data () {
    return {
      tabsValue: 'tab-home',
      tabs: [],
      openedTabs: [],
      tabsRoutes: {},
      sliderWidth: 200,
      collapse: false
    }
  },
  computed: {...mapGetters(['random'])},
  methods: {
    ...mapActions(['setData'])
  }
}
</script>
