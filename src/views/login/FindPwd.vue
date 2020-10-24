<template lang="pug">
  .find-pwd
    el-form.mt25(label-position='left', status-icon='', :model='login.query', :rules='rules', ref='form', label-width='0px')
      el-form-item.input-box(prop='phone')
        el-input(@keyup.enter.native='loginFun()', v-model='login.query.phone', placeholder='登录手机号')
      el-form-item.input-box(prop='verifyCode')
        el-input(v-model='login.query.verifyCode', placeholder='输入验证码')
          el-button.hand(@click='getCode', slot='append') {{countdown}}
      el-form-item.input-box(prop='newPassword')
        el-input(type='password', v-model='login.query.newPassword', placeholder='新密码')
      el-form-item.input-box(prop='confirmPassword')
        el-input(type='password', v-model='login.query.confirmPassword', placeholder='确认密码')
    span.text(@click="$emit('update:status', false)")
      | 已有账号，立即
      span.main-c 登录
    // <div class="btn-submit" @click="submitUser">确认</div>
    el-button(type='primary', @click='submitUser', style='width: 100%; margin-top: 15px') 确认
</template>
<script>
export default {
  props: ['status'],
  data () {
    const validatePass = (rule, value, callback) => {
      if (!this.login.query.newPassword) {
        callback(new Error())
      } else if (this.login.query.newPassword !== this.login.query.confirmPassword) {
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      login: {
        url: '/auth/login.do',
        el: '.btn-submit',
        noText: true,
        query: {
          phone: null,
          newPassword: null,
          confirmPassword: null,
          verifyCode: null
        }
      },
      rules: {
        phone: [
          { min: 11, max: 11, required: true, message: ' ', trigger: 'blur' }
        ],
        newPassword: [
          { min: 6, max: 18, required: true, message: ' ', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        verifyCode: [
          { min: 6, max: 6, required: true, message: ' ', trigger: 'blur' }
        ]
      },
      countdown: '获取验证码'
    }
  },
  methods: {
    // 获取验证码
    async getCode () {
      let status = true
      if (!status) return
      if (!this.login.query.phone) {
        this.$message.warning('请输入手机号码')
        return
      }
      if (!(/^[1][0-9][0-9]{9}$/.test(this.login.query.phone))) {
        this.$message.warning('请输入正确手机号码')
        return
      }
      await this.$api.sendVerifyCode({
        phone: this.login.query.phone,
        verifyType: 'FOGET_PASS_WORD'
      })
      this.$notify.success({
        title: '成功',
        message: '验证码发送成功'
      })
      status = false
      if (typeof this.countdown === 'number') {
        return
      }
      this.countdown = 60
      let timer = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(timer)
          this.countdown = '获取验证码'
        }
      }, 1000)
    },
    // 提交
    async submitUser () {
      await this.$refs.form.validate()
      if (typeof this.countdown !== 'number') {
        this.$message.warning('请先获取验证码')
        return
      }
      await this.$api.forgetPassWord(this.login.query)
      this.$emit('update:status', false)
    }
  }
}
</script>
<style lang="sass" scoped>
  /deep/ .el-form-item__error
    display: none
  .find-pwd
    position: absolute
    z-index: 10
    margin-top: -40px
    margin-left: -30px
    width: 414px
    height: 404px
    padding: 30px
    .mt25
      margin-top: 25px
    .text
      float: right
      color: $blue
      margin-top: -7px
      margin-right: 5px
      margin-bottom: 2px
      cursor: pointer
      .main-c
        cursor: pointer
        //@include btn-opacity
    .el-input
      /deep/ input
        height: 40px
        background: #ebf8ff
        border-radius: 5px
        padding-left: 20px
        border: none
    .btn-submit
      height: 44px
      line-height: 44px
      width: 100%
    /deep/ .el-input-group__append
      width: 114px
      text-align: center
      background: $blue
      border-color: $blue
      color: #fff
      cursor: pointer
      opacity: 1
      transition: all .3s
      //@include btn-opacity()
</style>
