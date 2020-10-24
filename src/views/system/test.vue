<template lang="pug">
  .departInfo(v-loading="allLoadint")
    my-table(:table="table" ref="myTable")
      span(slot="ctrl-button")
        el-button(type="primary" @click="goAdd" size="mini") 添加考题
    el-drawer( title="单位信息"  :visible.sync="show" direction="rtl" :wrapperClosable="false")
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm")
        el-form-item(label="题目标题:" prop="title")
          el-input(type="textarea" v-model="ruleForm.title")
        el-form-item(label="题目类型:" prop="type")
          el-input-number.dd(v-model="ruleForm.grade" placeholder="分数" :min="1" :controls="false" :max="100")
        el-form-item(label="答案解析:" prop="parsing")
          el-input(v-model="ruleForm.parsing"  type="textarea" placeholder="答案解析")
        el-form-item(label="答案:" required)
          el-input.dd.ss(v-model="item.answer" :placeholder="`答案 ${index+1}`"  @change="inputChange" v-for="(item, index) in answerList" :key="index")
            template(slot="append")
              el-radio(v-model="radio" :label="index" :disabled="!item.answer") {{null}}
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
      radio: null,
      allLoadint: false,
      category: [],
      answerList: [
        {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }
      ],
      dept: [
        {
          label: '无上级单位',
          id: 0
        }
      ],
      ruleForm: {},
      rules: {
        title: [
          {required: true, message: '请输入考题', trigger: 'blur'}
        ],
        grade: [
          {required: true, message: '请输入分数', trigger: 'blur'}
        ]
      },
      table: {
        api: vm.$api.searchAllSubject,
        query: {
          keywords: null,
          id: JSON.parse(sessionStorage.getItem('user')).id
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
          title: '题目',
          key: 'title',
          showTooltip: true
        }, {
          title: '分数',
          key: 'grade',
          showTooltip: true
        }, {
          title: '题目解析',
          key: 'parsing',
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
      }
    }
  },
  async created () {
    try {

      this.allLoadint = false
    } catch (e) {
      this.allLoadint = false
    }
  },
  methods: {
    inputChange (val) {
      if (!val) {
        this.radio = null
      }
    },
    reSetFrom () {
      this.ruleForm = {}
      this.radio = null
      this.answerList = [
        {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }, {
          answer: null,
          isCurrect: 0
        }
      ]
    },
    async saveIt () {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            this.load = true
            let num = 0
            if (this.radio === null) {
              this.$message.error('请勾选正确答案')
              this.load = false
              return
            }
            for (let i of this.answerList) {
              if (i.answer) {
                num++
              }
            }
            if (num < 2) {
              this.$message.error('至少需要2个答案')
              this.load = false
              return
            }
            let answerList = this.$_.cloneDeep(this.answerList)
            answerList[this.radio].isCurrect = 1
            answerList = answerList.filter(res => {
              return res.answer
            })
            let obj = {
              subject: this.ruleForm,
              answerList: answerList
            }
            if (this.type === 'edit') {
              await this.$api.updateSubject(
                  obj
              )
            } else {
              await this.$api.insertSubject(
                  obj
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
      this.answerList = this.$_.cloneDeep(row.answerList)
      for (let i in this.answerList) {
        if (this.answerList[i].isCurrect === 1) {
          this.radio = Number(i)
          this.answerList[i].isCurrect = 0
        } else {
          this.answerList[i].isCurrect = 0
        }
      }
      let num  = 4 - this.answerList.length
      if (num > 0) {
        for (let i = 0; i < num ; i++) {
          this.answerList.push({
            answer: null,
            isCurrect: 0
          })
        }
      }
      this.type = 'edit'
    },
    doDelete (row) {
      let list = []
      list.push(row.id)
      this.$confirm('确定删除该考题?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$api.deleteSubject(list)
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
          .catch(_ => {
          })
    }
  }
}
</script>

<style lang="sass">
.departInfo
  .dd
    width: 180px !important

    .el-input
      width: 180px !important

    input
      width: 180px !important
</style>
