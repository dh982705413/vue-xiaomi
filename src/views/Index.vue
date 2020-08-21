<template>
  <div>index</div>
</template>
<script>
export default {
  name: 'index',
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const data = await this.$http.get('/products')
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
