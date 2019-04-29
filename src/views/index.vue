<template>
  <ea-container class="page-container is-vertical">
    <!--页面头部-->
    <ea-header height="50px">
      <!---->
      <custom-header @logout="handleLogout" @toggleSlider="toggleSlider">
        <!--logo定制-->
        <slot slot="logo">
          <span class="slot-logo" :style="{width: sliderWidth + 'px'}">
            <template v-if="!collapse">EA-demo</template>
          </span>
        </slot>
      </custom-header>
    </ea-header>
    <!--下部主体部分-->
    <ea-container>
      <!--侧边栏，可缩放-->
      <ea-aside :width="sliderWidth + 'px'" class="page-aside">
        <div class="nav-menu-container">
          <!--导航菜单，已经实现递归可以支持无限层-->
          <ea-nav-menu :menus="menus" :collapse="collapse" @handleMenuSelect="handleMenuSelect"></ea-nav-menu>
        </div>
      </ea-aside>
      <!--右侧页面容器-->
      <ea-main class="page-content">
        <tabs-view :components="components"></tabs-view>
      </ea-main>
    </ea-container>
  </ea-container>
</template>

<script>
import TabHome from './home'
import {TabsView} from 'element-admin'
import {components, menus} from '../routes'

components['tab-home'] = {
  component: TabHome,
  title: '首页',
  icon: 'fa-home'
}

export default {
  components: {
    TabsView
  },
  data () {
    return {
      menus: menus,
      sliderWidth: 200,
      collapse: false,
      components
    }
  },
  methods: {
    // 点击菜单时，获取到菜单的code，按照相应的规则进行转换得到路由名称
    handleMenuSelect (index, newTab = false) {
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
        sessionStorage.clear()
        this.$router.push('/login')
      }).catch(e => {

      })
    }
  }
}
</script>
<style lang="scss">
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
    background: url("../assets/images/logo.svg") no-repeat left 8px top 5px;
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
