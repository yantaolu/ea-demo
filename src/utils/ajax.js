import Promise from 'bluebird'
import axios from 'axios'
import qs from 'query-string'

const baseURL = '/'
const instance = axios.create({
  baseURL,
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: data => qs.stringify(data)
})
const ajax = {
  fetch (url = '/', data = {}, method = 'GET') {
    let ops = {
      url,
      method: method.toUpperCase()
    }
    if (method.toUpperCase() === 'POST') {
      if (data._cache !== false) {
        Object.assign(data, {_: new Date().getTime()})
      }
      ops.data = data
    } else {
      ops.params = data
    }
    return new Promise((resolve, reject) => {
      instance(ops).then(res => {
        if (res.status === 200) {
          resolve(res.data)
        } else {
          reject(res.statusText)
        }
      }).catch(e => {
        let status = e && e.response && e.response.status
        switch (status) {
          case 400:
            console.error('请求错误')
            break
          case 404:
            console.error('请求路径不存在')
            break
          case 500:
            console.error('系统错误')
            break
          case 504:
            console.error('请求超时')
            break
          default:
            console.error((e.response && e.response.statusText) || status)
            break
        }
        reject(e)
      })
    })
  },
  get (url, data) {
    return this.fetch(url, data)
  },
  post (url, data) {
    return this.fetch(url, data, 'POST')
  }
}

export default {
  install (Vue) {
    Vue.prototype.$ajax = ajax
  }
}
