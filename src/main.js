import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import VueUUID from 'vue-uuid'

Vue.config.productionTip = false
Vue.use(VueUUID)

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
