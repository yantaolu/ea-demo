<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {menuTree} from './routes'

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
  methods: {
    async getUserAuthorities () {
      return new Promise((resolve, reject) => {
        let superRoutes = []
        const parseMenu = (menu) => {
          if (!menu.children) {
            let route = {
              path: menu.path
            }
            menu.buttons && (route.buttons = Object.keys(menu.buttons))
            superRoutes.push(route)
          } else {
            menu.children.forEach(child => {
              parseMenu(child)
            })
          }
        }
        parseMenu(menuTree)
        resolve(superRoutes)
      })
    }
  },
  async mounted () {
    const data = await this.getUserAuthorities()
    this.$store.dispatch('setRootRoutes', data)
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
  height: 100%;
}
</style>
