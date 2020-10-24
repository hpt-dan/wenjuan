<template>
  <!-- 右侧弹窗 -->
  <div>
    <transition name="el-fade-in"
                mode="out-in">
      <div class="mask"
           v-show="visible"
           @click="onMaskClick"></div>
    </transition>
    <transition name="slide"
                mode="out-in">
      <div :id="id"
           class="right-popup"
           v-show="visible">
        <el-scrollbar ref="scrollbar" class="right-popup__scrollbar">
          <div class="right-popup__title"
               v-if="title">{{title}}
          </div>
          <div class="right-popup__body">
            <slot/>
          </div>
        </el-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      },
      // 点击背景默认不关闭right-popup
      closeOnClickMask: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        loadingInstance: null
      }
    },
    model: {
      prop: 'visible',
      event: 'change'
    },
    methods: {
      close () {
        // 每次关闭把滚动条移动到顶部
        this.$refs.scrollbar.wrap.scrollTop = 0
        this.$emit('change', false)
      },
      onMaskClick () {
        this.$emit('mask-click')
        if (this.closeOnClickMask) this.$emit('change', false)
      }
    },
    watch: {
      loading: function (val) {
        if (val) {
          this.loadingInstance = this.$loading({
            target: '.right-popup',
            text: '数据加载中...'
          })
        } else {
          this.loadingInstance.close()
        }
      },
      visible: function (newVal, oldVal) {
        if (!newVal && newVal !== oldVal) {
          this.close()
        }
      }
    }
  }
</script>

<!--@formatter:off-->
<style lang='sass'>
  .mask
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .4)
    z-index: 1002
  .right-popup
    position: fixed
    right: 0
    top: 0
    width: 580px
    height: 100%
    background: #fff
    z-index: 1003
    // box-shadow: 0 0 5px rgba(0, 0, 0, .4)
    &__scrollbar
      height: 100vh
    &__title
      line-height: 60px
      text-align: center
      font-size: 18px
      font-weight: bold
      letter-spacing: 4px
      color: #fff
      background: #138BED
    &__body
      padding: 20px
    &__subtitle
      margin-bottom: 20px
      padding-bottom: 15px
      font-size: 15px
      color: #138BED
      border-bottom: 1px solid #ccc
</style>
