<template>
  <div class="tf-tabs">
    <div class="tf-tabs-bars" ref="tabs-bars" :class="{'scroll': nav_scroll}">
      <div v-show="nav_scroll" class="tf-tabs-nav-prev" @click="scrollToLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <ul class="tf-tabs-bars-container" ref="tabs-bars-container" :style="navStyle">
        <li v-for="(bar, i) in bars" class="tf-tab-bar" :class="{'bar-active': bar.active}" :key="'tf-tabs-bar-' + i"
            @click.stop="handleClick(bar)" @contextmenu.prevent="contextMenu">
          <i v-if="bar.icon" class="ivu-icon" :class="'ivu-icon-' + bar.icon"></i>
          <i class="fa" :class="'fa-' + bar.icon"></i>
          <label>{{bar.label}}</label>
          <i v-if="bar.closable" class="el-icon-close" @click.stop="handleRemove(i)"></i>
        </li>
      </ul>
      <div v-show="nav_scroll" class="tf-tabs-nav-next" @click="scrollToRight">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="tf-tabs-contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import mouseWheelBind from '../../utils/mouse-wheel'
import _ from 'lodash'

export default {
  name: "tf-tabs",
  props: {
    value: String,
    router: Boolean,
    path: {
      type: String,
      default: '/index/'
    }
  },
  data() {
    return {
      bars: [],
      currentName: '',
      tabs_mounted: false,
      nav_scroll: false,
      navStyle: {
        transform: 'translateX(-0px)'
      }
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    this.currentName = this.value
    this.tabs_mounted = true
    this.$el.addEventListener('resize', function () {
      console.log('-----')
    })
    this.$refs['tabs-bars'] && mouseWheelBind(this.$refs['tabs-bars'], _.throttle(this.onBarScroll, 100))
  },
  watch: {
    value(val) {
      this.currentName = val
      this.updateActive(val)
    },
    $route(val) {
      // console.log(val.path.substring(this.path.length))
      // this.router && this.updateActive(val.path.substring(this.path.length))
    }
  },
  methods: {
    getTabs() {
      return this.$children.filter(item => item.$options.name === 'tf-tab-pane')
    },
    getBars() {
      return this.getTabs().map(pane => {
        return {
          label: pane.label,
          name: pane.name,
          icon: pane.icon,
          closable: pane.closable,
          active: pane.name === (this.currentName || this.value)
        }
      })
    },
    updateNav() {
      this.bars = []
      this.bars.push(...this.getBars())
      this.updateTabBar()
    },
    updateTabBar() {
      this.$nextTick(() => {
        if (!this.$refs['tabs-bars']) return // 页面销毁时
        const navWidth = this.$refs['tabs-bars'].offsetWidth
        const navScrollWidth = this.$refs['tabs-bars-container'].offsetWidth
        this.nav_scroll = navWidth < navScrollWidth
        // 动画完成后再计算
        setTimeout(this.scrollToActiveTab, 20)
      })
    },
    getCurrentScrollOffset() {
      const {navStyle} = this;
      return navStyle.transform
        ? parseInt(Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]))
        : 0;
    },
    setOffset(value) {
      !isNaN(value) && (this.navStyle.transform = `translateX(-${parseInt(value)}px)`)
    },
    scrollToActiveTab() {
      if (!this.nav_scroll) {
        this.setOffset(0)
        return
      }

      const nav = this.$refs['tabs-bars']
      const navScroll = this.$refs['tabs-bars-container']
      const activeTab = navScroll.querySelector('li.bar-active')
      if (!activeTab) return;

      const activeTabBounding = activeTab.getBoundingClientRect()
      const navScrollBounding = navScroll.getBoundingClientRect()
      const navBounding = nav.getBoundingClientRect()
      let newOffset
      // 最大可以接受的translateX
      let max = navScroll.offsetWidth - (nav.offsetWidth - 60) + 5
      // 如果活跃的标签位于右侧
      if (activeTabBounding.right > navBounding.right - 35) {
        newOffset = (activeTabBounding.right - navScrollBounding.left - (nav.offsetWidth - 60) + 5)
      } else if (activeTabBounding.left < navBounding.left) {
        newOffset = (activeTabBounding.left - navScrollBounding.left)
      } else if (navScrollBounding.right < navBounding.right - 30) {
        newOffset = max
      }
      newOffset !== undefined && this.setOffset(Math.min(newOffset, max))
    },
    onBarScroll(e) {
      if (!this.nav_scroll) return
      let diff = 0
      if (e.deltaX === 0) {
        diff = e.deltaY
      } else {
        diff = e.deltaX
      }
      if (diff < 0) {
        this.scrollToLeft(e, 50)
      } else {
        this.scrollToRight(e, 50)
      }
    },
    scrollToLeft(e, diff = 0) {
      let scroll = this.getCurrentScrollOffset()
      const nav = this.$refs['tabs-bars']
      if (diff) {
        this.setOffset(Math.max(scroll - diff, 0))
      } else {
        this.setOffset(Math.max(scroll - (nav.offsetWidth / 2), 0))
      }
    },
    scrollToRight(e, diff = 0) {
      const nav = this.$refs['tabs-bars']
      const navScroll = this.$refs['tabs-bars-container']
      let max = navScroll.offsetWidth - (nav.offsetWidth - 60) + 5
      let scroll = this.getCurrentScrollOffset()
      if (diff) {
        this.setOffset(Math.min(scroll + diff, max))
      } else {
        this.setOffset(Math.min(scroll + (nav.offsetWidth - 60) / 2, max))
      }
    },
    updateActive(name) {
      if (!this.tabs_mounted) {
        return
      }
      this.bars.forEach(item => {
        this.$set(item, 'active', item.name === name)
      })
      this.currentName = name
    },
    handleClick(bar) {
      this.updateActive(bar.name)
      this.$emit('on-tab-click', bar.name)
    },
    handleRemove(index) {
      let tabs = this.getTabs()
      let tab = tabs[index]
      tab.$destroy()
      if (tab.name === this.currentName) {
        let bar = this.bars[index - 1]
        this.$set(bar, 'active', true)
        this.currentName = bar.name
      }
      this.$emit('on-tab-remove', tab.name, this.currentName)
      this.updateNav()
    },
    contextMenu() {

    }
  }
}
</script>

