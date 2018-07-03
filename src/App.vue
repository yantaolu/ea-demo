<template>
  <div id="app">
    <tf-container class="page-container is-vertical">
      <!--页面头部-->
      <tf-header height="50px">
        <!---->
        <custom-header @logout="handleLogout" @toggleSlider="toggleSlider">
          <!--logo定制-->
          <slot slot="logo">
          <span class="slot-logo" :style="{width: sliderWidth + 'px'}">
            <template v-if="!collapse">TF-Vue</template>
          </span>
          </slot>
        </custom-header>
      </tf-header>
      <!--下部主体部分-->
      <tf-container>
        <!--侧边栏，可缩放-->
        <tf-aside :width="sliderWidth + 'px'" class="page-aside">
          <div class="nav-menu-container">
            <!--导航菜单，已经实现递归可以支持无限层-->
            <tf-nav-menu :menus="menus" :collapse="collapse" @handleMenuSelect="handleMenuSelect"></tf-nav-menu>
          </div>
        </tf-aside>
        <!--右侧页面容器-->
        <tf-main class="page-content">
          <!--如果是单页面模式，则使用面包屑，默认直接加载home页-->
          <tf-breadcrumb v-if="mode === 'single'" separator="/">
            <tf-breadcrumb-item :to="{ path: '/' }">首页</tf-breadcrumb-item>
            <tf-breadcrumb-item><a href="/">活动管理</a></tf-breadcrumb-item>
            <tf-breadcrumb-item>活动列表</tf-breadcrumb-item>
            <tf-breadcrumb-item>活动详情</tf-breadcrumb-item>
          </tf-breadcrumb>
          <!--否则加载标签页模式-->
          <router-view/>
          <!--<test :tab-components="tabComponents"></test>-->
        </tf-main>
      </tf-container>
    </tf-container>
  </div>
</template>

<script>
import {pageMode, menus} from './routes/index'

export default {
  name: 'App',
  data () {
    return {
      mode: pageMode,
      menus,
      sliderWidth: 200,
      collapse: false
    }
  },
  watch: {},
  methods: {
    // 点击菜单时，获取到菜单的code，按照相应的规则进行转换得到路由名称
    handleMenuSelect (index, newTab = false) {
      let paths = decodeURIComponent(index).split('/').filter(path => path !== '')
      let tabCode = paths.pop() || ''
      // this.pushRouterState({name: paths.length ? paths.join('-') : 'index', tabCode: tabCode || '', newTab})
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
  flex-direction: column;

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
