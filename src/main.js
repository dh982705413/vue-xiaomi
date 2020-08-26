import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from '@/util/http'
import './assets/scss/index.scss'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bubbles.svg'
})
Vue.use(VueCookie)
if (process.env.VUE_APP_MOCK_API === 'true') {
  require('./mock/api')
}
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
