import fetch from '@/common/js/fetch'

const qs = require('qs')

export function login (loginFormData) {
  return fetch({
    url: '/api/login',
    method: 'post',
    data: qs.stringify(loginFormData)
  })
}

export function getInfo () {
  return fetch({
    url: '/api/get-user-info',
    method: 'get'
  })
}

export function logout () {
  return fetch({
    url: '/api/security/logout',
    method: 'post'
  })
}
