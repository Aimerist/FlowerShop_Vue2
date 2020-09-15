import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    order: {
      user: {},
    },
    orders: [],
    orderId: '-MFmztApDdotRm6X5wOh',
    page: {},
  },
  actions: {
    getOrderList(context, page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/orders?page=${page}`;
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('ORDERS', response.data.orders);
          context.commit('PAGE', response.data.pagination);
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        }
      });
    },
    getOrder(context) {
      const Id = context.state.orderId;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/order/${Id}`;
      // vm.isLoading = true;
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('ORDER', response.data.order);
          // vm.isLoading = false;
        }
      });
    },
    payOrder(context) {
      const Id = context.state.order.id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/pay/${Id}`;
      // vm.isLoading = true;
      axios.post(url).then((response) => {
        if (response.data.success) {
          context.dispatch('getOrder');
          // vm.isLoading = false;
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        }
      });
    },
  },
  mutations: {
    ORDER(state, payload) {
      state.order = payload;
    },
    ORDERS(state, payload) {
      state.orders = payload;
    },
    ORDER_ID(state, payload) {
      state.orderId = payload;
    },
    PAGE(state, payload) {
      state.page = payload;
    },
  },
  getters: {
    order: (state) => state.order,
    orders: (state) => state.orders,
    orderId: (state) => state.orderId,
    page: (state) => state.page,
  },
});
