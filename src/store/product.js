import axios from 'axios';
import $ from 'jquery';

export default ({
  namespaced: true,
  state: {
    product: {},
    productList: {},
    tempProduct: {},
    filterProducts: {},
    categories: {},
    page: {},
  },
  actions: {
    getProductList(context, { isFront, page = 1 }) {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/products?page=${page}`;
      if (isFront) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/products/all`;
      }
      // vm.isLoading = true;
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCT_LIST', response.data.products);
          if (isFront) {
            context.commit('CATEGORIES');
            context.commit('FILTER_PRODUCTS');
          } else {
            context.commit('PAGE', response.data.pagination);
          }
          // vm.isLoading = false;
        }
      });
    },
    getProduct(context, id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/product/${id}`;
      // vm.isLoading = true;
      axios.get(url).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCT', response.data.product);
          // vm.isLoading = false;
        }
      });
    },
    updataProduct(context, isEdit) {
      const data = context.state.tempProduct;
      let apiMethod = 'post';
      let apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product`;
      if (isEdit) {
        apiMethod = 'put';
        apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product/${data.id}`;
      }
      axios[apiMethod](apiUrl, { data }).then((response) => {
        if (response.data.success) {
          context.dispatch('getProductList', { isFront: false });
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
            { root: true });
        } else {
          context.dispatch('alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
            { root: true });
        }
        $('#updataModal').modal('hide');
      });
    },
    delProduct(context) {
      const productId = context.state.tempProduct.id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product/${productId}`;
      axios.delete(url).then((response) => {
        if (response.data.success) {
          context.dispatch('getProductList', { isFront: false });
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
    switchCategoryStatus(context, CategoryName) {
      context.commit('FILTER_PRODUCTS', CategoryName);
    },
  },
  mutations: {
    PRODUCT(state, payload) {
      state.product = payload;
    },
    PRODUCT_LIST(state, payload) {
      state.productList = payload;
    },
    CATEGORIES(state) {
      state.categories = state.productList
        .map((item) => item.category)
        .filter((item, index, arr) => arr.indexOf(item) === index);
    },
    FILTER_PRODUCTS(state, payload) {
      const Data = state.productList.filter((item) => item.is_enabled);
      if (payload) {
        state.filterProducts = Data.filter((item) => item.category === payload);
      } else {
        state.filterProducts = Data;
      }
    },
    PAGE(state, payload) {
      state.page = payload;
    },
  },
  getters: {
    product: (state) => state.product,
    productList: (state) => state.productList,
    categories: (state) => state.categories,
    filterProducts: (state) => state.filterProducts,
    page: (state) => state.page,
    tempProduct: (state) => state.tempProduct,
  },
});
