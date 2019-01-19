import request from '@/utils/request'
import qs from 'qs'

/**
 * GET请求
 * @param {请求URL} url
 * @param {请求参数，是一个对象，会被转成url中的query参数} params
 */
const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url,
      params
    }).then(({ data: res }) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * POST/PUT/DELETE请求，发送对象
 * @param {请求URL} url
 * @param {请求参数，是一个对象} params
 * @param {请求方法，默认POST，可指定PUT或DELETE} method
 */
const postRequest = (url, params, method = 'post') => {
  return new Promise((resolve, reject) => {
    request({
      method,
      url,
      data: params
    }).then(({ data: res }) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * POST/PUT/DELETE请求，发送表单
 * @param {请求URL} url
 * @param {请求参数，是一个对象，会被转成表单发送} params
 * @param {请求方法，默认POST，可指定PUT或DELETE} method
 */
const postFormRequest = (url, params, method = 'post') => {
  return new Promise((resolve, reject) => {
    request({
      method,
      url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [function(data) {
        data = qs.stringify(data)
        return data
      }],
      data: params
    }).then(({ data: res }) => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  getRequest,
  postRequest,
  postFormRequest
}
