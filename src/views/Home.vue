<template>
  <div class="home">
    <nav-header></nav-header>
    <transition name="el-fade-in-linear">
      <router-view :key="$route.path" />
    </transition>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from '@/components/NavFooter'
import NavHeader from '@/components/NavHeader'
export default {
  name: 'Home',
  components: {
    NavFooter,
    NavHeader
  }
}
</script>
