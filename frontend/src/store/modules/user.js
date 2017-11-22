import { login, logout, getInfo } from '@/api/login'

const user = {
  state: {
    token: window.localStorage.getItem('jwt'),
    name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    // 登录
    Login ({ commit }, loginFormData) {
      return new Promise((resolve, reject) => {
        login(loginFormData).then(response => {
          const data = response.data
          console.log(data.token)
          window.localStorage.setItem('jwt', data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const userInfo = response.data.userInfo
          commit('SET_NAME', userInfo.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 刷新jwt
    RefreshToken ({ commit }, data) {
      console.log(data.token)
      return new Promise(resolve => {
        commit('SET_TOKEN', data.token)
        window.localStorage.setItem('jwt', data.token)
        resolve()
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          window.localStorage.removeItem('jwt')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        window.localStorage.removeItem('jwt')
        resolve()
      })
    }
  }
}

export default user
