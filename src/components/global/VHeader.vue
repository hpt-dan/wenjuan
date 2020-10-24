<template lang="pug">
  .header
    // img.header__logo(src="@img/logo.png")
    span.header__title 平安安乡民意测评管理后台
    .header-out
      el-button(type="primary" @click="logOut" size="mini") 退出
    //span.el-icon-info.header__icon()
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        dialogVisible: false
      }
    },
    methods: {
      logOut () {
        this.$router.replace({
          name: 'Login'
        })
      },
      goOperatingRecord () {
        this.$router.push({name: 'OperatingRecord'})
      },
      goHelpManual () {
        this.$router.push({name: 'HelpManual'})
      }
    }
  }
</script>

<!--@formatter:off-->
<style lang='sass'>
  .header
    width: 100%
    height: $headerHeight
    padding: 0 $defaultGap
    font-size: $fontLarge + 2px
    background: #fff
    position: relative
    &-out
      position: absolute
      top: 10px
      right: 30px
    .right
      img
        margin-top: 20px
        width: 30px

      img:hover
        cursor: pointer

    &__logo
      width: 220px
      height: 33px
      float: left
      margin-right: 6px
      margin-top: 14px

    &__title
      line-height: $headerHeight
      font-weight: bold
      color: $header-color
      letter-spacing: 2px

    &__icon
      float: right
      line-height: $headerHeight
      text-align: center
      font-size: $fontLarger
      color: $primaryColor
      cursor: pointer
</style>
