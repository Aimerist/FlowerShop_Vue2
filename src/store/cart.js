import axios from 'axios'

export default ({
  namespaced: true,
  state: {
    carts: {},
    cartLength: 0,
    isShowCart: false
  },
  actions: {
    getCart (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('CART', response.data.data)
          context.commit('CART_LENGTH', response.data.data.carts.length)
        }
      })
    },
    addCart (context, { id, qty = 1 }) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`
      const product = {
        product_id: id,
        qty
      }
      context.commit('ITEM_LOADING_ID', id, { root: true })
      axios.post(url, { data: product }).then((response) => {
        if (response.data.success) {
          context.dispatch('getCart')
          context.dispatch('showCart')
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        }
        context.commit('ITEM_LOADING_ID', '', { root: true })
      })
    },
    removeCart (context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart/${id}`
      context.commit('ITEM_LOADING_ID', id, { root: true })
      axios.delete(url).then((response) => {
        context.dispatch('getCart')
        context.dispatch('alertMessageModules/updateMessage',
          { message: response.data.message, status: 'warning' },
          { root: true })
        context.commit('ITEM_LOADING_ID', '', { root: true })
      })
    },
    showCart (context) {
      context.commit('IS_SHOW_CART', true)
      setTimeout(() => {
        context.commit('IS_SHOW_CART', false)
      }, 3000)
    }
  },
  mutations: {
    CART (state, payload) {
      state.carts = payload
    },
    CART_LENGTH (state, payload) {
      state.cartLength = payload
    },
    IS_SHOW_CART (state, payload) {
      state.isShowCart = payload
    }
  },
  getters: {
    carts: (state) => state.carts,
    cartLength: (state) => state.cartLength,
    isShowCart: (state) => state.isShowCart
  }
})
