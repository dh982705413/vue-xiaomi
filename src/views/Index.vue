<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="item in navMenuList" :key="item.title">
              <div class="item">
                <span>{{ item.title }}</span>
                <i class="iconfont icon-arrow-right"></i>
              </div>
              <div class="children">
                <ul
                  class="children-col"
                  v-for="(child, index) in item.col"
                  :key="index"
                >
                  <li
                    class="children-item"
                    v-for="(childItem, index) in item.products"
                    :key="index"
                    @click="$router.push(`/product/${43}`)"
                  >
                    <img
                      v-lazy="'/imgs/nav-img/nav-' + childItem + '.png'"
                      alt=""
                    />
                    <span>小米手机</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <img v-lazy="item.img" />
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="ads-list">
        <a
          href="javascript:;"
          v-for="item in adsList"
          :key="item.id"
          @click="$router.push(`/product/${item.id}`)"
        >
          <img v-lazy="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <img v-lazy="'/imgs/banner-1.png'" alt="" />
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <div class="box-hd">
          <h2>手机</h2>
        </div>
        <div class="wrapper">
          <div class="banner-left">
            <a href=""><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""/></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, index) in productList" :key="index">
              <a
                class="item"
                v-for="(item, index) in arr"
                :key="index"
                @click="$router.push(`/product/${item.id}`)"
              >
                <img v-lazy="item.mainImage" alt="" />
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p class="product-detail">{{ item.subtitle }}</p>
                  <div class="product-price">
                    {{ item.price }}元
                    <a href="javascript:;" @click.stop="addCart(item.id)"> </a>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showDialog"
      @closedialog="showDialog = false"
      @submit="$router.push('/cart')"
    >
      <template #body>
        商品添加成功
      </template>
    </modal>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Modal from '@/components/Modal'
import 'swiper/css/swiper.css'
import ServiceBar from '@/components/ServiceBar'
import { mapMutations } from 'vuex'

