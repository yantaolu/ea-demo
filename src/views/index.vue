<template>
  <!--标签页组件-->
  <custom-tabs class="tf-tabs-page" :value="tabsValue" @on-tab-click="handleTabClick" @on-tab-remove="handleTabRemove" @on-tab-refresh="handleTabRefresh">
    <!--默认标签页首页-->
    <custom-tab-pane name="tab-home" icon="home" label="首页">
      <tab-home @openTab="handleOpenTab"></tab-home>
    </custom-tab-pane>

    <custom-tab-pane v-for="(tab, index) in tabs" :key="'tab-' + index" :name="tab.name" :icon="tab.icon" :label="tab.label"
                 :closable="tab.closable">
      <!--Vue动态组件，详细说明请看官方文档-->
      <component :is="tab.name" :query="tab.query" @openTab="handleOpenTab"></component>
    </custom-tab-pane>
  </custom-tabs>
</template>

<script>
import tabHome from './home'
import {mapGetters, mapActions} from 'vuex'
// 路由中已经对标签页路由进行过处理，获取相关数据
import {components, tabs} from '../routes/index'

export default {
  components: Object.assign({
    tabHome
  }, components),
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
  watch: {
    /**
     * 路由更新时，需要更新标签页
     * @param route
     */
    $route (route) {
      this.handleRouteChange(route)
    }
  },
  mounted () {
    this.handleRouteChange(this.$route)
  },
  methods: {
    // 响应路由变化，触发标签页
    handleRouteChange ({name, path, params, query}) {
      this.updateTabActive({name, path: 'tab-' + path.substring(1).replace(/\//g, '-')}, query, params.refresh)
    },
    // 更新路由状态，由于路由处理中使用了params参数，所以只能通过name去更新路由，否则拿不到params中的tabCode
    pushRouterState ({name = 'index', tabCode, refresh = true, query = {}}) {
      this.$router.push({
        name,
        query,
        params: {
          tabCode,
          refresh
        }
      })
    },
    // 从缓存中找到相关的标签页数据
    findTab (tabCode) {
      let tab = {}
      this.tabs.forEach(item => {
        if (tabCode === item.name) {
          tab = item
        }
      })
      return tab
    },
    // 更新标签页状态，涉及新开以及切换显示
    updateTabActive ({name = 'index', path = 'tab-home'}, query = {}, refresh = true) {
      let openedIndex = this.openedTabs.findIndex(code => code === path)
      // 当标签页为首页或者已经打开时，切换显示即可，当参数发生改变时会触发更新操作
      if (openedIndex >= 0 || path === 'tab-home') {
        if (openedIndex >= 0) {
          let tab = this.findTab(path)
          let diff = false
          // 查询条件不同时，也需要刷新标签页
          if (Object.keys(tab.query || {}).length !== Object.keys(query).length) {
            diff = true
          } else {
            Object.keys(tab.query || {}).forEach(key => {
              if (String(tab.query[key]) !== String(query[key])) {
                diff = true
                return false
              }
            })
          }
          // 刷新标签页
          if (diff || refresh) {
            this.$set(tab, 'query', query)
            this.$set(tab, 'name', 'div')
            // 刷新操作使用替换动态组件的方式，让标签页重新加载一次动态组件
            setTimeout(() => {
              this.$set(tab, 'name', path)
            }, 100)
          }
        }
      } else {
        // 存在动态组件时，标签页加载动态组件
        if (components[path]) {
          this.tabs.push({
            name: path,
            icon: tabs[path].icon,
            label: tabs[path].title,
            closable: true,
            query
          })
          this.openedTabs.push(path)
          this.tabsRoutes[path] = name
        } else {
          path = 'tab-home'
        }
      }
      this.tabsValue = path
    },
    // 标签页点击时触发
    handleTabClick (tabCode) {
      if (tabCode === 'tab-home') {
        this.pushRouterState({name: 'index', refresh: false})
        return
      }
      let name = this.tabsRoutes[tabCode]
      this.pushRouterState({name, tabCode: tabCode.substring(name.length + 5), refresh: false, query: this.findTab(tabCode).query})
    },
    // 标签页删除时触发
    handleTabRemove (tabCode, currentName) {
      let index = this.openedTabs.findIndex(code => code === tabCode)
      this.openedTabs.splice(index, 1)
      this.tabsValue = currentName
      this.menu = currentName
      this.handleTabClick(currentName)
    },
    // 标签页调用openTab时触发
    handleOpenTab (path, query) {
      this.$router.push({
        path,
        query
      })
    },
    // 标签页刷新时触发
    handleTabRefresh () {

    },
    // 收缩导航菜单栏
    toggleSlider (collapse) {
      this.collapse = collapse
      this.sliderWidth = collapse ? 63 : 200
    },
    ...mapActions(['setData'])
  }
}
</script>

<style lang="scss">
.tf-tabs-page {
  flex: auto;
  display: flex;
  flex-direction: column;

  .ivu-tabs-bar {
    user-select: none;
  }
  .ivu-tabs-content {
    flex: auto;

    .ivu-tabs-tabpane {
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
      position: absolute;
    }
  }
}
</style>
