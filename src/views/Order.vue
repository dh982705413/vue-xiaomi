<template>
  <div>
    <order-header :title="orderInfo.title" :tip="orderInfo.tip"></order-header>
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
        {
          title: '我的购物车',
          path: '/cart',
          tip: '温馨提示: 产品是否购买成功，以最终下单为准哦，请尽快结算'
        },
        {
          title: '确认订单',
          path: '/order/confirm',
          tip: '请认真填写收货地址'
        },
        {
          title: '订单列表',
          path: '/order/list',
          tip: '请谨防钓鱼链接或诈骗电话,了解更多>'
        },
        {
          title: '支付订单',
          path: '/order/alipay',
          tip: '请谨防钓鱼链接或诈骗电话,了解更多'
        },
        {
          title: '支付订单',
          path: '/order/pay',
          tip: '请谨防钓鱼链接或诈骗电话,了解更多'
        }
      ]
    }
  },
  computed: {
    orderInfo() {
      return this.titleData.find(item => item.path === this.$route.path)
    }
  }
}
</script>

<style lang="scss" scoped></style>
