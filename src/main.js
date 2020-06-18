import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import element from './elementui/index'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(element)
Vue.use(infiniteScroll)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
