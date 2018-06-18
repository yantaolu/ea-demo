import NavMenu from './nav-menu/nav-menu'
import TfButtonGroup from './tf-button/tf-button-group'
import TfButton from './tf-button/tf-button'
import TfHeader from './tf-header/tf-header'
import TfTable from './tf-table/tf-table'
import TfTabs from './tf-tabs/tf-tabs'
import TfTabsPane from './tf-tabs/tf-tab-pane'

const components = [
  NavMenu,
  TfButtonGroup,
  TfButton,
  TfHeader,
  TfTable,
  TfTabs,
  TfTabsPane
]
export default {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
