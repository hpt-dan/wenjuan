<template lang="pug">
  #app.app
    div(v-if="!isLogin")
      sidebar.app-sidebar
      el-scrollbar.app-body
        v-header.app-body__header
        transition(mode="out-in", name="el-fade-in-linear")
          router-view.app-body__router
    div(v-else).view
      transition(mode="out-in", name="el-fade-in-linear")
        router-view.app-body__router
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$route.name === null || this.$route.name === 'Login'
    }
  }
}
</script>

<style lang="sass">
  .app
    width: 100%
    min-height: 100vh
    ::-webkit-scrollbar
      width: 8px
      height: 6px
      border: 0
      background-color: #fff
    //滚动条的滑块
    ::-webkit-scrollbar-thumb
      background-color: rgba(144,147,153,.3)
      border-radius: 5px
    ::-webkit-scrollbar-track
      display: none
    ::-webkit-scrollbar-track-piece
      display: none
    &-sidebar
      float: left
      width: $sidebarWidth
      /deep/.el-scrollbar__wrap
        overflow-x: hidden
    &-body
      float: left
      width: calc(100% - #{$sidebarWidth})
      height: 100vh
      /deep/.el-scrollbar__wrap
        overflow-x: hidden
      &__router
        margin-top: 10px
        background-color: #fff
        min-height: 100vh
        padding: $defaultGap
    .view
      overflow: auto
      position: relative
      width: 100%
      height: 100vh
</style>
