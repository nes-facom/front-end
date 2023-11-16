import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store/index.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')