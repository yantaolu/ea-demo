<template>
  <el-menu-item :index="index">
    <slot></slot>
  </el-menu-item>
</template>

<script>
export default {
  name: 'nav-menu-item',
  props: {
    index: String,
    item: Object
  }
}
</script>

<style scoped>

</style>
