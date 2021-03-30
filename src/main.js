import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
import swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import AOS from 'aos';

import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import 'aos/dist/aos.css'; // You can also use <link> for styles

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
AOS.init({
  once: true,
  duration: 1000,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Vue.use(VueAwesomeSwiper);
swiper.use([Navigation, Pagination, Autoplay]);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(url).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({ name: 'Login' });
      }
    });
  } else {
    next();
  }
});
