<template lang="pug">
  .departInfo(v-loading="allLoadint")
    my-table(:table="table" ref="myTable")
      span(slot="ctrl-button")
        el-button(type="primary" @click="goAdd" size="mini") 添加人员信息
    el-drawer( title="用户信息"  :visible.sync="show" direction="rtl" :wrapperClosable="false")
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm")
        el-form-item(label="用户姓名:" prop="name")
          el-input.dd(v-model="ruleForm.name" placeholder="用户姓名")
        el-form-item(label="用户账号:" prop="username")
          el-input.dd(v-model="ruleForm.username" placeholder="用户账号" :disabled="type === 'edit'")
        el-form-item(label="用户密码:" prop="password")
          el-input.dd(v-model="ruleForm.password" placeholder="用户密码")

      .departInfo(:style={marginTop: '10px', textAlign: 'center'})
        el-button(@click="show = false" type="primary" plain :loading="load") 取消
        el-button(@click="saveIt" type="primary" :loading="load") 确定
</template>

<script>
import MyTable from '@components/global/MyTable'
export default {
  name: 'info',
  components: {MyTable},
  data (vm) {
    return {
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
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      },
      table: {
        api: vm.$api.peopleSearch,
        query: {
          keywords: null,
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据关键字搜索.'
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
          title: '用户姓名',
          key: 'name',
          showTooltip: true
        }, {
          title: '用户账号',
          key: 'username',
          showTooltip: true
        }, {
          title: '操作',
          showTooltip: true,
          width: 50,
          key: 'purchaseOrderStatus',
          render (h, ctx) {
            if (ctx.row.id === 1) {
              return  h('div')
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
  async created () {
    // try {
    //   this.allLoadint = true
    //   // 类别列表
    //   this.category = await this.$api.searchAllDepart({
    //     pageNo: 1,
    //     pageSize: 9999
    //   })
    //   this.table.searchData[1].option = this.$_.cloneDeep(this.category)
    //   this.table.searchData[1].option.forEach(res => {
    //     res.value = res.id
    //   })
    //   // this.table.searchData[1].option = this.category
    //   this.getList()
    //   this.allLoadint = false
    // } catch (e) {
    //   this.allLoadint = false
    // }
  },
  methods: {
    // async getList () {
    //   this.dept = []
    //   this.dept.push(
    //       {
    //         label: '无上级单位',
    //         id: 0
    //       })
    //   let res = await this.$api.searchAllDept({
    //     pageNo: 1,
    //     isSchool: 0,
    //     pageSize: 9999
    //   })
    //   this.dept = this.dept.concat(res)
    // },
    reSetFrom () {
      this.ruleForm = {}
      this.$set(this.ruleForm, 'name', null)
      this.$set(this.ruleForm, 'username', null)
      this.$set(this.ruleForm, 'password', null)
    },
    async saveIt () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.load = true
            if (this.type === 'edit') {
              await this.$api.peopleupdateSystemUserr(
                  this.ruleForm
              )
            } else {
              await this.$api.peopleinsertSystemUser(
                  this.ruleForm
              )
            }
            this.reSetFrom()
            this.type === 'edit' ? this.$message.success('修改成功!') : this.$message.success('新增成功!')
            this.show = false
            this.$search(this.table)
            this.load = false
          } catch (e) {
            this.load = false
          }
        } else {
        }
      })
    },
    doEdit (row) {
      this.show = true
      this.ruleForm = this.$_.cloneDeep(row)
      this.type = 'edit'
    },
    doDelete (row) {
      let list = []
      list.push(row.id)
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$api.peopledeleteSystemUser(list)
        this.$message.success('删除成功!')
        this.$search(this.table)
      })
    },
    goAdd () {
      this.type = 'add'
      this.show = true
      this.reSetFrom()
    },
    handleClose (done) {
      if (this.type === 'edit') {
        done()
        return
      }
      this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
    }
  }
}
</script>

<style  lang="sass">
.departInfo

</style>
