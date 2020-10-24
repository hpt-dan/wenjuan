import Vue from 'vue'
import Router from 'vue-router'
import utils from '../utils'
import setWechatTitle from '../utils/setWechatTitle'

Vue.use(Router)

const files = require.context('.', true, /\.js$/)
let routerArray = []
files.keys().forEach(key => {
  if (key === './index.js') return
  routerArray = routerArray.concat(files(key).default)
})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: utils.view('login/Login'),
      meta: {
        ignoreAuth: true,
        title: '登录'
      }
    },
    {
      path: '/Index',
      name: 'home',
      component: utils.view('home/Index'),
      meta: {
        ignoreAuth: true,
        title: '主页'
      }
    },
    {
      path: '/departmentType',
      name: 'departmentType',
      component: utils.view('department/type'),
      meta: {
        title: '单位类型'
      }
    }, {
      path: '/departmentInfo',
      name: 'departmentInfo',
      component: utils.view('department/info'),
      meta: {
        title: '单位信息',
      }
    }, {
      path: '/qrCode',
      name: 'qrCode',
      component: utils.view('department/qrCode'),
      meta: {
        title: '单位二维码'
      }
    }, {
      path: '/answerStatus',
      name: 'answerStatus',
      component: utils.view('department/answerStatus'),
      meta: {
        title: '单位答题情况'
      }
    }, {
      path: '/answerRank',
      name: 'answerRank',
      component: utils.view('department/answerRank'),
      meta: {
        title: '单位答题排名'
      }
    }, {
      path: '/answerStatistics',
      name: 'answerStatistics',
      component: utils.view('department/answerStatistics'),
      meta: {
        title: '单位答题统计'
      }
    }, {
      path: '/schoolInfo',
      name: 'schoolInfo',
      component: utils.view('school/info'),
      meta: {
        title: '学校信息'
      }
    }, {
      path: '/systemPerson',
      name: 'systemPerson',
      component: utils.view('system/person'),
      meta: {
        title: '人员管理'
      }
    }, {
      path: '/classInfo',
      name: 'classInfo',
      component: utils.view('class/info'),
      meta: {
        title: '班级信息'
      }
    },{
      path: '/classQrCode',
      name: 'classQrCode',
      component: utils.view('class/qrCode'),
      meta: {
        title: '班级二维码'
      }
    },{
      path: '/classStatus',
      name: 'classStatus',
      component: utils.view('class/status'),
      meta: {
        title: '班级答题情况'
      }
    },{
      path: '/schoolStatus',
      name: 'schoolStatus',
      component: utils.view('school/status'),
      meta: {
        title: '学校答题情况'
      }
    },{
      path: '/schoolRank',
      name: 'schoolRank',
      component: utils.view('school/rank'),
      meta: {
        title: '学校答题排名'
      }
    },{
      path: '/test',
      name: 'test',
      component: utils.view('system/test'),
      meta: {
        title: '考题管理'
      }
    },{
      path: '/townInfo',
      name: 'townInfo',
      component: utils.view('town/info'),
      meta: {
        title: '乡镇信息'
      }
    },{
      path: '/townStatus',
      name: 'townStatus',
      component: utils.view('town/status'),
      meta: {
        title: '乡镇答题情况'
      }
    },{
      path: '/townRank',
      name: 'townRank',
      component: utils.view('town/rank'),
      meta: {
        title: '乡镇答题排名'
      }
    },{
      path: '/systemPower',
      name: 'systemPower',
      component: utils.view('system/power'),
      meta: {
        title: '权限管理'
      }
    },{
      path: '/townCode',
      name: 'townCode',
      component: utils.view('town/code'),
      meta: {
        title: '乡镇二维码'
      }
    },{
      path: '/sqInfo',
      name: 'sqInfo',
      component: utils.view('sq/info'),
      meta: {
        title: '社区信息'
      }
    },{
      path: '/sqStatus',
      name: 'sqStatus',
      component: utils.view('sq/status'),
      meta: {
        title: '社区答题情况'
      }
    },
    {
      path: '/sqQrCode',
      name: 'sqQrcode',
      component: utils.view('sq/qrCode'),
      meta: {
        title: '社区二维码'
      }
    },
    {
      path: '/peopleStatus',
      name: 'peopleStatus',
      component: utils.view('department/peopleStatus'),
      meta: {
        title: '单位人员答题情况'
      }
    },
    ...routerArray
  ]
})
router.beforeEach((to, from, next) => {
  let res = sessionStorage.getItem('user')
  if (to.matched.length < 1) {
    next({path: '/'})
    return
  }
  setWechatTitle(to.meta.title || '平安安乡民意测评管理后台')
  // if (to.meta.ignoreAuth) {
  //   console.log('不需要鉴权')
  // }
  if (!res && to.fullPath !== '/') {
    next({path: '/'})
    return
  }
  // 页面跳转取消axios的请求
  window.__axiosPromiseArr.forEach((ele, idx) => {
    ele.cancel()
    delete window.__axiosPromiseArr[idx]
  })
  next()
})

export default router
