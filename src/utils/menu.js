export default [
  {
    'text': '首页',
    'url': '/index',
    'icon': 'info-circle',
    'collapse': true,
    'children': [
      {
        'text': '操作记录管理',
        'url': '/bbb'
      },
      {
        'text': '帮助手册管理',
        'url': '/help'
      }
    ]
  },
  {
    'text': '项目看板',
    'url': '/about',
    'icon': 'cog'
  },
  {
    'text': '销售系统',
    'icon': 'th-large',
    'collapse': true,
    'children': [
      {
        'text': '报价管理',
        'url': '/offer'
      },
      {
        'text': '销售合同管理',
        'url': '/contract'
      },
      {
        'text': '销售订单管理',
        'url': '/sellManage'
      },
      {
        'text': '备货订单管理',
        'url': '/stocking'
      },
      {
        'text': '商品管理',
        'url': '/goods'
      },
      {
        'text': '客户管理',
        'url': '/customer'
      },
      {
        'text': '销售数据分析',
        'url': '/popover'
      }
    ]
  },
  {
    'text': '采购系统',
    'icon': 'cube',
    'collapse': true,
    'children': [
      {
        'text': '待采购订单',
        'url': '/pendingPurchase'
      },
      {
        'text': '采购订单管理',
        'url': '/purchase'
      }
    ]
  },
  {
    'text': '仓库系统',
    'icon': 'cube',
    'collapse': true,
    'children': [
      {
        'text': '发货管理',
        'url': '/sellDelivery'
      },
      {
        'text': '入库记录',
        'url': '/purchaseInventoryGoods'
      },
      {
        'text': '发货记录',
        'url': '/deliveryRecordGoods'
      },
      {
        'text': '库存统计',
        'url': '/inventoryStatistics'
      }
    ]
  },
  {
    'text': '财务系统',
    'icon': 'cube',
    'collapse': true,
    'children': [
      {
        'text': '开票管理',
        'url': '/invoiceManagement'
      },
      {
        'text': '收票管理',
        'url': '/ticket'
      },
      {
        'text': '收款单据管理',
        'url': '/receive'
      },
      {
        'text': '付款单据管理',
        'url': '/payment'
      },
      {
        'text': '经营分析',
        'url': '/collapse'
      }
    ]
  },
  {
    'text': '基础管理',
    'icon': 'cube',
    'collapse': true,
    'children': [
      {
        'text': '用户管理',
        'url': '/user'
      },
      {
        'text': '供应商管理',
        'url': '/supplier'
      },
      {
        'text': '公司管理',
        'url': '/company'
      },
      {
        'text': '仓库管理',
        'url': '/warehouse'
      },
      {
        'text': '角色权限管理',
        'url': '/collapse'
      }
    ]
  }
]
