<template lang="pug">
  .breadcrumb
    span.breadcrumb__title 当前位置:
    span.breadcrumb__router(v-for="(t, i) in breadcrumb", :key="i", @click="go(t.value,t.name)") {{t.label}}
</template>

<script>
export default {
  data () {
    const vm = this
    return {
      breadcrumb: vm.$route.meta.breadcrumb
    }
  },
  watch: {
    '$route': {
      handler: function (val) {
        this.breadcrumb = val.meta.breadcrumb
      },
      immediate: true
    }
  },
  methods: {
    go (path, name) {
      if (!path) return
      if (path === -1) return this.$router.back()
      if (path === -2) {
        this.$router.push({ name })
      }
      this.$router.replace(path)
    }
  },
  mounted () {
    this.$bus.$on('update-breadcrumb', (breadcrumb) => {
      this.breadcrumb = breadcrumb
    })
  }
}
</script>

<style lang='sass'>
  .breadcrumb
    height: $breadcrumbHeight
    margin-bottom: $defaultGap
    &__title
      color: #4A4A4A
    &__router
      margin-left: 5px
      color: #9B9B9B
      cursor: pointer
      user-select: none
      &:after
        content: '\e6e0'
        font-family: element-icons, sans-serif !important
        display: inline-block
        margin-left: 5px
      &:last-child:after
        content: ''
</style>
