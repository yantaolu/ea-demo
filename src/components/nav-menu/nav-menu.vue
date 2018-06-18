<template>
  <el-menu class="nav-menu" background-color="#495060" text-color="#bcbcbc" active-text-color="#409EFF" :default-openeds="openedIndexes"
           :default-active="menu" :collapse="collapse" @select="handleMenuSelect" unique-opened>
    <template v-for="(item, i) in menuItems">
      <nav-submenu v-if="item.children && item.children.length" :key="'sub-' + i" :index="'' + (i +1)" :item="item"></nav-submenu>
      <nav-menu-item v-else :key="'sub-' + i" :index="item.code" :item="item"></nav-menu-item>
    </template>
  </el-menu>
</template>
<script>
import NavSubmenu from './nav-submenu'
import NavMenuItem from './nav-menu-item'

export default {
  name: 'nav-menu',
  components: {NavSubmenu, NavMenuItem},
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    openedIndexes: {
      type: Array,
      default: () => ['1']
    },
    menu: {
      type: String,
      default: 'home'
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleMenuSelect(index) {
      this.$emit('handleMenuSelect', index)
    }
  }
}
</script>

<style lang="scss">

</style>