<style lang="scss">

.tf-tabs {
  flex: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  .tf-tabs-bars {
    user-select: none;
    border-bottom: 1px solid #dddee1;
    overflow: hidden;
    position: relative;

    &.scroll {
      padding: 0 30px;
    }

    .tf-tabs-nav-prev, .tf-tabs-nav-next {
      position: absolute;
      width: 30px;
      line-height: 32px;
      background-color: #ffffff;
      text-align: center;
      cursor: pointer;
      z-index: 50;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        color: #2d8cf0;
      }
    }

    .tf-tabs-nav-prev {
      left: 0;
    }

    .tf-tabs-nav-next {
      right: 0;
    }

    .tf-tabs-bars-container {
      list-style: none;
      overflow: hidden;
      white-space: nowrap;
      float: left;
      clear: both;
      transition: all 0.5s ease-in-out;
      margin: 0;
      padding: 0;
    }
  }

  .tf-tabs-contents {
    flex: auto;
    position: relative;
    border: 1px solid #dddee1;
    border-top: none;
    border-radius: 0 0 5px 5px;
    box-sizing: border-box;
  }
}

.tf-tab-bar {
  display: inline-block;
  width: auto;
  margin: 0 4px 0 0;
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  border: 1px solid #dddee1;
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease-in-out;
  background: #f8f8f9;
  cursor: pointer;
  position: relative;
  font-size: 12px;

  label {
    cursor: pointer;
  }

  .el-icon-close {
    width: 14px;
    height: 14px;
  }

  .el-icon-close {
    width: 0;
    height: 22px;
    line-height: 22px;
    margin-right: 0;
    color: #999;
    text-align: right;
    vertical-align: middle;
    overflow: hidden;
    position: relative;
    top: -1px;
    transition: all 0.2s ease-in-out;
    font-size: 14px;
  }

  &.bar-active {
    height: 32px;
    background: #fff;
    transform: translateZ(0);
    border-color: #dddee1;
    color: #2d8cf0;

    .el-icon-close {
      width: 14px;
    }
  }

  &:hover {
    color: #2d8cf0;
    .el-icon-close {
      width: 14px;
    }
  }

  .tab-bar-context-menu {
    position: absolute;
    display: none;
  }
}
</style>
