<template>
  <tabs-view>
    <tab-home slot="home"></tab-home>
  </tabs-view>
</template>

<script>
import TabHome from './home'
import {mapGetters, mapActions} from 'vuex'
// 路由中已经对标签页路由进行过处理，获取相关数据
import {components, tabs} from '../routes/index'
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
      this.updateTabActive({name, path: 'tab-' + (path.substring(1).replace(/\//g, '-') || 'home')}, query, params.refresh, params.newTab)
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
    updateTabActive ({name = 'index', path = 'tab-home'}, query = {}, refresh = true, newTab) {
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
        let component = path
        if (!components[component]) {
          component = path.replace(/-[\d]+$/, '')
        }
        console.log(component, path)
        // 存在动态组件时，标签页加载动态组件
        if (components[component]) {
          this.tabs.push({
            component: component,
            name: path,
            icon: tabs[component].icon,
            label: tabs[component].title,
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
    setTitle (tab, title) {
      console.log(tab, title)
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
