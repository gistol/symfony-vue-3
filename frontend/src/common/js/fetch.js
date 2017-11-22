import axios from 'axios'
import store from '@/store'

// 创建axios实例
const service = axios.create({
  timeout: 5000
})

// 添加request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // do something with request error
  console.log(error)
  return Promise.reject(error)
})

// 添加response拦截器
service.interceptors.response.use(response => {
  // 结合自己的业务进行修改 默认code为20000时为合法相应
  const res = response.data
  if (res.code !== 20000) {
    console.log(res.msg)
    if (res.code === 40300 || res.code === 40100) {
      // 进行登出操作
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      // 为了避免bug reload 重新实例化vue-router对象
    }
  } else {
    if (response && response.headers['x-refresh-jwt']) {
      console.log('refresh')
      const refreshToken = response.headers['x-refresh-jwt']
      store.dispatch('RefreshToken', { token: refreshToken })
    }
    return response
  }
}, error => {
  return Promise.reject(error)
})

export default service
