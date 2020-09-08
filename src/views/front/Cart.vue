<template>
  <div class="container gap-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- 流程 -->
    <ul class="mb-4 step">
      <li class="active">
        <strong>STEP</strong>
        <h3><strong>01</strong></h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="bg-light">
        <strong>STEP</strong>
        <h3><strong>02</strong></h3>
        <p class="h6">填寫訂購資料</p>
      </li>
      <li class="bg-light">
        <strong>STEP</strong>
        <h3><strong>03</strong></h3>
        <p class="h6">付款/完成訂單</p>
      </li>
    </ul>
    <div class="row colorE">
      <!-- 購物車清單-->
      <div class="col-md-7">
        <div class="jumbotron text-center bg-brownlight rounded-0"
          v-if="Carts.carts.length===0">
          <div class="h4 mb-5">購物車內無商品</div>
          <router-link class="btn btn-lg btn-goshoping py-1 mt-4 rounded-0"
            :to="{ name: 'Products'}" >
            繼續購物</router-link>
        </div>
        <div class="p-3 bg-brownlight mb-4 md-dis-none"
          v-if="Carts.carts.length!==0">
          <h4 class="text-center mb-0">購物車清單</h4>
        </div>
        <div class="cart-body" style="">
          <div v-for="cart in Carts.carts" :key="cart.id">
            <div class="d-flex align-items-center">
              <img class="img-fluid mr-4" width="100" height="100"
                :src="`${cart.product.imageUrl}`" alt="">
              <div>
                <h4>{{ cart.product.title }}
                  <span class="text-success f-size75 mx-2"
                    v-if="cart.total!==cart.final_total">(已套用優惠券)</span>
                </h4>
                <div clASS="d-flex h6 mb-0 text-gray">
                  <div class="mr-4">{{ cart.product.price | currency }}</div>
                  <span class="mr-4">x</span>
                  <div class="mr-4">{{ cart.qty }} {{ cart.product.unit }}</div>
                </div>
              </div>
              <div class="ml-auto h4 text-right">
                <del class="f-size75 ml-5 text-gray"
                  v-if="cart.total!==cart.final_total">
                  {{ cart.total | currency }}</del>
                <h4 class="ml-auto text-important font-weight-bold">
                  {{ cart.final_total | currency }}</h4>
              </div>
              <button class="btn btn-outline-danger mr-4 ml-auto"
                @click.prevent="removeProductToCart(cart.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <hr>
          </div>
        </div>
        <router-link class="btn-block btn-back py-1 my-4 text-dark md-dis-none"
          :to="{ name: 'Products'}"
          v-if="Carts.carts.length!==0">
          <i class="fas  fa-arrow-left"></i>
          繼續購物</router-link>
      </div>
      <!-- 購物車合計-折價券-->
      <div class="col-md-5 my-md-0 my-2">
        <div class="border p-3 shadow">
          <span class="badge badge-pill badge-danger float-right bg-primary">
            {{ Carts.carts.length }}</span>
          <div class="h5 text-center border-bottom pb-3">購 物 車 合 計</div>
          <div class="d-flex px-3 py-2">
            <h5>總計</h5>
            <span class="ml-auto h5">{{ Carts.total | currency }}</span>
          </div>
          <div class="d-flex px-3 py-2"
            v-if="Carts.total!==Carts.final_total">
            <h6 clas="mt-2">折扣價</h6>
            <span class="text-success f-size75 mx-2">(已套用優惠券)</span>
            <h3 class="ml-auto text-success">{{ Carts.final_total | currency }}</h3>
          </div>
          <div class="input-group px-3">
            <input type="text" class="form-control f-size75 py-3"
              v-model="couponCode" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-sm btn-outline-gray" type="button"
                @click="addCouponCode">套用優惠碼</button>
            </div>
          </div>
          <small class="ml-auto py-1 d-block mb-3 px-3 text-gray">
            <span>現在輸入OPEN50OFF即可享有折扣價喔!</span>
          </small>
          <div class="p-2">
            <router-link :to="{ name: 'ConsumerForm' }"
              class="btn btn-block btn-submit py-3 h5 rounded-0 f-size125"
              :class="{'disabled': Carts.carts.length===0}">
              確認商品
              <i class="fas  fa-arrow-right"></i>
            </router-link>
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
      Carts: {
        carts: [],
      },
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
        vm.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: response.data.message, status: 'warning' },
        );
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
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: response.data.message, status: 'success' },
          );
        } else {
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
          );
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style scoped lang="scss">
.thumbnail {
  margin: auto;
  background-size: cover;
  width: 80px;
  height: 80px;
}

.customerorder-title {
  @media (max-width:767px) {
    display: none;
  }
}

.step {
  display: flex;
  justify-content: center;
  padding: 0;
  text-align: center;
  color: #6c757d;
  li {
    padding: 0.25rem 3rem;
    @media (max-width:767px) {
      display: none;
    }
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
  }
  li.active {
    padding: 0.25rem 3rem;
    background-color: #EEDEA6;
    color: #6B460F;
    @media (max-width:767px) {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: #efe5dc;
      color: #343a40;
    }
  }
}

.cart-body {
  @media (min-width:768px) {
    min-height: 210px
  }
}

.btn-goshoping {
  color: #efe5dc;
  background-color: #B69418;
  &:hover {
    color: #efe5dc;
    background-color: #D1A813;
  }
}
</style>
