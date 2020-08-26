<template>
  <div class="product-nav" :class="{ isFixed: isFixed }">
    <div class="wrapper w">
      <ul class="pro-title">
        <li>小米8 透明探索版</li>
        <li>|</li>
        <li>小米8</li>
        <li>|</li>
        <li>小米8 SE</li>
      </ul>
      <ul class="pro-params">
        <li>概述</li>
        <li>|</li>
        <li>参数</li>
        <li>|</li>
        <li>用户评价</li>
        <li>
          <slot name="buy">
            <button class="btn">立即购买</button>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-nav',
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.isFixed = scrollTop > 152
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin';
.product-nav {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background-color: $colorG;
  border: 1px solid #e5e5e5;
  z-index: 998;
  &.isFixed {
    position: fixed;
    top: 0;
    box-shadow: 0 5px 5px $colorE;
  }
  .wrapper {
    @include flex();
    .pro-title {
      display: flex;
      li:first-of-type {
        font-weight: bold;
        font-size: 14px;
      }
    }
    .pro-params {
      display: flex;
    }
    li:not(:last-of-type) {
      margin-right: 10px;
    }
  }
}
</style>
