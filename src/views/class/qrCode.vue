<template lang="pug">
  .qrCode(v-loading="allLoadint")
    my-table(:table="table" ref="myTable")
      span(slot="ctrl-button")
        el-button(type="primary" @click="goExport" size="mini") 导出
</template>

<script>
import MyTable from '@components/global/MyTable'
import vueQr from 'vue-qr'

export default {
  name: 'info',
  components: {MyTable, vueQr},
  data (vm) {
    return {
      our: require('../../assets/our.jpg'),
      show: false,
      type: 'add',
      load: false,
      allLoadint: false,
      category: [],
      dept: [
        {
          label: '无上级单位',
          id: 0
        }
      ],
      ruleForm: {
        parentId: 0,
        num: 0
      },
      rules: {
        categoryId: [
          { required: true, message: '请选择所属系统', trigger: 'change' }
        ],
        label: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ]
      },
      table: {
        api: vm.$api.searchAllDept,
        query: {
          keywords: null,
          isSchool: 2,
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据关键字搜索.'
          }],
        columns: [{
          title: '序号',
          key: 'userName',
          showTooltip: true,
          render (h, ctx) {
            return h('div', [
              h('span', {}, ctx.index + 1)
            ])
          }
        }, {
          title: '班级名称',
          key: 'label',
          showTooltip: true
        }, {
          title: '班级人数',
          key: 'num',
          showTooltip: true
        }, {
          title: '所属学校',
          key: 'parentLabel',
          showTooltip: true
        }, {
          title: '二维码',
          key: 'type',
          showTooltip: true,
          render (h, ctx) {
            return h('div', [
                h('vue-qr', {
                  style: {
                    width: '100px'
                  },
                  attrs: {
                    size: 200,
                    text: `${vm.$qrUrl}?id=${ctx.row.id}`,
                    logoSrc: vm.our
                  }
                })
            ])
          }
        }
        ]
      }
    }
  },
  async created () {
  },
  methods: {
    async goExport () {
      this.$export('dept/excel', this.table)
    },
  }
}
</script>

<style  lang="sass">
  .qrCode

</style>
