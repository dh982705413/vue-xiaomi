<template>
  <div>
    <order-header :title="title"></order-header>
    <transition name="el-fade-in-linear">
      <router-view :key="$route.path" />
    </transition>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter'
import ServiceBar from '@/components/ServiceBar'
export default {
  name: 'order',
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      titleData: [
        { title: '我的购物车', path: '/cart' },
        { title: '确认订单', path: '/order/confirm' },
        { title: '订单列表', path: '/order/list' },
        { title: '支付订单', path: '/order/alipay' },
        { title: '支付订单', path: '/order/pay' }
      ]
    }
  },
  computed: {
    title() {
      return this.titleData.find(item => item.path === this.$route.path).title
    }
  }
}
</script>

<style lang="scss" scoped></style>
