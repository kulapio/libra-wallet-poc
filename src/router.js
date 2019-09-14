import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Send from './views/Send'
import Receive from './views/Receive'
import Transactions from './views/Transactions'
import ScanQR from './views/ScanQR'
import Stats from './views/Stats'
import PaymentSuccess from './views/PaymentSuccess'
import About from './views/About'

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
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions
    },
    {
      path: '/paymentSuccess',
      name: 'PaymentSuccess',
      component: PaymentSuccess
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/blog',
      name: 'Blog',
      beforeEnter (route) {
        const { locale } = route.query

        if (locale === 'en') {
          location.href = 'https://medium.com/kulapofficial/the-first-libra-wallet-poc-building-your-own-wallet-and-apis-3cb578c0bd52'
        } else {
          location.href = 'https://medium.com/kulapofficial/libra-%E0%B8%A1%E0%B8%B2%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B8%81%E0%B8%B8%E0%B8%A5%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%94%E0%B8%B4%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%AD%E0%B8%A5%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B9%82%E0%B8%A5%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5-%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%98%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%95%E0%B9%88%E0%B8%B3-%E0%B9%82%E0%B8%94%E0%B8%A2-facebook-8517d267717b'
        }
      }
    }
  ]
})
