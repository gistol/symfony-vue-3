import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/dashboard'
import Dashboard2 from '@/components/dashboard/dashboard2'
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard2',
      component: Dashboard2
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout'
    }
  ]
})
