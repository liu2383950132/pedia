import {
  Button,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'
export default {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
  }
}
