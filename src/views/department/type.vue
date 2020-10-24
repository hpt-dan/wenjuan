<template lang="pug">
    .departType
      my-table(:table="table" ref="myTable")
        span(slot="ctrl-button")
          el-button(type="primary" @click="goAdd" size="mini") 添加单位类型
</template>

<script>
import MyTable from '@components/global/MyTable'
export default {
  name: 'info',
  components: {MyTable},
  data (vm) {
    return {
      table: {
        api: vm.$api.searchAllDepart,
        query: {
          keywords: null
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
          title: '单位类型',
          key: 'label',
          showTooltip: true
        },{
          title: '操作',
          showTooltip: true,
          width: 50,
          key: 'purchaseOrderStatus',
          render(h, ctx) {
            if (ctx.row.id === 1) {
              return h('div', [])
            }
            return h('div', [
              h(
                  'i', {
                    style: {
                      color: '#2db7f5',
                      marginRight: '10px'
                    },
                    class: {
                      'el-icon-edit': true,
                      'table-operation': true
                    },
                    on: {
                      click: vm.doEdit.bind(this, ctx.row)
                    }
                  }
              ),
              h(
                  'i', {
                    style: {
                      color: '#f50'
                    },
                    class: {
                      'el-icon-delete': true,
                      'table-operation': true
                    },
                    on: {
                      click: vm.doDelete.bind(this, ctx.row)
                    }
                  }
              )
            ])
          }
        }
        ]
      }
    }
  },
  methods: {
    doEdit (row) {
      this.$prompt('请输入类型:', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.label
      }).then(async res => {
        await this.$api.updateDeptCategory({
          deptCategory: {
            id: row.id,
            label: res.value
          }
        })
        this.$message.success('修改成功!')
        this.$search(this.table)
      })
    },
    doDelete (row) {
      let list = []
      list.push(row.id)
      this.$confirm('确定删除该单位类型?','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=> {
        await this.$api.deleteDeptCategory(list)
        this.$message.success('删除成功!')
        this.$search(this.table)
      })
    },
    goAdd () {
      this.$prompt('请输入类型:', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async res => {
        await this.$api.addDept({
          deptCategory: {
            label: res.value
          }
        })
        this.$message.success('新增成功!')
        this.$search(this.table)
      })
    }
  }
}
</script>

<style  lang="sass">
    .departInfo

</style>
