<template>
  <div>
    <tab-order-status></tab-order-status>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {},
  registerComponents (components = {}) {
    if (!this.components) {
      this.components = components
    } else {
      Object.assign(this.components, components)
    }
  }
}
</script>

<style scoped>

</style>
