import Promise from 'bluebird'
import axios from 'axios'
import qs from 'query-string'
import {Loading} from 'element-ui'

const baseURL = '/'
const instance = axios.create({
  baseURL,
  timeout: 30 * 1000
})

const ajax = {
  fetch (url = '/', data = {}, method = 'GET', postType = 'formData') {
    let ops = {
      url,
      method: method.toUpperCase()
    }
    if (method.toUpperCase() === 'POST') {
      ops.data = data
      if (postType === 'formData') {
        Object.assign(ops, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: data => qs.stringify(data)
        })
      }
    } else {
      if (data.__cache__ === false) {
        Object.assign(data, {_: new Date().getTime()})
      }
      delete data.__cache__
      ops.params = data
    }

    return new Promise((resolve, reject) => {
      let loading = Loading.service({
        fullscreen: true,
        text: '数据加载中...',
        background: 'rgba(255,255,255,0)'
      })
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
      }).finally(() => {
        loading.close()
      })
    })
  },
  /**
   * GET请求
   * @param url 地址
   * @param data 参数
   * @param cache 是否缓存，默认不缓存
   * @returns {Promise}
   */
  get (url, data, cache = false) {
    Object.assign(data, {__cache__: cache})
    return this.fetch(url, data)
  },
  /**
   * POST请求
   * @param url 地址
   * @param data  数据
   * @param type post类型，json或者formData，默认以formData的形式提交请求
   * @returns {Promise}
   */
  post (url, data, type = 'formData') {
    return this.fetch(url, data, 'POST', type)
  },
  /**
   * 以JSON方式提交post请求
   * @param url 地址
   * @param data 数据
   * @returns {Promise}
   */
  postJson (url, data) {
    return this.post(url, data, 'json')
  }
}

const $ajax = {
  install (Vue) {
    Vue.prototype.$ajax = ajax
  }
}

export {$ajax}

export default ajax
