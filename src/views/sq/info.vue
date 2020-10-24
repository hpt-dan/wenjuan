<template lang="pug">
  .departInfo(v-loading="allLoadint")
    my-table(:table="table" ref="myTable")
      span(slot="ctrl-button")
        el-button(type="primary" @click="goAdd" size="mini") 添加社区信息
    el-drawer( title="社区信息"  :visible.sync="show" direction="rtl" :wrapperClosable="false")
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm")
        // el-form-item(label="所属系统:" prop="categoryId" )
          el-select(v-model="ruleForm.categoryId" placeholder="所属系统" disabled)
            el-option(v-for="(item ,index) in category" :key="index" :value="item.id" :label="item.label")
        el-form-item(label="所属乡镇:" prop="parentId")
          el-select(v-model="ruleForm.parentId " placeholder="所属乡镇")
            el-option(v-for="(item ,index) in dept" :key="index" :value="item.id" :label="item.label")
        el-form-item(label="社区名称:" prop="label")
          el-input.dd(v-model="ruleForm.label" placeholder="社区名称")
        //el-form-item(label="单位类型:" prop="type")
          el-input.dd(v-model="ruleForm.type" placeholder="单位类型")
        el-form-item(label="社区人数:" prop="num")
          el-input-number.dd(v-model="ruleForm.num" placeholder="社区人数" :min="1" :controls="false" :max="999999")
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
        categoryId: [
          { required: true, message: '请选择所属系统', trigger: 'change' }
        ],
        parentId: [
          { required: true, message: '请选择所属学校', trigger: 'change' }
        ],
        label: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
        ]
      },
      table: {
        api: vm.$api.searchAllDept,
        query: {
          keywords: null,
          isSchool: 6,
          categoryId: null
        },
        searchData: [
          {
            type: 'input',
            model: 'keywords',
            placeholder: '根据关键字搜索.'
          },
          {
            title: '乡镇',
            type: 'select',
            model: 'lowId',
            placeholder: '根据乡镇查找.',
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
          title: '社区名称',
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
          title: '社区人数',
          key: 'num',
          showTooltip: true
        }, {
          title: '所属乡镇',
          key: 'parentLabel',
          showTooltip: true
        }, {
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
      },
      id: null
    }
  },
  async created () {
    try {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
      this.allLoadint = true
      // 类别列表
      let res = await this.$api.searchAllDepart({
        pageNo: 1,
        pageSize: 9999
      })
      this.category = res.list
      // this.table.searchData[1].option = this.$_.cloneDeep(this.category)
      // this.table.searchData[1].option.forEach(res => {
      //   res.value = res.id
      // })
      // this.table.searchData[1].option = this.category
      await this.getList()
      this.table.searchData[1].option = this.$_.cloneDeep(this.dept)
      this.table.searchData[1].option.forEach(res => {
        res.value = res.id
      })
      // this.ruleForm.parentId = this.id
      this.table.query.lowId = this.id
      this.$search(this.table)
      this.allLoadint = false
    } catch (e) {
      this.allLoadint = false
    }
  },
  methods: {
    goSchool (row) {
      this.$router.push({
        name: 'peopleStatus',
        query: {
          classTownId: row.id
        }
      })
    },
    async getList () {
      this.dept = []
      let res = await this.$api.searchAllDept({
        pageNo: 1,
        isSchool: 5,
        pageSize: 9999
      })
      this.dept = res.list
    },
    reSetFrom () {
      this.ruleForm = {}
      this.$set(this.ruleForm, 'parentId', null)
      this.$set(this.ruleForm, 'label', '')
      this.$set(this.ruleForm, 'type', '')
      this.$set(this.ruleForm, 'num', 0)
      this.$set(this.ruleForm, 'categoryId', 8)
    },
    async saveIt () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.load = true
            this.ruleForm.level = 2
            this.ruleForm.isSchool = 6
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
            if (this.type === 'add') {
              this.getList()
            }
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
      this.$confirm('确定删除该班级?', '提示', {
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
