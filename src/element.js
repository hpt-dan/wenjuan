import Vue from 'vue'
import './assets/sass/element-variables.sass'

import {
  Badge,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Checkbox,
  CheckboxGroup,
  Col,
  Tooltip,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  Loading,
  Menu,
  InputNumber,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Notification,
  Option,
  Pagination,
  Row,
  Scrollbar,
  Select,
  Submenu,
  Table,
  TableColumn,
  Switch,
  TabPane,
  Tabs,
  Tree,
  Upload,
  RadioGroup,
  Radio,
  Popover,
  Timeline,
  TimelineItem,
  Progress,
  TimePicker,
  Drawer,
  Image,
  Link
} from 'element-ui'

Vue.use(Button)
  .use(Badge)
  .use(Link)
  .use(Switch)
  .use(Form)
  .use(Tooltip)
  .use(InputNumber)
  .use(FormItem)
  .use(Input)
  .use(Scrollbar)
  .use(Row)
  .use(Col)
  .use(Select)
  .use(Option)
  .use(Table)
  .use(TableColumn)
  .use(Menu)
  .use(MenuItemGroup)
  .use(MenuItem)
  .use(Submenu)
  .use(Pagination)
  .use(Tabs)
  .use(TabPane)
  .use(Tree)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Upload)
  .use(CheckboxGroup)
  .use(Checkbox)
  .use(Dialog)
  .use(DatePicker)
  .use(RadioGroup)
  .use(Radio)
  .use(Popover)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Timeline)
  .use(TimelineItem)
  .use(Progress)
  .use(TimePicker)
  .use(Drawer)
  .use(Image)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Loading.directive)

let loading = null
Vue.prototype.$warning = message => {
  return MessageBox.confirm(message, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}
let messageBoxLoading = null
Vue.prototype.$openMessageBoxLoading = text => {
  messageBoxLoading = Loading.service({
    target: '.el-message-box',
    text
  })
}
Vue.prototype.$closeMessageBoxLoading = () => {
  messageBoxLoading.close()
}

let layoutViewLoading = null
Vue.prototype.$openLayoutViewLoading = (text = '数据加载中...') => {
  layoutViewLoading = Loading.service({
    target: '.layout-view',
    text
  })
}
Vue.prototype.$closeLayoutViewLoading = () => {
  layoutViewLoading.close()
}

Vue.prototype.$layoutRouterLoading = isOpen => {
  if (isOpen) {
    loading = Loading.service({
      target: '.layout__router',
      text: '数据加载中...'
    })
  } else {
    loading.close()
  }
}

Vue.prototype.$viewImage = url => {
  if (!url) {
    return Notification.error({
      title: '错误',
      message: '未找到图片'
    })
  }
  const h = Vue.prototype.$h
  MessageBox({
    title: '',
    showCancelButton: false,
    showConfirmButton: false,
    showClose: false,
    customClass: 'img-msg-box',
    message: h('img', {
      attrs: {
        src: url,
        style: 'width: 100%'
      }
    })
  }).catch(e => { })
}
