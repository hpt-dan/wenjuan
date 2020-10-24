<template lang="pug">
  .departType(v-loading="loading")
    my-table(:table="table" ref="myTable")
      //span(slot="ctrl-button")
        el-button(type="primary" @click="goAdd" size="mini") 添加单位类型
</template>

<script>
import MyTable from '@components/global/MyTable'

export default {
  name: 'info',
  components: {MyTable},
  data (vm) {
    return {
      loading: false,
      table: {
        api: vm.$api.fuserullMarks,
        query: {
          keywords: null,
          isSchool: 0,
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据用户名查找.'
          },
          {
            title: '单位类型',
            type: 'select',
            model: 'categoryId',
            placeholder: '单位类型.',
            option: []
          },
          {
            title: '单位',
            type: 'select',
            model: 'deptId',
            placeholder: '单位.',
            option: []
          }
        ],
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
          title: '用户名称',
          key: 'userName',
          showTooltip: true
        }, {
          title: '分数',
          key: 'grade',
          showTooltip: true
        }, {
          title: '所属单位',
          key: 'label',
          showTooltip: true
        }, {
          title: '答题时间',
          key: 'time',
          showTooltip: true
        }
        ]
      }
    }
  },
  async created () {
    try {
      this.loading = true
      let val = await this.$api.searchAllDepart({
        pageNo: 1,
        pageSize: 9999
      })
      this.category = val.list
      this.table.searchData[1].option = this.$_.cloneDeep(this.category)
      this.table.searchData[1].option.forEach(res => {
        res.value = res.id
      })
      let res = await this.$api.searchAllDept({
        pageNo: 1,
        isSchool: 0,
        pageSize: 9999
      })
      this.table.searchData[2].option = this.$_.cloneDeep(res.list)
      this.table.searchData[2].option.forEach(res => {
        res.value = res.id
      })
      this.loading = false
    } catch (e) {
      this.loading = false
    }
  },
  methods: {}
}
</script>

<style lang="sass">


</style>
