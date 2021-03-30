import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/front/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/About.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/front/Products.vue'),
      },
      {
        path: '/products/:productId',
        name: 'ProductDetail',
        component: () => import('../views/front/ProductDetail.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/front/Cart.vue'),
      },
      {
        path: '/consumerform',
        name: 'ConsumerForm',
        component: () => import('../views/front/ConsumerForm.vue'),
      },
      {
        path: '/consumerorder/:orderId',
        name: 'ConsumerOrder',
        component: () => import('../views/front/ConsumerOrder.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/front/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Dashobard.vue'),
    children: [
      {
        path: 'productsList',
        name: 'ProductsList',
        meta: { requiresAuth: true },
        component: () => import('../views/admin/ProductsList.vue'),
      },
      {
        path: 'orders',
        name: 'OrderList',
        meta: { requiresAuth: true },
        component: () => import('../views/admin/OrderList.vue'),
      },
      {
        path: 'coupons',
        name: 'CouponList',
        meta: { requiresAuth: true },
        component: () => import('../views/admin/CouponList.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
});

export default router;
