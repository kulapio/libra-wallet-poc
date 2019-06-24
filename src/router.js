import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Send from './views/Send'
import Receive from './views/Receive'
import ScanQR from './views/ScanQR'
import Stats from './views/Stats'

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
      path: '/scanQR',
      name: 'ScanQR',
      component: ScanQR
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    }
  ]
})
