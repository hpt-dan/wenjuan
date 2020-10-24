<template lang="pug">
  .login
    p.login__title 平安安乡民意测评管理后台
    .form
      .title
        span.col
        .title-info
          p.text 用户登录
          p.text-assist 请使用用户账号进行登录
      el-form.transition-el-form.mt25(label-position='left', status-icon='', :model='submit', :rules='rules', ref='form', label-width='0px')
        el-form-item.input-box(prop='username')
          el-input(@keyup.enter.native='doLogin', v-model='submit.username', placeholder='请输入用户名')
        el-form-item.input-box(prop='password')
          el-input(type='password', v-model='submit.password', placeholder='请输入密码')
        el-form-item.input-box-short(prop='checkCode')
          el-input(@keyup.enter.native='doLogin', maxlength='4', v-model='submit.checkCode',  autocomplete="off" placeholder='请输入图片验证码')
          .img-code
            img(:src='verifyCodeUrl')
            .shadow
              i.icon.el-icon-refresh(@click='refreshCode()')
      el-button(type='primary', :loading='logging', @click='doLogin', style='width: 100%; margin-top: 20px')
        | {{logging ? '登录中...' : '登录'}}
</template>

<script>
  import findPwd from './FindPwd'

  export default {
    components: {
      findPwd
    },
    data () {
      return {
        submit: {
          username: null,
          password: null,
          checkCode: null,
          code: null
        },
        // 是否记住密码变量
        verifyCodeUrl: '',
        rules: {
          userName: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
          verifyCode: [{
            // min: 4,
            // max: 4,
            required: true,
            message: ' ',
            trigger: 'blur'
          }]
        },
        // 是否为找回密码页面
        region: [],
        dialogVisible: false,
        logging: false,
        register: {
          phone: null,
          verifyCode: null
        },
        getVerifyCodeAble: true,
        registering: false
      }
    },

    methods: {
      // 登录
      async doLogin () {
        try {
          this.logging = true
          let res = await this.$api.check(this.submit)
          sessionStorage.setItem('user', JSON.stringify(res[0]))
          sessionStorage.setItem('router', JSON.stringify(res[1]))
          this.logging = false
          this.$message({
            type: 'success',
              message: '登录成功'
            })
          this.$router.replace({
            name: 'home'
          })
        } catch (e) {
          this.logging = false
        }
        // 如果是本地或者测试环境 则使用模拟登录
        // if (location.host.includes('localhost')) {
        //   this.logging = true
        //   try {
        //     let userInfo = await this.$api.simulateLogin({
        //       userName: 'jieyuan',
        //       password: '123456',
        //       verifyCode: 'verifyCode'
        //     })
        //     this.$notify({
        //       title: '成功',
        //       message: '登录成功',
        //       type: 'success'
        //     })
        //     this.$router.replace({name: 'Introduction'})
        //     sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        //     // 根据权限判断登陆成功跳转页面
        //     let url = null
        //     if (!userInfo.menus[0].subElements) {
        //       url = userInfo.menus[0].path
        //     } else {
        //       url = userInfo.menus[0].subElements[0].path
        //     }
        //     this.$router.replace({path: url})
        //   } catch (e) {
        //     this.submit.verifyCode = null
        //     this.refreshCode()
        //   } finally {
        //     this.logging = false
        //   }
        // } else {
        //   this.$refs.form.validate(async (valid) => {
        //     if (!valid) return this.refreshCode()
        //     this.logging = true
        //     try {
        //       let userInfo = await this.$api.login({
        //         userName: this.submit.userName,
        //         password: this.submit.password,
        //         verifyCode: this.submit.verifyCode
        //       })
        //       this.$notify.success({
        //         title: '成功',
        //         message: '登录成功'
        //       })
        //       sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        //       // 根据权限判断登陆成功跳转页面
        //       let url = null
        //       if (!userInfo.menus[0].subElements) {
        //         url = userInfo.menus[0].path
        //       } else {
        //         url = userInfo.menus[0].subElements[0].path
        //       }
        //       this.$router.replace({path: url})
        //     } catch (e) {
        //       this.submit.verifyCode = null
        //       this.refreshCode()
        //     }
        //     this.logging = false
        //   })
        // }
      },
      async refreshCode () {
        // this.submit.verifyCode = null
        this.submit.code = Math.random().toFixed(4).toString().split('.')[1]
        // this.verifyCodeUrl = await this.$api.getCaptcha({})
        // this.verifyCodeUrl = `${this.$config.apiBaseUrl}/auth/getRandomCodeImg?${random}`
       // this.verifyCodeUrl = `http://106.52.244.188:8081/msg/img?code=${this.submit.code}`
        // this.verifyCodeUrl = `http://k2525t1722.zicp.vip:49252/msg/img?code=${this.submit.code}`
       // this.verifyCodeUrl = `http://tx.5ygw.com:8081/msg/img?code=${this.submit.code}`
        this.verifyCodeUrl = `http://192.168.254.112:8081/msg/img?code=${this.submit.code}`
       //  this.verifyCodeUrl = `http://39.99.221.134:10000/msg/img?code=${this.submit.code}`
      }
    },
    async created () {
      this.refreshCode()
    }
  }
