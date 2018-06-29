import NavMenu from './nav-menu/nav-menu'
import Header from './header/header'
import Tabs from './tabs/tabs'
import TabsPane from './tabs/tab-pane'

const components = [
  NavMenu,
  Header,
  Tabs,
  TabsPane
]
export default {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
