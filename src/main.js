import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

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
