<template lang="pug">
  svg(:class='svgClass' aria-hidden='true' @click="onClick")
    use(:xlink:href='iconName')
</template>

<script>
export default {
  description: '使用svg资源自定义图标',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    },
    svgClass () {
      return `yc-svg-icon svg-icon-${this.name}`
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="sass">
.yc-svg-icon
  $w: 1em
  width: $w
  height: $w
  vertical-align: -0.35em
  fill: currentColor
  overflow: hidden
</style>
