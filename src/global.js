import Vue from 'vue'

import config from './config'
import filters from './filters'
import directives from './directives'
import enums from './utils/enums'
import _ from './utils/lodash'
import utils from './utils'
import api from './api'
import dayjs from 'dayjs'

// 模拟登录
// api.SimulateLogin({
//   'username': 'username',
//   'phone': '13487317012',
//   'password': 'password',
//   'verifyCode': 'verifyCode'
// }).then(userInfo => {
//   if (userInfo.userType === 'ENTERPRISE') {
//     api.GetCompany({
//       id: userInfo.companyInfoId
//     }).then(companyInfo => {
//       console.log(companyInfo)
//     })
//   }
// })

// let userInfo = async () => {
//   let localUserInfo = localStorage.getItem('userInfo')
//   if (!localUserInfo) {
//     await api.SimulateLogin({
//
//     })
//   }
//
// }

Vue.prototype.$config = config
Vue.prototype.$enums = enums
Vue.prototype.$filters = filters
Vue.prototype.$_ = _
Vue.prototype.$utils = utils
Vue.prototype.$dayjs = dayjs
Vue.prototype.$bus = new Vue()

// 全局注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

// 全局注册指令
for (let key in directives) {
  const directiveName = _.kebabCase(key)
  Vue.directive(directiveName, directives[key])
}

Vue.prototype.$search = async table => {
  if (table && table.api) {
    let query = _.cloneDeep(table.query) || {}
    if (!table.hidePagination) {
      query.pageNo = table.pagination.pageNo
      query.pageSize = table.pagination.size || 10
    }
    table.loading = true
    try {
      let data = await table.api(query)
      if (data instanceof Array) {
        table.data = data
      } else {
        table.data = data.list
        table.pagination.total = data.total
      }
    } catch (e) {}
    table.loading = false
  }
}

Vue.prototype.$userInfo = () => {
  let u = sessionStorage.getItem('userInfo')
  // if (!u) {
  //   //   return router.replace({
  //   //     name: 'Login'
  //   //   })
  //   // }
  return JSON.parse(u)
}

Vue.prototype.$downloadFile = url => {
  if (!url) return
  window.open(url)
  // window.location.target = '_blank'
  // window.location.href = url
}

Vue.prototype.$exportFile = (url, query) => {
  if (!url) return
  let str = '?'
  for (let item in query) {
    if (!query.hasOwnProperty(item)) continue
    if (query[item] && item !== 'pageNo' && item !== 'pageSize') {
      str += `${item}=${query[item]}&`
    }
  }
  const exportUrl = config.apiBaseUrl + url + str.substr(0, str.length - 1)
  if (process.env.NODE_ENV === 'development') {
    window.open('https://loong-dev.yun-chang.com' + exportUrl)
  } else {
    window.open(exportUrl)
  }
}
