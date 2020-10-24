import Axios from 'axios'
import config from '../config'
import router from '../router'
import { Message } from 'element-ui'

// Axios.defaults.baseURL = config.apiBaseUrl
Axios.defaults.timeout = 10000000
Axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'

window.__axiosPromiseArr = []

// Axios 请求拦截器
Axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  // 将cancel放置于全局变量的数组中, 用于取消请求
  config.cancelToken = new Axios.CancelToken(cancel => {
    window.__axiosPromiseArr.push({
      cancel
    })
  })
  return config
})

// Axios 响应拦截器 对返回码进行处理处理
Axios.interceptors.response.use(res => {
  // console.log(res)
  if (res.data.code === 400) {
    Message.error(res.data.msg)
    return Promise.reject(res.data.msg)
  }
  if (res.status === 200) {
    return res.data.data
  }
  if (res.data.rspInf) {
    Message.error(res.data.rspInf)
  }
  return Promise.reject(res.data.rspInf)
}, err => {
  if (err.response) {
    switch (err.response.status) {
      case 502:
        Message.error('服务器内部错误')
        break
      case 401:
        router.replace({name: 'Login'})
        break
      case 404:
        Message.error('请求地址错误')
        break
      case 405:
        Message.error('请求方式错误')
        break
      default:
        Message.error('服务器繁忙')
        break
    }
  }
  return Promise.reject(err.response)
})
