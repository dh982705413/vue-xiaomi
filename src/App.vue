<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  mounted() {
    this.getUser()
    this.getCartCount()
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
    }
  }
}
</script>
