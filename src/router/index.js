import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
Vue.use(VueRouter)
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/index',
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/Index')
      },
      {
        name: 'product',
        path: '/product/:id',
        props: true,
        component: () => import('@/views/Product')
      },
      {
        name: 'detail',
        path: '/detail/:id',
        props: true,
        component: () => import('@/views/Detail')
      }
    ]
  },
  {
    name: 'order',
    path: '/order',
    component: () => import('@/views/Order'),
    children: [
      {
        name: 'order-list',
        path: 'list',
        component: () => import('@/views/OrderList')
      },
      {
        name: 'order-confirm',
        path: 'confirm',
        component: () => import('@/views/OrderConfirm')
      },
      {
        name: 'order-pay',
        path: 'pay',
        component: () => import('@/views/OrderPay')
      },
      {
        name: 'ali-pay',
        path: 'alipay',
        component: () => import('@/views/AliPay')
      },
      {
        name: 'cart',
        path: '/cart',
        component: () => import('@/views/Cart')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/index' || to.path === '/register') {
    return next()
  }
  const userId = window.sessionStorage.getItem('userId')
  if (!userId) {
    return next('/login')
  }
  next()
})

export default router
