<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">IoT</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">金融</a>
          <a href="javascript:;">有品</a>
          <a href="javascript:;">小爱开放平台</a>
          <a href="javascript:;">企业团购</a>
          <a href="javascript:;">资质证照</a>
          <a href="javascript:;">协议规则</a>
          <a href="javascript:;">下载app</a>
          <a href="javascript:;">智能生活</a>
          <a href="javascript:;">Select Location</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;">登录</a>
          <a href="javascript:;">注册</a>
          <a href="javascript:;">消息通知</a>
          <div href="javascript:;" class="my-cart">
            <i class="iconfont icon-cart"></i>
            购物车(0)
          </div>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <router-link to="/index"></router-link>
        </div>
        <div class="header-menu">
          <div
            class="item-menu"
            v-for="(item, index) in navList"
            :key="item"
            :class="{ hide: index === 0 }"
          >
            <span>{{ item }}</span>
            <div class="children">
              <ul class="product-list">
                <li
                  class="product"
                  v-for="pro in showProduct"
                  :key="pro.id"
                  @click="goDetail(pro.id)"
                >
                  <img :alt="pro.subtitle" :src="pro.imgUrl" />
                  <span class="pro-name">
                    {{ pro.name.split(' ')[0] }}
                  </span>
                  <span class="pro-price"> {{ pro.price }}元起 </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" placeholder="电视" />
            <button href="javascript:;">
              <i class="iconfont icon-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  created() {
    this.getProductList()
  },
  data() {
    return {
      productList: [],
      navList: [
        '全部商品分类',
        '小米手机',
        'Redmi红米手机',
        '电视',
        '笔记本',
        '家电',
        '路由器'
      ]
    }
  },
  methods: {
    async getProductList() {
      const { data } = await this.$http.get('/products', {
        params: { pageSize: 6 }
      })
      this.productList = data.list
    },
    goDetail(id) {
      this.$router.push(`/product/${id}`)
    }
  },
  computed: {
    showProduct() {
      return this.productList.map(pro => {
        if (pro.mainImage.match(/^https/)) {
          pro.imgUrl = pro.mainImage
        } else {
          pro.imgUrl = pro.imageHost + '/' + pro.mainImage
        }
        return pro
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base';
@import '../assets/scss/mixin';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: $colorB;
    color: $colorA;
    .container {
      @include flex();
      a {
        display: inline-block;
        position: relative;
        color: $colorL;
        margin-right: 17px;
        &:hover {
          color: $colorG;
        }
        &:not(:last-of-type)::after {
          content: '|';
          position: absolute;
          right: -8.5px;
          color: #424242;
        }
      }
      .my-cart {
        display: inline-block;
        width: 120px;
        height: 39px;
        margin-right: 0;
        background-color: $colorC;
        color: $colorL;
        cursor: pointer;
        text-align: center;
        i {
          margin-right: 5px;
        }
        &:hover {
          background-color: $colorG;
          color: $colorA;
        }
      }
    }
  }
  .nav-header {
    position: relative;
    .container {
      height: 112px;
      @include flex();
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        overflow: hidden;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &:before {
            content: ' ';
            @include bgImg(55px, 55px, '/imgs/logo-mi.png');
            transition: 0.15s;
          }
          &:after {
            content: ' ';
            @include bgImg(55px, 55px, '/imgs/mi-home.png');
          }
          &:hover:before {
            margin-left: -55px;
            transition: 0.15s;
          }
        }
      }
      .header-menu {
        width: 643px;
        .hide {
          visibility: hidden;
        }
        .item-menu {
          display: inline-block;
          color: $colorB;
          font-size: 16px;
          padding: 47px 0;
          padding-right: 20px;
          cursor: pointer;
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              transition: 0.5s;
              border-color: 1px solid $colorH;
              box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.11);
            }
          }
          .children {
            display: block;
            position: absolute;
            background-color: #fff;
            top: 112px;
            left: 0;
            width: 100vw;
            height: 0;
            border-top: 1px solid transparent;
            overflow: hidden;
            transition: 0.5s;
            z-index: 99;
            .product-list {
              @include flex();
              height: 100%;
              width: 1226px;
              margin: 0 auto;
              .product {
                @include flex();
                position: relative;
                flex-direction: column;
                justify-content: space-evenly;
                height: 100%;
                img {
                  height: 112px;
                }
                .pro-name {
                  color: #333333;
                  font-size: 12px;
                }
                .pro-price {
                  color: $colorA;
                }
                &:not(:last-of-type):after {
                  content: ' ';
                  position: absolute;
                  width: 1px;
                  height: 100px;
                  background-color: #e0e0e0;
                  right: -25px;
                  top: 18px;
                }
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          display: flex;
          height: 50px;
          align-items: center;
          &:hover input,
          &:hover button {
            border-color: $colorD;
          }
          input {
            border: 1px solid #e0e0e0;
            border-right: none;
            outline: none;
            width: 264px;
            height: 50px;
            padding-left: 10px;
            &:focus {
              border-color: $colorA;
            }
            &:focus + button {
              border-color: $colorA;
            }
          }
          button {
            display: inline-block;
            border: 1px solid #e0e0e0;
            outline: none;
            background-color: $colorG;
            width: 55px;
            height: 50px;
            cursor: pointer;
            &:hover {
              background-color: $colorA;
              color: $colorG;
              border: 1px solid $colorA;
            }
          }
        }
      }
    }
  }
}
</style>
