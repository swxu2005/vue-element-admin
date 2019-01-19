import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/user/info',
    method: 'get'
  })
}

export function getUserPermissions() {
  return request({
    url: '/sys/menu/permissions',
    method: 'get'
  })
}
