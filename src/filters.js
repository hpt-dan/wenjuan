import currency from '@/utils/currency'
const fileIcons = require.context('@/assets/images/file-icon', true, /\.png$/)

export default {
  fileIcon (val) {
    const suffix = val.substring(val.lastIndexOf('.') + 1) || '未知'
    switch (suffix) {
      case 'doc':
      case 'docx':
        return fileIcons('./word.png')
      case 'xls':
      case 'xlsx':
        return fileIcons('./excel.png')
      case 'ppt':
        return fileIcons('./ppt.png')
      case 'pptx':
        return fileIcons('./pptx.png')
      case 'pdf':
        return fileIcons('./pdf.png')
      case 'txt':
        return fileIcons('./txt.png')
      case 'mp3':
        return fileIcons('./mp3.png')
      case 'mp4':
        return fileIcons('./mp4.png')
      case 'zip':
      case 'rar':
      case '7z':
        return fileIcons('./zip.png')
      case 'key':
        return fileIcons('./key.png')
      default:
        return fileIcons('./unknown.png')
    }
  },
  fileFormat (val) {
    return val.substring(val.lastIndexOf('.'))
  },
  str2ymd (val) {
    if (!val) return '--'
    return val.substring(0, 10)
  },
  str2ym (val) {
    if (!val) return '--'
    return val.substring(0, 7)
  },
  str2ymdhm (val) {
    if (!val) return '--'
    return val.substring(0, 16)
  },
  aliyunThumb (val) {
    // TODO 404图片
    if (!val) return ''
    return val + '?x-oss-process=image/resize,m_fixed,h_100,w_100'
  },
  str2Dictionary (val) {
    if (!val) return '--'
    return '¥  ' + val
  },
  currency
  // ...enumsFilter
}
