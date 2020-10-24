<template lang="pug">
  .departType(v-loading="loading")
    my-table(:table="table" ref="myTable" @on-selection-change="tableChange")
      span(slot="ctrl-button")
        el-button(type="primary" @click="mutiDelete" size="mini" plain) 批量删除
        el-button(type="primary" @click="goExport" size="mini") 导出
    el-drawer( title="人员答题情况"  :visible.sync="show" direction="rtl" wrapperClosable :append-to-body="false" :size="'40%'")
      .box(v-for="(item, idx) in list" :key="idx")
        .departType-item( v-if="item.type === 'normal'")
          h3 {{item.qid}}.{{item.title}}
          el-radio-group(v-model="item.result" disabled)
            el-radio(v-for="(val, index) in item.answerList" :key="index" :label="val.wid" :class=" item.result === val.wid? 'active': ''")
              span {{wordList[index]}}:
              span(v-html="val.answer")
        .departType-item( v-if="item.type === 'ex'")
          h3 {{item.qid}}.{{item.title}}
          .departType-item-box(v-for="(val, index) in item.questionList")
            p {{(index+1)}}.{{val.title}}
            el-radio-group(v-model="val.result" disabled)
              el-radio(v-for="(res, ins) in val.answerList" :key="ins" :label="res.wid" :class=" val.result === res.wid? 'active': ''" )
                span {{wordList[ins]}}:
                span(v-html="res.answer")
        .departType-item( v-if="item.type === 'checkbox'")
          h3 {{item.qid}}.{{item.title}} (多选题)
          el-checkbox-group(v-model="item.result" disabled)
            el-checkbox(:label="val.wid" :key="index" v-for="(val, index) in item.answerList" :class=" item.result.includes(val.wid)?'active': ''") {{wordList[index]}}: {{val.answer}}

</template>

<script>
import MyTable from '@components/global/MyTable'
import mixins from '@utils/mixins'

