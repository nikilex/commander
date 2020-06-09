import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css" 

const moment = require('moment')
require('moment/locale/ru')

Vue.use(BootstrapVue) 
Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
