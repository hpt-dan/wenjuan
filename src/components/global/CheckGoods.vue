<template>
  <div class="checkgoods">
    <div class="checkgoods-right">
      <div class="title">{{title}}</div>
      <el-form>
        <el-form-item v-for="(item,index) in goodsList"
                      :key="index">
          <div class="goods-item"
               :style="{backgroundImage: 'url(' + bgpic + ')' }">
            <div class="goods-itam-left">
              <div class="pic"
                   :style="{backgroundImage: 'url(' + item.imgPath + ')'}"></div>
              <div class="goods-detail">
                <h3>{{item.name}}</h3>
                <span>销售数量: {{item.num}}个</span>
                <span v-if="item.amount || item.amount == 0">单价: ¥{{item.amount}}</span>
              </div>
            </div>
            <a @click="showDialog(item.id)">详情</a>
          </div>
        </el-form-item>
        <div v-if="aggregateAmount"
             class="aggregateAmount">合计: ¥{{aggregateAmount}} 元</div>
        <slot></slot>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    goodsList: {
      type: Array,
      default: () => []
    },
    aggregateAmount: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => '商品详情'
    }
  },
  data () {
    return {
      bgpic: require('../../assets/images/item.png')
    }
  },
  methods: {
    showDialog (id) {
      this.$emit('on-click', id)
    }
  }
}
</script>

<style lang="sass" scoped>
.checkgoods
    min-height: calc(100vh - 244px)
    background-color: #fff
    &-right
        flex: 1
        padding-right: 30px
        .aggregateAmount
          float: right
        .title
            color: #4a4a4a
            font-size: 18px
            line-height: 65px
            font-weight: 500
            height: 65px
        .el-form-item
            margin-bottom: 18px
            &__content
                .goods-item
                    height: 120px
                    border-radius: 8px
                    border-left: 8px solid #138bed
                    box-shadow: 0px 0px 8px 0px rgba(229,229,229,0.9)
                    display: flex
                    align-items: center
                    justify-content: space-between
                    background: no-repeat center
                    background-size: cover
                    .goods-itam-left
                      display: flex
                      .pic
                        width: 84px
                        height: 84px
                        margin-left: 24px
                        background: no-repeat center
                        background-size: cover
                    .goods-detail
                        margin-left: 18px
                        line-height: initial
                        font-size: 12px
                        display: flex
                        flex-direction: column
                        h3
                          font-weight: 700
                          margin-bottom: 7px
                          font-size: 16px
                        span
                          color: #9b9b9b
                    a
                      font-size: 16px
                      font-weight: 700
                      color: #138bed
                      margin-right: 14px
                      cursor: pointer
</style>
