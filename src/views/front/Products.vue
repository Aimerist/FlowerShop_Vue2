<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm" v-for="item in Products" :key="item.id">
          <img style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.conext }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.price }} 元</del>
              <div class="h5">現在只要 {{ item.origin_price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
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
          alert(response.data.message);
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
