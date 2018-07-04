<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    if (!sessionStorage.getItem('login')) {
      this.$router.push('/login')
    }
  },
  watch: {},
  methods: {},
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
</style>
