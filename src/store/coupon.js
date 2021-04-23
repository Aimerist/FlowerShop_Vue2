import axios from 'axios'
import $ from 'jquery'

export default ({
  namespaced: true,
  state: {
    coupons: [],
    tempCoupon: {},
    couponCode: ''
  },
  actions: {
    getCoupons (context, page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupons?page=${page}`
      context.commit('IS_LOADING', true, { root: true })
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('COUPONS', response.data.coupons)
          context.commit('PAGE', response.data.pagination, { root: true })
          context.commit('IS_LOADING', false, { root: true })
        }
      })
    },
    updataCoupon (context, isCreate) {
      const couponData = context.state.tempCoupon
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon`
      let apiMethd = 'post'
      if (!isCreate) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${couponData.id}`
        apiMethd = 'put'
      }
      context.commit('ITEM_LOADING_ID', true, { root: true })
      couponData.due_date = Math.floor(new Date(couponData.due_date) / 1000)
      axios[apiMethd](url, { data: couponData }).then((response) => {
        if (response.data.success) {
          context.dispatch('getCoupons')
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        }
        context.commit('ITEM_LOADING_ID', '', { root: true })
        $('#addModal').modal('hide')
      })
    },
    delCoupon (context) {
      const couponId = context.state.tempCoupon.id
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${couponId}`
      context.commit('ITEM_LOADING_ID', true, { root: true })
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('getCoupons')
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
            { root: true })
        }
        context.commit('ITEM_LOADING_ID', '', { root: true })
        $('#delModal').modal('hide')
      })
    },
    useCouponCode (context) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/coupon`
      const coupon = {
        code: context.state.couponCode
      }
      axios.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          context.dispatch('cartModules/getCart', null, { root: true })
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true })
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
            { root: true })
        }
      })
    }
  },
  mutations: {
    COUPONS (state, payload) {
      state.coupons = payload
    },
    COUPON_CODE (state, payload) {
      state.couponCode = payload
    },
    DUE_DATE_FORMAT (state, timestamp) {
      const dates = new Date(timestamp * 1000)
      const year = dates.getFullYear()
      const month = dates.getMonth() < 10 ? `0${dates.getMonth() + 1}` : dates.getMonth() + 1
      const date = dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate()
      state.tempCoupon.due_date = `${year}-${month}-${date}`
    }
  },
  getters: {
    coupons: (state) => state.coupons,
    tempCoupon: (state) => state.tempCoupon,
    couponCode: (state) => state.couponCode
  }
})
