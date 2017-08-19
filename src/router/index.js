import Vue from 'vue'
import Router from 'vue-router'
import Klaverjassen from '@/components/Klaverjassen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Klaverjassen',
      component: Klaverjassen
    }
  ]
})
