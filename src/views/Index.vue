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
                      :src="'/imgs/nav-img/nav-' + childItem + '.png'"
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
            <img :src="item.img" />
            <div class="swiper-button-prev prev"></div>
            <div class="swiper-button-next"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="ad-list">
        <!-- <a href="" v-for="item in adsList" :key="item.id">
          123
        </a> -->
      </div>
      <div class="banner"></div>
      <div class="product-box"></div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import ServiceBar from '@/components/ServiceBar'
export default {
  name: 'index',
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide
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
        }
      },
      slideList: [
        { id: '42', img: '/imgs/slider/slide-1.jpg' },
        { id: '45', img: '/imgs/slider/slide-2.jpg' },
        { id: '46', img: '/imgs/slider/slide-3.jpg' },
        { id: '43', img: '/imgs/slider/slide-4.jpg' },
        { id: '44', img: '/imgs/slider/slide-5.jpg' }
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
        { id: 33, image: '/imgs/ads/ad-1.jpg' },
        { id: 34, image: '/imgs/ads/ad-2.jpg' },
        { id: 35, image: '/imgs/ads/ad-3.jpg' },
        { id: 36, image: '/imgs/ads/ad-4.jpg' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base';
@import '../assets/scss/mixin';
.index {
  margin: 20px 0;
  .container {
    position: relative;
    .swiper-box {
      .swiper-container {
        height: 451px;
        img {
          width: 100%;
        }
        .prev {
          left: 264px;
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
  }
}
</style>
