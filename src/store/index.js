import Vue from 'vue';
import Vuex from 'vuex';

import alertMessageModules from './alertMessage';
import cartModules from './cart';
import productModules from './product';
import favoriteModules from './favorite';
import couponModules from './coupon';
import orderModules from './order';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    alertMessageModules,
    cartModules,
    productModules,
    favoriteModules,
    couponModules,
    orderModules,
  },
});
