import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SaveToEth',
      component: Home
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
