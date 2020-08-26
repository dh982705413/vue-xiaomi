<template>
  <transition name="slide">
    <div class="modal"
         v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span class="title">
            <slot name="title">
              {{ title }}
            </slot>
          </span>
          <a href="javascript:;"
             class="icon-close"
             @click="$emit('closedialog')"></a>
        </div>
        <div class="modal-body">
          <slot name="body">
            内容区域
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <a href="javascritp:;"
               class="btn"
               v-if="btnType === '1'"
               @click="$emit('submit')">{{ sureText }}</a>
            <a v-if="btnType === '2'"
               href="javascritp:;"
               class="btn btn-default"
               @click="$emit('closedialog')">{{ cancelText }}</a>
            <div class="btn-group"
                 v-if="btnType === '3'">
              <a href="javascritp:;"
                 class="btn"
                 @click="$emit('submit')">{{
                sureText
              }}</a>
              <a href="javascritp:;"
                 class="btn btn-default"
                 @click="$emit('closedialog')">{{ cancelText }}</a>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    // 弹框类型 小small 中middle 大large 表达 form
    modalType: {
      type: String,
      default: 'form'
    },
    title: {
      type: String,
      default: '标题'
    },
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.modal {
  @include position(fixed);
  z-index: 99;
  .mask {
    @include position(fixed);
    background-color: $colorI;
    opacity: 0.3;
  }
  .modal-dialog {
    @include position();
    width: 660px;
    height: auto;
    background-color: #ffffff;
    top: 40%;
    left: 50%;

    transform: translate(-50%, -50%);
    .modal-header {
      @include flex();
      height: 60px;
      background-color: $colorJ;
      padding: 0 25px;
      line-height: 60px;
      font-size: $fontI;
      .icon-close {
        width: 14px;
        height: 14px;
        background: url('/imgs/icon-close.png') no-repeat center;
        background-size: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.3);
        }
      }
    }
    .modal-body {
      padding: 42px 40px 54px;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: $colorJ;
    }
  }
}
</style>