export default {
  name: 'info',
  watch: {
    async 'table.query.categoryId' () {
      if (this.table.query.categoryId) {
        this.$openLayoutViewLoading()

        let res = await this.$api.searchAllDept({
          isSchool: 0,
          pageSize: 99999,
          pageNo: 1,
          categoryId: this.table.query.categoryId
        })
        this.$set(this.table.searchData[2], 'option' , res.list)
        this.table.searchData[2].option.forEach(res => {
          res.value = res.id
        })
        this.table.query.deptId = null
        this.$closeLayoutViewLoading()
      } else {
        this.$openLayoutViewLoading()

        let res = await this.$api.searchAllDept({
          isSchool: 0,
          pageSize: 99999,
          pageNo: 1
        })
        this.$set(this.table.searchData[2], 'option' , res.list)
        this.table.searchData[2].option.forEach(res => {
          res.value = res.id
        })
        this.$closeLayoutViewLoading()
        this.table.query.deptId = null
      }
    },
    async 'table.query.deptId' () {
      if (this.table.query.deptId) {
        this.$openLayoutViewLoading()

        let js = await this.$api.searchClassAndTown({
          parentId: this.table.query.deptId
        })
        this.table.searchData[3].option = js
        this.table.searchData[3].option.forEach(res => {
          res.value = res.id
        })
        //this.table.query.deptId = null
        this.table.query.classTownId = null

        this.$closeLayoutViewLoading()
      } else {
        this.$openLayoutViewLoading()

        let js = await this.$api.searchClassAndTown({
          parentId: this.table.query.deptId
        })
        this.table.searchData[3].option = js
        this.table.searchData[3].option.forEach(res => {
          res.value = res.id
        })
        this.$closeLayoutViewLoading()
        // this.table.query.deptId = null
        this.table.query.classTownId = null
      }
    },
  },
  components: {MyTable},
  data (vm) {
    return {
      loading: false,
      wordList: ['A','B','C','D','E','F','G','H','I','J','K','M','L','N'],
      table: {
        api: vm.$api.searchAllUser,
        useVir: true,
        query: {
          keywords: null,
          deptId: null,
          classTownId: null,
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据关键字搜索.'
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
            placeholder: '根据单位.',
            option: []
          }, {
            title: '下级单位',
            type: 'select',
            model: 'classTownId',
            placeholder: '根据下级单位.',
            option: []
          },
        ],
        columns: [
            {
          type: 'selection',
        }, {
          title: '序号',
          key: 'userName',
          showTooltip: true,
          render (h, ctx) {
            return h('div', [
              h('span', {}, ctx.index + 1)
            ])
          }
        }, {
          title: '用户姓名',
          key: 'userName',
          showTooltip: true,
          render(h, ctx) {
            return h('div', [
              h(
                  'el-link', {
                    attrs: {
                      underline: false,
                      type: 'primary'
                    },
                    on: {
                      click: vm.showAnswer.bind(this, ctx.row)
                    },
                  }, ctx.row.userName
              )
            ])
          }
        },{
          title: '单位',
          key: 'label',
          showTooltip: true
        }, {
          title: '总分',
          key: 'grade',
          showTooltip: true
        }, {
          title: '电话',
          key: 'phone',
          showTooltip: true
        },
          {
            title: '答题时间',
            key: 'time',
            showTooltip: true
          },{
            title: '删除',
            showTooltip: true,
            width: 150,
            key: 'purchaseOrderStatus',
            render(h, ctx) {
              return h('div', [
                h(
                    'i', {
                      style: {
                        color: '#2db7f5',
                        marginRight: '10px'
                      },
                      class: {
                        'el-icon-delete': true,
                        'table-operation': true
                      },
                      on: {
                        click: vm.doEdit.bind(this, ctx.row)
                      }
                    }
                )
              ])
            }
          }
        ]
      },
      show: false,
      list: [],
      deleteList: []
    }
  },
  async created () {
    try {
      this.loading = true
      let val = await this.$api.searchAllDepart({
        pageNo: 1,
        pageSize: 9999
      })
      this.table.searchData[1].option = this.$_.cloneDeep(val.list)
      this.table.searchData[1].option.forEach(res => {
        res.value = res.id
      })
      let res = await this.$api.searchAllDept({
        isSchool: 0,
        pageSize: 99999,
        pageNo: 1
      })
      this.table.searchData[2].option = res.list
      this.table.searchData[2].option.forEach(res => {
        res.value = res.id
      })
      let js = await this.$api.searchClassAndTown({

      })
      this.table.searchData[3].option = js
      this.table.searchData[3].option.forEach(res => {
        res.value = res.id
      })
      this.loading = false
      if (this.$route.query.id) {
        this.table.query.deptId = this.$route.query.id
        this.$search(this.table)
      }
      if (this.$route.query.classTownId) {
        this.table.query.classTownId = this.$route.query.classTownId
        // this.$refs.myTable.getDATA()
        this.$search(this.table)
      }
    } catch (e) {
      this.loading = false
    }
  },
  methods: {
    mutiDelete () {
      this.$confirm(`确定批量清除答题情况?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // let list = []
        // list = this.deleteList.map(res => {
        //   return res.id
        // })
        await this.$api.clearUserBatch(this.deleteList)
        this.$message.success('清除成功!')
        this.$search(this.table)
      })
    },
    tableChange (val) {
      this.deleteList = this.$_.cloneDeep(val)
    },
    async goExport () {
      this.$export('user/excel', this.table)
    },
    doEdit(row) {
      this.$confirm(`确定清除${row.userName}的答题情况?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$api.clearUse({
          id: row.id
        })
        this.$message.success('清除成功!')
        this.$search(this.table)
      })
    },
    async showAnswer(row) {
      let bbs
      bbs = await this.$api.searchUser({
        id: row.id
      })
      this.show = true
      this.list = JSON.parse(bbs.extra).concat(JSON.parse(bbs.answer))
    },
  }
}
</script>

<style lang="sass">
  .departType
    /deep/.active
      span
        color: $primaryColor !important
    /deep/.el-radio-group
      width: 100%
    /deep/.el-radio
      margin: 5px
    /deep/.el-drawer
      min-height: 100vh
      overflow-y: auto
    /deep/.box
      width: 100%
      margin-bottom: 50px
      padding-left: 40px
</style>
