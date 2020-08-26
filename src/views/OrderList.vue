<template>
  <div>order-list</div>
</template>

<script>
export default {
  name: 'order-list',
  data() {
    return {}
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const res = await this.$http.get('/orders')
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped></style>
