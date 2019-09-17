import Vue from 'vue'

// Third-party
import Buefy from 'buefy'
import VueLoading from 'vue-loading-template'
import VueClipboard from 'vue-clipboard2'
import SocialSharing from 'vue-social-sharing'

// Styles
import 'buefy/dist/buefy.css'
import '@/assets/css/main.css'

// Components
import { i18n } from './i18n'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(Buefy)
Vue.use(SocialSharing)
Vue.use(VueLoading)
Vue.use(VueClipboard)
VueClipboard.config.autoSetContainer = true // add this line

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
