<template>
  <div class="checkprop">
    <div class="checkprop-left">
      <div class="title">基本信息</div>
      <div class="checkprop-left-content">
        <!-- <el-scrollbar style="height: 100%"> -->
        <el-form>
          <el-form-item
            v-for="(item, index) in checkpropList"
            :key="index"
            :label="item.label"
          >
            <span>{{item.value}}</span>
          </el-form-item>
          <slot></slot>
        </el-form>
        <!-- </el-scrollbar> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    checkpropList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    jumpOther () {
      this.$emit('on-jump')
    }
  }
}
</script>
<style lang="sass" scoped>
.checkprop
  min-height: calc(100vh - 244px)
  background-color: #fff
  // /deep/.el-scrollbar__wrap
  //   overflow-x: hidden
  .title
    color: #4a4a4a
    font-size: 18px
    line-height: 65px
    font-weight: 500
    height: 65px
  &-left
    padding: 0 30px
    height: 100%
    &-content
      height: calc(100% - 65px)
      width: 100%
      /deep/ .el-form-item
        background-color: #f8fafc
        margin-bottom: 0
        padding-left: 15px
        .el-form-item__label
          line-height: 50px
        .el-form-item__content
            margin-left: 35%
            line-height: 50px
        &:nth-child(2n)
          background-color: #fff
</style>
