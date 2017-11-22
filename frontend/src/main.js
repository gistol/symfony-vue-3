import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 定义一个路由白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 判断是否为登出路由
  if (to.path === '/logout') {
    store.dispatch('FedLogOut').then(_ => {
      next()
    })
  }
  // 判断token是否存在
  if (store.getters.token) {
    if (to.path === '/login') {  // 如果当前token不为空，即已登录状态访问登录接口 默认跳转回根路由
      next({ path: '/' })
    } else {  // 访问其他路由
      if (!store.getters.name) {  // 如果没有获取到用户信息
        store.dispatch('GetInfo').then(response => {
          next({ ...to })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 如果在白名单中
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
