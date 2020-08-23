import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
Vue.use(VueRouter)

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
  }
]

const router = new VueRouter({
  routes
})

export default router
