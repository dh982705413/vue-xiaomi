<template>
  <div class="order-header">
    <div class="container w">
      <div class="nav-left">
        <div class="header-logo">
          <router-link to="/index"></router-link>
        </div>
        <div class="order-info">
          <h2>{{ title }}</h2>
          <span>
            <slot name="title"
              >温馨提示: 产品是否购买成功，以最终下单为准哦，请尽快结算</slot
            >
          </span>
        </div>
      </div>
      <div class="username">
        <a href="javascript:;">{{ username }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  computed: {
    ...mapState(['username'])
  },
  props: {
    title: {
      type: String,
      default: '我的购物车'
    }
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  border-bottom: 1px solid $colorE;
  .container {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-left {
      display: flex;
      .order-info {
        display: flex;
        align-items: center;
        h2 {
          margin: 0 20px;
        }
        span {
          transform: translateY(5px);
          color: $colorD;
        }
      }
    }
    .username {
      a {
        color: $colorB;
      }
    }
  }
}
</style>
