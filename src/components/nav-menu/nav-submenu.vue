<template>
  <el-submenu :index="index">
    <template slot="title">
      <i class="fa" :class="'fa-' + item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </template>
    <template v-for="(child, i) in item.children">
      <nav-submenu v-if="child.children && child.children.length" :item="child" :index="child.code"></nav-submenu>
      <nav-menu-item v-else :item="child" :index="child.code">{{child.title}}</nav-menu-item>
    </template>
  </el-submenu>
</template>

<script>
import NavMenuItem from './nav-menu-item'

export default {
  name: 'nav-submenu',
  components: {NavMenuItem},
  props: {
    index: String,
    item: Object
  }
}
</script>

<style scoped>

</style>
