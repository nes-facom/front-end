import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'
import router from './router'

import './assets/main.css'

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
