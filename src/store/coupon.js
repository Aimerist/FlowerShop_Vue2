import axios from 'axios';
import $ from 'jquery';

export default ({
  namespaced: true,
  state: {
    coupons: [],
    tempCoupon: {},
    couponCode: '',
  },
  actions: {
    getCoupons(context, page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupons?page=${page}`;
      context.commit('IS_LOADING', true, { root: true });
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('COUPONS', response.data.coupons);
          context.commit('PAGE', response.data.pagination, { root: true });
          context.commit('IS_LOADING', false, { root: true });
        }
      });
    },
    updataCoupon(context, isCreate) {
      const couponData = context.state.tempCoupon;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon`;
      let apiMethd = 'post';
      if (!isCreate) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${couponData.id}`;
        apiMethd = 'put';
      }
      couponData.due_date = Math.floor(new Date(couponData.due_date) / 1000);
      axios[apiMethd](url, { data: couponData }).then((response) => {
        if (response.data.success) {
          context.dispatch('getCoupons');
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        }
        $('#addModal').modal('hide');
      });
    },
    delCoupon(context) {
      const couponId = context.state.tempCoupon.id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${couponId}`;
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('getCoupons');
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
            { root: true });
        }
        $('#delModal').modal('hide');
      });
    },
    useCouponCode(context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/coupon`;
      const coupon = {
        code: context.state.couponCode,
      };
      axios.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          context.dispatch('cartModules/getCart', null, { root: true });
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
            { root: true });
        }
      });
    },
  },
  mutations: {
    COUPONS(state, payload) {
      state.coupons = payload;
    },
    COUPON_CODE(state, payload) {
      state.couponCode = payload;
    },
  },
  getters: {
    coupons: (state) => state.coupons,
    tempCoupon: (state) => state.tempCoupon,
    couponCode: (state) => state.couponCode,
  },
});
