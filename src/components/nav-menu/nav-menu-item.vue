<template>
  <tf-menu-item :index="index">
    <slot></slot>
  </tf-menu-item>
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
