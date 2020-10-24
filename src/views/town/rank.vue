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
        api: vm.$api.deptAnswerSearch,
        query: {
          keywords: null,
          rank: 1,
          isSchool: 5,
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据单位名称查找.'
          }
        ],
        columns: [{
          title: '排名',
          key: 'number',
          showTooltip: true

        }, {
          title: '乡镇名称',
          key: 'label',
          showTooltip: true
        }, {
          title: '乡镇总分',
          key: 'deptAmount',
          showTooltip: true
        }, {
          title: '乡镇平均分',
          key: 'deptAvg',
          showTooltip: true
        }, {
          title: '答题人数',
          key: 'deptCount',
          showTooltip: true
        },{
          title: '98分以下人数',
          key: 'lessNinety',
          showTooltip: true
        },{
          title: '满分人数',
          key: 'fullGrade',
          showTooltip: true
        },
        ]
      }
    }
  },
  async created () {
    try {
      this.loading = true
      // this.category = await this.$api.searchAllDepart({
      //   pageNo: 1,
      //   pageSize: 9999
      // })
      // this.table.searchData[1].option = this.$_.cloneDeep(this.category)
      // this.table.searchData[1].option.forEach(res => {
      //   res.value = res.id
      // })
      // let res = await this.$api.searchAllDept({
      //   pageNo: 1,
      //   isSchool: 0,
      //   pageSize: 9999
      // })
      // this.table.searchData[2].option = this.$_.cloneDeep(res)
      // this.table.searchData[2].option.forEach(res => {
      //   res.value = res.id
      // })
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
