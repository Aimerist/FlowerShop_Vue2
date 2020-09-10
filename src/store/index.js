import Vue from 'vue';
import Vuex from 'vuex';

import alertMessageModules from './alertMessage';
import cartModules from './cart';
import productModules from './product';
import favoriteModules from './favorite';

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
  },
});
