<template lang="pug">
  .sidebar
    .sidebar-img
      el-image(:src="logo")
    .sidebar-meun
      .sidebar-meun-item(v-for="(item, index) in router" :key="index" )
        el-tooltip(placement="right" )
          div(slot="content" class="siderIn")
            .siderIn-box(v-for="(i ,idx) in item.children" :key="idx" @click="goit(i.path)")
              p {{i.label}}
          template
            .sidebar-meun-p
              p {{item.label}}
</template>

<script>
export default {
  data () {
    return {
      logo: require('../../assets/nation.png'),
      router: []
    }
  },
  created () {
    this.router = JSON.parse(sessionStorage.getItem('router'))
    console.log(this.router)
  },
  methods: {
    goit (path) {
      this.$router.push({
        name: path
      })
    }
  }
}
</script>

<style lang='sass'>
    .el-tooltip__popper
      background-color: $primaryColor !important
    .siderIn-box
      &:hover
        p
          color: orange!important
      text-align: center
      width: 150px
      font-weight: 400
      font-size: 13px
      height: 50px
      line-height: 50px
      margin-bottom: 15px
      p
        cursor: pointer
    .sidebar
      background-color: $primaryColor
      min-height: 100vh

      &-img
        padding-top: 15px
        text-align: center
        img
          width: 150px
      &-meun
        &-p
          padding: 20px 0
          width: 100%
        margin-top: 10px
        color: #ffffff
        &-item
          text-align: center
          &:hover
            background-color: black
</style>