</script>

<!--@formatter:off-->
<style lang="sass">
  .login
    position: absolute
    top: 0
    left:
    width: 100%
    height: 100vh
    background: url("~@img/login_bg.png") $primaryColor no-repeat left top / 100% 100%
    &__title
      width: 80%
      margin: 97px auto 0
      text-align: center
      line-height: 40px
      font-size: 28px
      color: white
      letter-spacing: 6px
    .form
      position: absolute
      top: 188px
      right: 10%
      width: 414px
      height: 440px
      padding: 15px 30px
      // transform: translateY(-50%)
      background: #fff
      border-top: 8px solid $primaryColor
      border-radius: 8px
      overflow: hidden
      box-shadow: 0 0 20px rgba(0, 0, 0, .2)
      .mt25
        margin-top: 25px
      .el-input
        width: 100% !important
        input
          height: 44px
          background: #ebf8ff
          border-radius: 5px
          padding-left: 20px
          border: none
      .title
        color: $black
        display: flex
        flex-direction: row
        .col
          width: 6px
          margin-top: 4px
          height: 30px
          border-radius: 2px
          background: $black
          display: inline-block
        &-info
          margin-left: 16px
          .text
            font-size: 28px
            letter-spacing: 6px
            line-height: 40px
            font-weight: 600
          .text-assist
            font-weight: 500
            color: $light-gray
            font-size: $fontSmall
      .btn-submit
        height: 44px
        line-height: 44px
        width: 100%
      .back-pwd
        color: $primaryColor
        float: right
        //@include btn-opacity-dark
        margin-top: 2px
        cursor: pointer
      .hint
        margin-top: 20px
        font-size: $fontSmall
        width: 100%
        color: $gray-shallow
        text-align: center
        a
          color: $primaryColor
          transition: all .2s
          &:hover
            opacity: .8

    .support
      position: fixed
      left: 0
      bottom: 20px
      width: 100%
      text-align: center
      color: $gray-shallow
      img
        height: 14px
        margin-right: 5px
        vertical-align: middle
      a
        color: $gray-shallow
        transition: all .2s
        &:hover
          text-decoration: underline

    .input-box-short
      width: 215px

    .img-code
      position: absolute
      width: 120px
      height: 48px
      top: -2px
      line-height: 48px
      margin-left: 230px
      &:hover
        .shadow
          opacity: 1
      img
        width: 100%
        height: 100%
      .shadow
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        font-size: 20px
        opacity: 0
        background: rgba(0, 0, 0, .3)
        color: #fff
        transition: all .3s
        text-align: center
        i
          cursor: pointer
</style>
