// 枚举合集
export default {

  // ---------------- ArticleType枚举  开始 -------------------
  ArticleType: {
    // 枚举列表
    list: [
      { label: '动态新闻', value: 'NEWS' },
      { label: '政策法规', value: 'POLICY' },
      { label: '用水科普', value: 'WATER_SCIENCE' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NEWS':
          return '动态新闻'
        case 'POLICY':
          return '政策法规'
        case 'WATER_SCIENCE':
          return '用水科普'
        default:
          return val
      }
    }
  },
  // ---------------- ArticleType枚举  结束 -------------------

  // ---------------- BannerType枚举  开始 -------------------
  BannerType: {
    // 枚举列表
    list: [
      { label: '首页', value: 'HOME' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'HOME':
          return '首页'
        default:
          return val
      }
    }
  },
  // ---------------- BannerType枚举  结束 -------------------

  // ---------------- ColumnType枚举  开始 -------------------
  ColumnType: {
    // 枚举列表
    list: [
      { label: '首页', value: 'HOME' },
      { label: '动态新闻', value: 'NEWS' },
      { label: '政策法规', value: 'POLICY' },
      { label: '用水科普', value: 'WATER_SCIENCE' },
      { label: '办事指南', value: 'GUIDE' },
      { label: '服务承诺', value: 'PROMISE' },
      { label: '入户申请', value: 'APPLY' },
      { label: '用户水表过户', value: 'TRANSFER' },
      { label: '用户水表增容', value: 'INCREASE' },
      { label: '水质报告', value: 'WATER_QUALITY' },
      { label: '停水通知', value: 'CUT_OFF_WATER_INFORM' },
      { label: '营业网点', value: 'NET_WORK' },
      { label: '工单进度', value: 'ORDER' },
      { label: '公司简介', value: 'COMPANY_PROFILE' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'HOME':
          return '首页'
        case 'NEWS':
          return '动态新闻'
        case 'POLICY':
          return '政策法规'
        case 'WATER_SCIENCE':
          return '用水科普'
        case 'GUIDE':
          return '办事指南'
        case 'PROMISE':
          return '服务承诺'
        case 'APPLY':
          return '入户申请'
        case 'TRANSFER':
          return '用户水表过户'
        case 'INCREASE':
          return '用户水表增容'
        case 'WATER_QUALITY':
          return '水质报告'
        case 'CUT_OFF_WATER_INFORM':
          return '停水通知'
        case 'NET_WORK':
          return '营业网点'
        case 'ORDER':
          return '工单进度'
        case 'COMPANY_PROFILE':
          return '公司简介'
        default:
          return val
      }
    }
  },
  // ---------------- ColumnType枚举  结束 -------------------

  // ---------------- CutOffType枚举  开始 -------------------
  CutOffType: {
    // 枚举列表
    list: [
      { label: '临时停水', value: 'TEMPORARY' },
      { label: '计划停水', value: 'SHEDULE' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'TEMPORARY':
          return '临时停水'
        case 'SHEDULE':
          return '计划停水'
        default:
          return val
      }
    }
  },
  // ---------------- CutOffType枚举  结束 -------------------

  // ---------------- ElementType枚举  开始 -------------------
  ElementType: {
    // 枚举列表
    list: [
      { label: '菜单', value: 'MENU' },
      { label: '操作', value: 'OPERATION' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'MENU':
          return '菜单'
        case 'OPERATION':
          return '操作'
        default:
          return val
      }
    }
  },
  // ---------------- ElementType枚举  结束 -------------------

  // ---------------- FixStatus枚举  开始 -------------------
  FixStatus: {
    // 枚举列表
    list: [
      { label: '全部', value: null },
      { label: '未填写完整的', value: 'INCOMPLETE' },
      { label: '待受理', value: 'PENDING' },
      { label: '受理', value: 'PROCESS' },
      { label: '办结', value: 'FINISH' },
      { label: '已取消', value: 'VETO' },
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'INCOMPLETE':
          return '未填写完整的'
        case 'PENDING':
          return '待受理'
        case 'PROCESS':
          return '受理'
        case 'FINISH':
          return '办结'
        case 'VETO':
          return '已取消'
        default:
          return val
      }
    }
  },
  // ---------------- FixStatus枚举  结束 -------------------

  // ---------------- FixType枚举  开始 -------------------
  FixType: {
    // 枚举列表
    list: [
      { label: '入户申请工单', value: 'APPLY' },
      { label: '水表过户工单', value: 'TRANSFER' },
      { label: '水表增容工单', value: 'INCREASE' },
      { label: '反馈', value: 'FEEDBACK' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'APPLY':
          return '入户申请工单'
        case 'TRANSFER':
          return '水表过户工单'
        case 'INCREASE':
          return '水表增容工单'
        case 'FEEDBACK':
          return '反馈'
        default:
          return val
      }
    }
  },
  // ---------------- FixType枚举  结束 -------------------

  // ---------------- LinkType枚举  开始 -------------------
  LinkType: {
    // 枚举列表
    list: [
      { label: '站内页面', value: 'INNER_LINK' },
      { label: '自定义链接', value: 'OUTER_LINK' },
      { label: '不跳转', value: 'NONE' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'INNER_LINK':
          return '站内页面'
        case 'OUTER_LINK':
          return '自定义链接'
        case 'NONE':
          return '不跳转'
        default:
          return val
      }
    }
  },
  // ---------------- LinkType枚举  结束 -------------------

  // ---------------- OrderStatus枚举  开始 -------------------
  OrderStatus: {
    // 枚举列表
    list: [
      { label: '未完成', value: 'UNFINISHED' },
      { label: '已完成', value: 'FINISH' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'UNFINISHED':
          return '未完成'
        case 'FINISH':
          return '已完成'
        default:
          return val
      }
    }
  },
  // ---------------- OrderStatus枚举  结束 -------------------

  // ---------------- UserType枚举  开始 -------------------
  UserType: {
    // 枚举列表
    list: [
      { label: '个人', value: 'PERSONAL' },
      { label: '企事业单位', value: 'COMPANY' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'PERSONAL':
          return '个人'
        case 'COMPANY':
          return '企事业单位'
        default:
          return val
      }
    }
  },
  // ---------------- UserType枚举  结束 -------------------

  // ---------------- YesNoStatus枚举  开始 -------------------
  YesNoStatus: {
    // 枚举列表
    list: [
      { label: '是', value: 'YES' },
      { label: '否', value: 'NO' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'YES':
          return '是'
        case 'NO':
          return '否'
        default:
          return val
      }
    }
  },
  // ---------------- YesNoStatus枚举  结束 -------------------
  // ---------------- YesNoStatus枚举  开始 -------------------
  YesNoStatusWater: {
    // 枚举列表
    list: [
      { label: '是', value: 'YES' },
      { label: '否', value: 'NO' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'YES':
          return '已发布'
        case 'NO':
          return '未发布'
        default:
          return val
      }
    }
  },
  // ---------------- YesNoStatus枚举  结束 -------------------
  // ---------------- ColumnType枚举  开始 -------------------
  ColumnTypeMini: {
    // 枚举列表
    list: [
      { label: '入户申请', value: 'APPLY' },
      { label: '用户水表过户', value: 'TRANSFER' },
      { label: '用户水表增容', value: 'INCREASE' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'APPLY':
          return '入户申请'
        case 'TRANSFER':
          return '用户水表过户'
        case 'INCREASE':
          return '用户水表增容'
        default:
          return val
      }
    }
  },
  // ---------------- ColumnType枚举  结束 -------------------
  // ---------------- ColumnType枚举  开始 -------------------
  BannerColumnType: {
    // 枚举列表
    list: [
      { label: '首页', value: 'HOME' },
      { label: '动态新闻', value: 'NEWS' },
      { label: '政策法规', value: 'POLICY' },
      { label: '用水科普', value: 'WATER_SCIENCE' },
      { label: '水质报告', value: 'WATER_QUALITY' }
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'HOME':
          return '首页'
        case 'NEWS':
          return '动态新闻'
        case 'POLICY':
          return '政策法规'
        case 'WATER_SCIENCE':
          return '用水科普'
        case 'WATER_QUALITY':
          return '水质报告'
        default:
          return val
      }
    }
  },
  // ---------------- FixType枚举  开始 -------------------
  FixTypeMini: {
    // 枚举列表
    list: [
      { label: '入户申请工单', value: 'APPLY' },
      { label: '水表过户工单', value: 'TRANSFER' },
      { label: '水表增容工单', value: 'INCREASE' },
    ],
    // 查询条件列表
    allList: function () {
      return [{ label: '全部', value: null }].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'APPLY':
          return '入户申请工单'
        case 'TRANSFER':
          return '水表过户工单'
        case 'INCREASE':
          return '水表增容工单'
        default:
          return val
      }
    }
  }
  // ---------------- FixType枚举  结束 -------------------
  
}
