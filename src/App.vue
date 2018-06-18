<template>
  <div id="app">
    <el-container class="page-container">
      <!--页面头部-->
      <el-header height="50px">
        <!---->
        <tf-header @logout="handleLogout" @toggleSlider="toggleSlider">
          <!--logo定制-->
          <slot slot="logo">
          <span class="slot-logo" :style="{width: sliderWidth + 'px'}">
            <template v-if="!collapse">TF-Vue</template>
          </span>
          </slot>
        </tf-header>
      </el-header>
      <!--下部主体部分-->
      <el-container>
        <!--侧边栏，可缩放-->
        <el-aside :width="sliderWidth + 'px'" class="page-aside">
          <div class="nav-menu-container">
            <!--导航菜单，已经实现递归可以支持无限层-->
            <nav-menu :menuItems="menuItems" :openedIndexes="openedIndexes" :menu="menu" :collapse="collapse"
                      @handleMenuSelect="handleMenuSelect"></nav-menu>
          </div>
        </el-aside>
        <!--右侧页面容器-->
        <el-main class="page-content">
          <!--如果是单页面模式，则使用面包屑，默认直接加载home页-->
          <el-breadcrumb v-if="mode === 'single'" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <!--否则加载标签页模式-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {pageMode, menus} from './routes/index'

export default {
  name: 'App',
  data () {
    return {
      mode: pageMode,
      menuItems: menus,
      openedIndexes: ['1'],
      menu: 'tab-home',
      tabsValue: 'tab-home',
      sliderWidth: 200,
      collapse: false
    }
  },
  watch: {
    /**
     * 路由更新时，需要更新标签页
     * @param route
     */
    $route (route) {
      this.updateMenuActive(route.path.substring(1))
    }
  },
  methods: {
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
    // 点击菜单时，获取到菜单的code，按照相应的规则进行转换得到路由名称
    handleMenuSelect (index) {
      let paths = decodeURIComponent(index).split('/').filter(path => path !== '')
      let tabCode = paths.pop() || ''
      this.pushRouterState({name: paths.length ? paths.join('-') : 'index', tabCode: tabCode || ''})
    },
    // 更新菜单的active状态
    updateMenuActive (code = 'tab-home') {
      this.menu = code
      if (!code || code === 'tab-home') {
        this.$set(this, 'openedIndexes', ['1'])
      } else {
        menus.forEach((item, i) => {
          item.children && item.children.forEach(c => {
            if (c.code === code) {
              this.$set(this, 'openedIndexes', ['' + (i + 1)])
            }
          })
        })
      }
    },
    // 收缩导航菜单栏
    toggleSlider (collapse) {
      this.collapse = collapse
      this.sliderWidth = collapse ? 63 : 200
    },
    // 登出系统
    handleLogout () {
      this.$confirm('是否要登出系统？', '确认', {
        type: 'warning',
        confirmButtonText: '确定',
        showCancelButton: true
      }).then(() => {
        this.$router.push('/login')
      }).catch(e => {

      })
    }
  },
  mounted () {
    this.updateMenuActive(this.$route.path.substring(1))
  }
}
</script>

<style lang="scss">
@import "assets/css/global";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.page-container {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  flex: auto;
  display: flex;

  .slot-logo {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    line-height: 50px;
    transition: all 0.3s;
    background: url("./assets/images/logo.svg") no-repeat left 8px top 5px;
    background-size: auto 50px;
    text-align: left;
    text-indent: 65px;
    font-size: 24px;
    font-weight: bold;
  }

  .page-aside {
    background: #495060;
    position: relative;
    transition: all 0.3s;
  }
}

.nav-menu-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .nav-menu {
    user-select: none;
    cursor: pointer;
    border-color: #495060;

    .el-submenu {
      &.is-active .el-submenu__title * {
        vertical-align: middle;
      }
    }

    .el-menu-item:not(.is-active):hover {
      color: #ffffff !important;
    }

  }
}

.page-content {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
