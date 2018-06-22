import Promise from 'bluebird'
import axios from 'axios'
import qs from 'query-string'
import {Loading} from 'element-ui'

const baseURL = '/'
const instance = axios.create({
  baseURL,
  timeout: 30 * 1000
})

/**
 * ajax请求
 * @param url 请求地址
 * @param data 请求参数 / 提交数据
 * @param ops 附加参数 {method = 'GET', type = 'formData', cache = false, loading = false}
 * @returns {Promise}
 */
const fetch = (url = '/', data = {}, {method = 'GET', type = 'formData', cache = false, loading = false} = {}) => {
  let ops = {
    url,
    method: method.toUpperCase()
  }

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  if (['PUT', 'POST', 'PATCH'].includes(method.toUpperCase())) {
    ops.data = data
    if (type === 'formData') {
      Object.assign(ops, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: data => qs.stringify(data)
      })
    }
  } else {
    // 请求是否使用缓存，默认不缓存，请求参数增加时间戳
    if (cache === false) {
      Object.assign(data, {_: new Date().getTime()})
    }
    ops.params = data
  }

  return new Promise((resolve, reject) => {
    let $loading = loading && Loading.service({
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
      $loading && $loading.close()
    })
  })
}

const ajax = {
  /**
   * XmlRequest请求，默认get请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  request: (url = '', data = {}, ops = {}) => fetch(url, data, ops),
  /**
   * XmlRequest get请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  get: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'GET'}),
  /**
   * XmlRequest delete请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  delete: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'DELETE'}),
  /**
   * XmlRequest head请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  head: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'HEAD'}),
  /**
   * XmlRequest post请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  post: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'POST'}),
  /**
   * XmlRequest 以json格式传参post请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  postJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'POST', type: 'json'}),
  /**
   * XmlRequest put请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  put: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PUT'}),
  /**
   * XmlRequest 以json格式传参put请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  putJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PUT', type: 'json'}),
  /**
   * XmlRequest patch请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  patch: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PATCH'}),
  /**
   * XmlRequest 以json格式传参patch请求
   * @param url 地址
   * @param data 参数
   * @param ops 附加属性
   * @returns {Promise}
   */
  patchJson: (url = '', data = {}, ops = {}) => fetch(url, data, {...ops, method: 'PATCH', type: 'json'})
}

const $ajax = {
  install (Vue) {
    Vue.prototype.$ajax = ajax
  }
}

export {$ajax}

export default ajax
