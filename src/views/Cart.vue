<template>
  <div class="cart">
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                v-bind:class="{ checked: allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li
              class="cart-item"
              v-for="(item, index) in cartList"
              v-bind:key="index"
            >
              <div class="item-check">
                <span
                  class="checkbox"
                  v-bind:class="{ checked: item.productSelected }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.imgUrl" alt="" />
                <span>{{
                  item.productName + ' , ' + item.productSubtitle
                }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}</div>
              <div class="item-del" @click="showModal = true"></div>
              <modal
                :showModal="showModal"
                btnType="3"
                title="删除商品"
                @closedialog="showModal = false"
                @submit="delProduct(item)"
              >
                <template #body>
                  该操作将会永久删除该商品是否继续?
                </template>
              </modal>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{ cartList.length }}</span
            >件商品，已选择<span>{{ checkedNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  name: 'cart',
  components: {
    Modal
  },
  created() {
    this.getCartList()
  },
  data() {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0, // 选中商品数量
      imageHost: 'http://img.springboot.cn',
      showModal: false
    }
  },
  computed: {
    cartList() {
      return this.list.map(pro => {
        if (pro.productMainImage.match(/^https/)) {
          pro.imgUrl = pro.productMainImage
        } else {
          pro.imgUrl = this.imageHost + '/' + pro.productMainImage
        }
        return pro
      })
    }
  },
  methods: {
    // ? 获取列表
    async getCartList() {
      const { data: res } = await this.$http.get('/carts')
      this.renderData(res)
    },
    // ? 选择和取消商品选择和增加商品或减小商品数量
    async updateCart(item, type) {
      let quantity = item.quantity
      let selected = item.productSelected
      if (type === '-') {
        if (quantity === 1) {
          this.$message.error('商品至少保留一件')
          return
        }
        --quantity
      } else if (type === '+') {
        if (quantity > item.productStock) {
          this.$message.error('商品不能超过库存')
          return
        }
        ++quantity
      } else {
        selected = !item.productSelected
      }
      const { data: res } = await this.$http.put(`/carts/${item.productId}`, {
        quantity,
        selected
      })
      this.renderData(res)
    },
    // ? 删除商品
    async delProduct(item) {
      const { data: res } = await this.$http.delete(`/carts/${item.productId}`)
      this.renderData(res)
      this.showModal = false
      this.$message.success('删除成功')
    },
    // ? 全选
    async toggleAll() {
      const url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      const { data: res } = await this.$http.put(url)
      this.renderData(res)
    },
    // ? 下单
    order() {
      const isCheck = this.list.every(item => !item.productSelected)
      if (isCheck) {
        this.$message.error('请选择商品')
      } else {
        this.$router.push('/order/confirm')
      }
    },
    // ? 数据赋值
    renderData(data) {
      this.list = data.cartProductVoList
      this.allChecked = data.selectedAll
      this.cartTotalPrice = data.cartTotalPrice
      this.checkedNum = data.cartProductVoList.filter(
        item => item.productSelected
      ).length
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              // width: 180px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
