import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
import AppSocket from './plugins/socket'
import filters from './filters'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import AppSpinner from './components/shared/AppSpinner'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('AppSpinner', AppSpinner)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vuelidate)
Vue.use(Toasted)
Vue.use(AppSocket, { connection: process.env.VUE_APP_URI })

filters()



new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')






