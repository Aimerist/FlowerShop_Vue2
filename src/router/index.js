import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/front/Products.vue'),
      },
      {
        path: '/products/:productId',
        name: 'ProductDetail',
        component: () => import('../views/front/ProductDetail.vue'),
      },
      {
        path: '/checkorder',
        name: 'CheckOrder',
        component: () => import('../views/front/CheckOrder.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Dashobard.vue'),
    children: [
      {
        path: '',
        name: 'ProductsList',
        component: () => import('../views/back/ProductsList.vue'),
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('../views/back/OrderList.vue'),
      },
      {
        path: 'coupons',
        name: 'CouponList',
        component: () => import('../views/back/CouponList.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
