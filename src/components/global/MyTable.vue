<template lang="pug">
  div
    search-bar(
    :query='table.query',
    :search-data='table.searchData',
    @on-search-change='search(table)')
      // el-button(type="primary", slot="after") 新增
      span(slot="before")
        slot(name="ctrl-button-1")
      span(slot="after")
        slot(name="ctrl-button")
    pl-table(
    use-virtual,
    ref="tableList",
    style='width: 100%',
    :row-height="49",
    :data="table.data"
    :excess-rows="1"
    v-loading='table.loading',
    element-loading-text='数据加载中...',
    @selection-change="handleSelectionChange"
    :tree-props="{children: 'children'}"
    )
      pl-table-column(type="selection", width="50", v-if="table.columns && table.columns.some(t => t.type === 'selection')")
      pl-table-column(
      v-for="(column, idx) in table.columns.filter(t => t.type !== 'selection')",
      :key='idx',
      :type='column.type',
      :label='column.title',
      :width='column.width',
      :fixed='column.fixed',
      :align="column.align || 'left'",
      :show-overflow-tooltip='column.showTooltip')
        template(v-if="column.type !== 'selection'", slot-scope='scope')
          cell(
          v-if="column.render"
          :column='column',
          :row='scope.row',
          :index='scope.$index',
          :render='column.render')

          span(v-else)
            span(v-if="column.filter") {{$filters[column.filter](scope.row[column.key])}}
            span(v-if="column.enumType") {{$enums[column.enumType].getName(scope.row[column.key])}}
            span(v-if="!column.filter && !column.enumType") {{scope.row[column.key] ? scope.row[column.key] : (scope.row[column.key] === 0 ? '0' : '--')}}
          cell(v-else,
          :column='column',
          :row='scope.row',
          :index='scope.$index',
          :render='column.render')
      // table.table
        tbody
          tr
            th(v-for='(item, idx) in table.columns', :key='idx')
              | {{item.title}}
          tr(v-for='(item, dataIdx) in table.data', :key='dataIdx')
            td(v-for='(column, colIdx) in table.columns', :key='colIdx')
              span(v-if='!column.render') {{item[column.key]}}
              cell(v-else, :render='column.render')
    el-pagination.pagination(
    v-if="table.pagination"
    layout="sizes , slot,prev, pager, next, jumper",
    :total="table.pagination.total",
    :page-sizes="[10, 50, 100, 1000]"
    :current-page.sync="table.pagination.pageNo",
    @current-change="search(table)"
      @size-change="sizeChange")
      template()
        span(@click="sizeChange('all')").itShow 显示全部
</template>

<script>
import cell from './cell'
import lodash from '../../utils/lodash'

export default {
  components: {
    cell
  },
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableRef: null,
      dataLists: [],
    }
  },
  computed: {
    filterFiles () {
      let obj =  {}
      for (let i of this.table.columns) {
        obj[i.title] = i.key
      }
      return obj
    }
  },
  created () {
    this.$set(this.table, 'loading', false)
    if (!this.table.hidePagination) {
      this.$set(this.table, 'pagination', {
        pageNo: 1,
        total: 0
      })
    }
    this.refresh((data) => {
      this.$emit('search-end', data)
    })
    // this.initTableScroll()
  },
  methods: {
    getDATA (e) {
      this.$refs.tableList.reloadData([])
    },
    initTableScroll () {
      this.tableRef = this.$refs.tableList.bodyWrapper
      this.tableRef.addEventListener('mousewheel', (event) => {
        let wheel = event.deltaY
        // 滚动方向
        let down = wheel > 0
      })
    },
    sizeChange (val) {
      let res
      if (val === 'all') {
        res = 99999
      } else {
        res = val
      }
      this.table.pagination.pageSize = res
      this.table.pagination.pageNo = 1
      this.$nextTick(()=> {
        this.search(this.table)
      })
    },
    refresh (cb) {
      this.search(this.table, cb)
    },
    async search (table, cb) {
      if (table && table.api) {
        let query = lodash.cloneDeep(table.query) || {}
        if (!table.hidePagination) {
          query.pageNo = table.pagination.pageNo
          query.pageSize = table.pagination.pageSize || 10
        }
        table.loading = true
        try {
          let data = await table.api(query)
          if (data instanceof Array) {
            table.data = data
          } else {
            //this.$refs.tableList.reloadData(data.list)
            // this.$refs.tableList.data = data.list
            table.data = data.list
            table.pagination.total = data.total
          }
          cb && cb(table.data)


        } catch (e) { }
        table.loading = false
      }
    },
    handleSelectionChange (val) {
      this.$emit('on-selection-change', val)
    }
  }
}
</script>

<!--@formatter:off-->
<style lang='sass' scoped>
  @import "../../assets/sass/variables"
  .pagination
    margin: $primaryGap
    text-align: center
    .itShow
      cursor: pointer
</style>
