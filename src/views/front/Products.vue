<template>
  <div class="container">
<!-- 購物車內容 -->
    <div class="btn-group">
      <button type="button" class="btn" data-toggle="dropdown">
        <i class="fas fa-shopping-cart fa-lg"></i>
        <span class="badge badge-pill badge-danger">0</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="p-2 px-sm-3">
          <h5 class="text-center">購物車清單</h5>
          <table class="table mb-2" style="min-width:270px">
            <tbody>
              <tr v-for="cart in Carts" :key="cart.id">
                <td class="px-1">
                  <a href="#" class="text-danger">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
                <td class="px-1">{{ cart.product.title }}</td>
                <td class="px-1">{{ cart.qty }} {{ cart.product.unit }}</td>
                <td class="text-right px-1">{{ cart.total}} 元</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/createorder" class="btn btn-primary d-block mb-2"
          v-if="Carts.total">
            <i class="fas fa-cart-arrow-down"></i> 結帳去
          </router-link>
        </div>
      </div>
    </div>
<!-- 產品列表 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4">
        <div class="border-0 shadow-sm" v-for="item in Products" :key="item.id">
          <img style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          <div>
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p>{{ item.conext }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.price }} 元</del>
              <div class="h5">現在只要 {{ item.origin_price }} 元</div>
            </div>
          </div>
          <div class="d-flex">
            <router-link type="button" class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'ProductDetail', params: { productId: `${item.id}` }}">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </router-link>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addProductToCart(item.id)">
              <!-- <i class="fas fa-spinner fa-spin"></i> -->
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Products: {},
      Carts: {},
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/products`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Products = JSON.parse(JSON.stringify(response.data.products));
        }
      });
    },
    addProductToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      const product = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: product }).then((response) => {
        if (response.data.success) {
          vm.getCart();
        }
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Carts = JSON.parse(JSON.stringify(response.data.data.carts));
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
