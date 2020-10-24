<template lang="pug">
  .departInfo(v-loading="allLoadint")
    my-table(:table="table" ref="myTable")
      span(slot="ctrl-button")
        el-button(type="primary" @click="goExport" size="mini") 导出
      span(slot="ctrl-button")
        el-button(type="primary" @click="goAdd" size="mini") 添加学校
    el-drawer( title="学校信息"  :visible.sync="show" direction="rtl" :wrapperClosable="false")
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm")
        el-form-item(label="所属系统:" prop="categoryId")
          el-select(v-model="ruleForm.categoryId" placeholder="所属系统" disabled)
            el-option(v-for="(item ,index) in category" :key="index" :value="item.id" :label="item.label")
        // el-form-item(label="所属单位:" prop="parentId")
          el-select(v-model="ruleForm.parentId " placeholder="所属单位")
            el-option(v-for="(item ,index) in dept" :key="index" :value="item.id" :label="item.label")
        el-form-item(label="学校名称:" prop="label")
          el-input.dd(v-model="ruleForm.label" placeholder="学校名称")
        el-form-item(label="学校类型:" prop="type")
          el-input.dd(v-model="ruleForm.type" placeholder="学校类型")
        el-form-item(label="学校人数:" prop="num")
          el-input-number.dd(v-model="ruleForm.num" placeholder="学校人数" :min="1" :controls="false" :max="999999")
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
        categoryId: 1,
        parentId: 0,
        num: 0
      },
      rules: {
        categoryId: [
          { required: true, message: '请选择所属系统', trigger: 'change' }
        ],
        label: [
          { required: true, message: '请输入学校名称', trigger: 'blur' }
        ]
      },
      table: {
        api: vm.$api.searchAllDept,
        query: {
          keywords: null,
          isSchool: 1
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
          title: '学校名称',
          key: 'label',
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
                      click: vm.goSchool.bind(this, ctx.row)
                    },
                  }, ctx.row.label
              )
            ])
          }
        }, {
          title: '学校人数',
          key: 'num',
          showTooltip: true
        }, {
          title: '学校类型',
          key: 'type',
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
        },{
          title: '操作',
          showTooltip: true,
          width: 50,
          key: 'purchaseOrderStatus',
          render (h, ctx) {

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
    try {
      this.allLoadint = true
      // 类别列表
      let res= await this.$api.searchAllDepart({
        pageNo: 1,
        pageSize: 9999
      })
      this.category = res.list

      // let res = await this.$api.searchAllDept({
      //   pageNo: 1,
      //   pageSize: 9999
      // })
      // this.dept = this.dept.concat(res)
      this.allLoadint = false
    } catch (e) {
      this.allLoadint = false
    }
  },
  methods: {
    goSchool (row) {
      this.$router.push({
        name: 'classInfo',
        query: {
          id: row.id
        }
      })
    },
    reSetFrom () {
      this.ruleForm = {}
      this.$set(this.ruleForm, 'parentId', 0)
      this.$set(this.ruleForm, 'label', '')
      this.$set(this.ruleForm, 'type', '')
      this.$set(this.ruleForm, 'num', 0)
      this.$set(this.ruleForm, 'categoryId', 1)
    },
    async saveIt () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.load = true
            if (this.ruleForm.parentId === 0) {
              this.ruleForm.level = 1
            } else {
              this.ruleForm.level = 2
            }
            this.ruleForm.isSchool = 1
            if (this.type === 'edit') {
              await this.$api.updateDeptDept({
                dept: this.ruleForm
              })
            } else {
              await this.$api.insertDept({
                dept: this.ruleForm
              })
            }
            this.reSetFrom()
            this.type === 'edit' ? this.$message.success('修改成功!') : this.$message.success('新增成功!')
            // if (this.type === 'edit') {
            //   this.show = false
            // }
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
    async goExport () {
      this.$export('dept/excel', this.table)
    },
    doEdit (row) {
      this.show = true
      this.ruleForm = this.$_.cloneDeep(row)
      this.type = 'edit'
    },
    doDelete (row) {
      let list = []
      list.push(row.id)
      this.$confirm('确定删除该学校?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$api.deleteDept(list)
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
  .dd
    width: 180px !important
    .el-input
      width: 180px !important
    input
      width: 180px !important
</style>
