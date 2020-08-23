<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">邓浩主页</a>
      <a href="javascript:;">Vue全栈开发</a>
      <a href="javascript:;">React全家桶</a>
      <a href="javascript:;">微信支付专项课程 (H5+小程序+Node+Mongo)</a>
    </div>
    <div class="copyright">
      Copyright @2019 <span class="domain">mi.future.com All</span> Rigths
      Resopnse
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: $colorB;
  font-size: $fontI;
  color: $colorD;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    margin-bottom: 10px;
    a {
      color: $colorD;
      position: relative;
      margin-right: 16px;
      &:not(:last-of-type)::before {
        content: '|';
        position: absolute;
        right: -10px;
        top: 0;
      }
    }
  }
  .copyright {
    .domain {
      color: $colorA;
    }
  }
}
</style>