export default {
  name: 'index',
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },

        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        effect: 'fade'
      },
      slideList: [
        { id: 42, img: '/imgs/slider/slide-1.jpg' },
        { id: 45, img: '/imgs/slider/slide-2.jpg' },
        { id: 46, img: '/imgs/slider/slide-3.jpg' },
        { id: 43, img: '/imgs/slider/slide-4.jpg' },
        { id: 44, img: '/imgs/slider/slide-5.jpg' }
      ],
      navMenuList: [
        { title: '手机 电话卡', col: 2, products: [1, 2, 3, 4, 5, 6] },
        { title: '电视 盒子', col: 3, products: [5, 4, 2, 6, 4, 1] },
        { title: '笔记本 插线板', col: 2, products: [6, 5, 4, 3, 2, 1] },
        { title: '出行 穿戴', col: 4, products: [4, 6, 2, 4, 1, '3-1'] },
        { title: '智能 路由器', col: 2, products: [1, 2, 3, 4, 5, 6] },
        { title: '电源 配件', col: 4, products: [1, 2, 3, 4, 5, 6] },
        { title: '健康 儿童', col: 4, products: [1, 2, 3, 4, 5, 6] },
        { title: '耳机 音箱', col: 3, products: [1, 2, 3, 4, 5, 6] }
      ],
      adsList: [
        { id: 33, img: '/imgs/ad/ad-1.jpg' },
        { id: 34, img: '/imgs/ad/ad-2.jpg' },
        { id: 35, img: '/imgs/ad/ad-3.jpg' },
        { id: 36, img: '/imgs/ad/ad-4.jpg' }
      ],
      productList: [],
      showDialog: false
    }
  },
  created() {
    this.fetchProductList()
    if (this.$route.query.from === 'login' || this.$route.path === '/index') {
      this.getUser()
      this.getCartCount()
    }
  },
  methods: {
    ...mapMutations(['saveUserName', 'saveCartCount']),
    async getUser() {
      const res = await this.$http.get('/user')
      this.saveUserName(res?.data?.username)
    },
    async getCartCount() {
      const res = await this.$http.get('/carts/products/sum')
      this.saveCartCount(res?.data || 0)
    },
    async fetchProductList() {
      const { data: res } = await this.$http.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 8
        }
      })
      this.productList = [res.list.splice(0, 4), res.list]
    },
    async addCart(id) {
      const res = await this.$http.post('/carts', {
        productId: id,
        selected: true
      })
      this.$store.dispatch('saveCartCount', res.data.cartTotalQuantity)
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base';
@import '../assets/scss/mixin';
.index {
  margin-top: 20px;
  .container {
    position: relative;
    .swiper-box {
      --swiper-navigation-color: rgba(223, 217, 217, 0.5);
      --swiper-navigation-size: 28px; /* 设置按钮大小 */
      --swiper-theme-color: #ffffff;
      .swiper-container {
        height: 451px;
        img {
          width: 100%;
        }
        .swiper-button-prev {
          left: 264px;
        }
        .swiper-button-next {
          right: 0;
        }
        .swiper-button-next,
        .swiper-button-prev {
          padding: 30px 20px;
          &:hover {
            background-color: rgba(0, 0, 0, 0.6);
            color: #999;
          }
        }
      }
      .nav-menu {
        position: absolute;
        width: 264px;
        height: 451px;
        z-index: 80;
        background-color: rgba(105, 101, 101, 0.6);
        left: 0;
        padding: 26px 0;
        font-size: 14px;
        .menu-wrap {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          cursor: pointer;
          .menu-item {
            padding: 15px;
            &:hover {
              background-color: $colorA;
              .children {
                display: flex;
              }
            }
            .item {
              color: #ffffff;
              @include flex();
            }
            .children {
              display: none;
              position: absolute;
              height: 451px;
              top: 0;
              left: 264px;
              z-index: 999;
              background-color: #ffffff;
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
              .children-col {
                width: 241px;
                height: 75.1px;
                .children-item {
                  padding: 18px 20px;
                  display: flex;
                  align-items: center;
                  img {
                    width: 40px;
                    height: 40px;
                    margin-right: 14px;
                  }
                  &:hover {
                    color: $colorA;
                  }
                }
              }
            }
          }
        }
      }
    }
    .ads-list {
      margin-top: 20px;
      @include flex();
      a {
        display: inline-block;
        img {
          width: 296px;
          height: 167px;
        }
      }
    }
    .banner {
      margin-top: 20px;
      margin-bottom: 50px;
      img {
        width: 1226px;
      }
    }
  }
  .product-box {
    background-color: $colorJ;
    .container {
      padding: 30px 0 50px;
      .box-hd {
        height: 58px;
        h2 {
          line-height: 58px;
          font-size: $fontF;
          color: $colorB;
        }
      }
      .wrapper {
        display: flex;
        height: 614px;
        .banner-left {
          img {
            width: 234px;
            height: 614px;
            transition: 0.5s;
            &:hover {
              @include hoverAnimate();
            }
          }
        }
        .list-box {
          height: 614px;
          display: flex;
          flex-flow: row wrap;
          align-content: space-between;
          height: 100%;
          .list {
            width: 992px;
            display: flex;
            justify-content: space-evenly;
            .item {
              @include flex();
              flex-direction: column;
              justify-content: space-between;
              width: 234px;
              height: 300px;
              padding: 20px 0;
              background-color: #ffffff;
              text-align: center;
              cursor: pointer;
              transition: 0.5s;
              &:hover {
                @include hoverAnimate();
              }
              img {
                width: 160px;
                height: 160px;
              }
              .product-detail {
                color: #b0b0b0;
                font-size: 12px;
              }
              .product-price {
                margin-top: 10px;
                color: $colorA;
                font-size: 14px;
                a {
                  display: inline-block;
                  box-sizing: content-box;
                  width: 15px;
                  height: 15px;
                  background: url('/imgs/icon-cart-hover.png') no-repeat center;
                  background-size: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
