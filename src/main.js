import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './global'
import './api/config'
import './components/global'
import './element'
import 'normalize.css'
import './assets/sass/main.sass'
import './icons'
import vueQr from 'vue-qr'
import api from '@/api'
import plTable from 'pl-table'
import 'pl-table/themes/index.css'
import 'pl-table/themes/plTableStyle.css'
Vue.use(plTable)
// let urls = 'http://192.168.254.112:8081/'
 let urls = 'http://39.99.221.134:10000/'
Vue.config.productionTip = false
Vue.prototype.$qrUrl = 'http://saas.5ygw.com:10000/phone/#/'
// Vue.prototype.$qrUrl = 'http://39.99.221.134:10000/phone/#/'
// Vue.prototype.$qrUrl = 'http://192.168.254.111:8082/#/'
Vue.prototype.$url = urls
// Vue.prototype.$url = 'http://39.99.221.134:8090/'
Vue.prototype.$api = api
Vue.prototype.$export = (url, table) => {
    let str = '?'
    let pageSize = 10
    let pageNo = 1
    let query
  if (table.pagination.pageNo) {
      pageNo = table.pagination.pageNo
    }
    if (table.pagination.pageSize) {
      pageSize = table.pagination.pageSize
    }
  query = table.query
  for (let i in query) {
    str += `${i}=${query[i]}&`
  }
  window.open(`${urls}${url}?&pageNo=${pageNo}&pageSize=${pageSize}&+ ${str.substr(0, str.length - 1)}`)
}
Vue.use(vueQr)
new Vue({
  router,
  render: h => {
    Vue.prototype.$h = h
    return h(App)
  }
}).$mount('#app')
