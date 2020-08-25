<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    async getUser() {
      const res = await this.$http.get('/user')
      console.log(res)
    },
    async getCartCount() {
      const res = await this.$http.get('/carts/products/sum')
      console.log(res)
    }
  }
}
</script>
