<template>
  <div
    class="search-box"
    v-if="!$_.isEmpty(searchData)"
  >
    <slot name="before" />
    <div
      class="form"
      v-for="(item,idx) in searchDataIsVisible"
      :key="idx"
    >
      <div
        v-if="item.type === 'select'"
        class="select"
      >
        <span class="text">{{item.title}}</span>
        <el-select
          v-model="query[item.model]"
          :style="{'width': item.width}"
          filterable
          clearable
          @change="emitSearchChange"
        >
          <el-option
            v-for="i in (item.enumType ? $enums[item.enumType].list : item.option)"
            :label="i.label"
            :value="i.value"
            :key="i.value"
          />
        </el-select>
      </div>
      <div
        v-if="item.type === 'cascader'"
        class="cascader"
      >
        <span class="text">{{item.title}}</span>
        <el-cascader
          :style="{'width': item.width}"
          @change="(value) => cascaderChange(value,item)"
          v-model="item.model"
          :options="item.option"
          change-on-select
        />
      </div>
      <div
        v-if="item.type === 'dateSection'"
        class="date-section"
      >
        <span class="text">{{item.title}}</span>
        <el-date-picker
          class="date input"
          v-model="date"
          type="daterange"
          align="right"
          unlink-panels
          @change="(value) => dateChange(value,item)"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <div
        v-if="item.type === 'date'"
        class="date"
      >
        <span class="text">{{item.title}}</span>
        <el-date-picker
          v-model="item.initialDate"
          :format="item.dateType === 'month' ? 'yyyy年MM月': 'yyyy-MM-dd'"
          class="date"
          :type="item.dateType"
          @change="(value) => dateSingeChange(value,item)"
          placeholder="选择时间"
        />
      </div>
      <div
        v-if="item.type === 'input'"
        class="input"
      >
        <span class="text">关键字</span>
        <el-input
          @keyup.enter.native="emitSearchChange"
          v-model="query.keywords"
          :placeholder="item.placeholder"
        >
          <el-button
            @click="emitSearchChange"
            slot="append"
            icon="el-icon-search"
          ></el-button>
          <!--<i @click="$search(table)" slot="suffix" class="el-input__icon el-icon-search"></i>-->
        </el-input>
      </div>
    </div>
    <span class="ctrl-btn">
      <slot name="after" />
    </span>
  </div>

</template>

<script>
export default {
  props: {
    searchData: {
      type: Array,
      default () {
        return []
      }
    },
    query: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    searchDataIsVisible () {
      return this.searchData.filter(t => !t.hide)
    }
  },
  data () {
    return {
      // 多选日期
      date: [null, null],
      pickerOptions: {
        shortcuts: [{
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 1)))
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 3)))
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(new Date(new Date().setMonth(new Date().getMonth() - 6)))
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    emitSearchChange () {
      this.$emit('on-search-change')
    },
    onSelectClear (model) {
      this.query[model] = null
      // this.emitSearchChange()
    },
    // cascader 值改变的时候
    cascaderChange (val, item) {
      if (val.length) {
        this.query[item.modelName[0]] = val[0]
        this.query[item.modelName[1]] = val[1]
      } else {
        this.query[item.modelName[0]] = null
        this.query[item.modelName[1]] = null
      }
      this.emitSearchChange()
    },
    // 日期选择控件切换的回调
    dateChange (val, item) {
      if (val === null) {
        this.query[item.modelName[0]] = this.query[item.modelName[1]] = null
      } else {
        this.query[item.modelName[0]] = this.$dayjs(val[0]).format('YYYY-MM-DD 00:00:00')
        this.query[item.modelName[1]] = this.$dayjs(val[1]).format('YYYY-MM-DD 23:59:59')
      }
      this.emitSearchChange()
    },
    // 日期单选控件切换的回调
    dateSingeChange (val, item) {
      this.query[item.model] = this.$dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      this.emitSearchChange()
    }
  },
  mounted () {
    for (let i = 0; i < this.searchData.length; i++) {
      if (this.searchData[i].type === 'dateSection') {
        this.date = [this.searchData[i].startDate, this.searchData[i].endDate]
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .search-box
    padding: 0 0 20px 0
    .ctrl-btn
      float: right
      display: inline-block
      margin-top: 33px
    .item
      margin-top: $primaryGap
    .text
      display: block
      margin-left: 5px
      margin-bottom: 5px
      font-size: $font-small
      font-weight: bold
      color: #666
    .form
      display: inline-block
      margin-right: 10px
      margin-top: $primaryGap
      vertical-align: top
    .date
      width: 240px
    .el-select
      width: 200px
      display: block
    .el-cascader
      width: 200px
      display: block
    .input
      width: 240px
</style>
