import Header from './header/header'

const components = [
  Header
]
export default {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
