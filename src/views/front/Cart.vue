<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="h4 text-center mb-3">購 物 車 清 單</div>
    <table class="table">
      <thead>
        <tr>
          <th>縮圖</th>
          <th>品名</th>
          <th>數量</th>
          <th>小計</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in Carts.carts" :key="cart.id">
          <td class="thumbnail"
            :style="{backgroundImage:`url(${cart.product.imageUrl})`}"></td>
          <td>{{ cart.product.title }}</td>
          <td>{{ cart.qty }} / {{ cart.product.unit }}</td>
          <td>{{ cart.total | currency }}</td>
          <td>
            <a href="#" class="text-danger" @click.prevent="removeProductToCart(cart.id)">
              <i class="fas fa-trash-alt"></i>
            </a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right"> {{Carts.total | currency }}</td>
        </tr>
        <tr v-if="Carts.final_total !== Carts.total">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ Carts.final_total | currency }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control"
        v-model="couponCode" placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"
          @click="addCouponCode">
          套用優惠碼
        </button>
      </div>
    </div>
    <div class="mb-4 stepBtn">
      <router-link to="/products" class="btn btn-secondary">
        <i class="fas fa-arrow-left"></i>
        繼續購買
      </router-link>
      <router-link to="/consumerform" class="btn btn-danger d-inline-block">
        下一步，填寫訂購資料
        <i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Carts: {},
      couponCode: '',
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Carts = response.data.data;
          vm.isLoading = false;
        }
      });
    },
    removeProductToCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        vm.$bus.$emit('message:push', response.data.message, 'warning');
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/coupon`;
      const coupon = {
        code: vm.couponCode,
      };
      this.$http.post(url, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.getCart();
          vm.$bus.$emit('message:push', response.data.message, 'success');
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style>
.thumbnail {
  margin: auto;
  background-size: cover;
  width: 80px;
  height: 80px;
}
</style>
