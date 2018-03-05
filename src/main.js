import Vue from 'vue'
import App from './App'
import pagination from '@/lib/pagination'
Vue.component('pagination', pagination)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
