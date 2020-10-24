<template lang="pug">
  .home

</template>

<script>
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  created () {
    this.$router.push({
      name: 'answerStatus'
    })
  },
  methods: {

  }
}
</script>

<style  lang="sass">
  .home
    // background: url("~@img/login_bg.png") $primaryColor no-repeat left top / 100% 100%
    width: 100%
    height: 100vh
</style>
