import axios from 'axios'

export default ({
  namespaced: true,
  state: {
    order: {
      user: {}
    },
    orders: [],
    orderId: ''
  },
  actions: {
    getOrderList (context, page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/orders?page=${page}`
      context.commit('IS_LOADING', true, { root: true })
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('ORDERS', response.data.orders)
          context.commit('PAGE', response.data.pagination, { root: true })
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        }
        context.commit('IS_LOADING', false, { root: true })
      })
    },
    getOrder (context) {
      const Id = context.state.orderId
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/order/${Id}`
      context.commit('IS_LOADING', true, { root: true })
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('ORDER', response.data.order)
          context.commit('IS_LOADING', false, { root: true })
        }
      })
    },
    payOrder (context) {
      const Id = context.state.order.id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/pay/${Id}`
      context.commit('IS_LOADING', true, { root: true })
      axios.post(url).then((response) => {
        if (response.data.success) {
          context.dispatch('getOrder')
          context.commit('IS_LOADING', false, { root: true })
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        }
      })
    }
  },
  mutations: {
    ORDER (state, payload) {
      state.order = payload
    },
    ORDERS (state, payload) {
      state.orders = payload
    },
    ORDER_ID (state, payload) {
      state.orderId = payload
    }
  },
  getters: {
    order: (state) => state.order,
    orders: (state) => state.orders,
    orderId: (state) => state.orderId
  }
})
