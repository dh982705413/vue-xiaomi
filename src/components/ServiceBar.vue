<template>
  <div class="service-bar">
    <ul class="container">
      <li v-for="item in serviceList" :key="item.name" class="service-item">
        <i :class="'iconfont ' + item.icon"></i>
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'service-bar',
  data() {
    return {
      serviceList: [
        { name: '预约维修服务', icon: 'icon-weixiu' },
        { name: '7天无理由退货', icon: 'icon-7tianwuliyoutuihuo' },
        { name: '15天免费换货', icon: 'icon-15tianwuliyoutuihuo' },
        { name: '满150包邮', icon: 'icon-tubiao_baoyou' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base';
.service-bar {
  height: 40px;
  line-height: 40px;
  .container {
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    font-size: 16px;
    color: #666666;
    .service-item {
      position: relative;
      &:not(:last-of-type):before {
        content: '|';
        color: #999999;
        position: absolute;
        right: -80px;
        top: 3px;
      }
      i {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>
