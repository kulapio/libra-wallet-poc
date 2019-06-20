import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Send from './views/Send'
import Receive from './views/Receive'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Home
    },
    {
      path: '/send',
      name: 'Send',
      component: Send
    },
    {
      path: '/receive',
      name: 'Receive',
      component: Receive
    },
    {
      path: '/github',
      name: 'github',
      beforeEnter () {
        location.href = 'https://github.com/kulapio/doctoeth'
      }
    }
  ]
})
