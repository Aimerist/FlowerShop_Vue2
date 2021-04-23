import Vue from 'vue'
import Vuex from 'vuex'

import alertMessageModules from './alertMessage'
import cartModules from './cart'
import productModules from './product'
import favoriteModules from './favorite'
import couponModules from './coupon'
import orderModules from './order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: {},
    status: {
      isLoading: false,
      itemLodingId: ''
    }
  },
  actions: {
  },
  mutations: {
    PAGE (state, payload) {
      state.page = payload
    },
    IS_LOADING (state, payload) {
      state.status.isLoading = payload
    },
    ITEM_LOADING_ID (state, payload) {
      state.status.itemLodingId = payload
    }
  },
  getters: {
    page: (state) => state.page,
    status: (state) => state.status
  },
  modules: {
    alertMessageModules,
    cartModules,
    productModules,
    favoriteModules,
    couponModules,
    orderModules
  }
})
