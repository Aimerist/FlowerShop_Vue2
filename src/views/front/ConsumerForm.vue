<template>
  <div class="container gap-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- 流程 -->
    <ul class="mb-4 step">
      <li class="bg-light">
        <strong>STEP</strong>
        <h3><i aria-hidden="true" class="fa fa-check"></i></h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="active">
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
    <ValidationObserver ref="form">
      <form class="text-left" @submit.prevent="createdOrder">
        <div class="row">
          <!-- 訂單資訊 -->
          <div class="col-md-7">
            <div class="p-3 bg-brownlight mb-4 md-dis-none">
              <h4 class="text-center mb-0">訂單資料</h4>
            </div>
            <div class="row">
              <div class="form-group col-sm-6">
                <label for="username">姓名</label>
                <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control" name="name" id="username"
                    v-model="form.user.name" placeholder="輸入姓名">
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-sm-6">
                <label for="usertel">電話</label>
                <ValidationProvider name="電話" rules="required" v-slot="{ errors }">
                  <input type="tel" class="form-control" id="usertel"
                    v-model="form.user.tel" placeholder="請輸入電話">
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-group">
              <label for="useremail">信箱</label>
              <ValidationProvider name="信箱" rules="required|email" v-slot="{ errors }">
                <input type="email" class="form-control" name="email" id="useremail"
                  v-model="form.user.email" placeholder="請輸入信箱">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="useraddress">收件地址</label>
              <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                <input type="text" class="form-control" name="address" id="useraddress"
                  v-model="form.user.address" placeholder="請輸入地址">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="comment">留言 <small class="text-info">(選填)</small></label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="4"
              v-model="form.message"></textarea>
            </div>
            <router-link class="btn-block btn-back py-1 my-4 text-dark md-dis-none"
              :to="{ name: 'Cart'}">
              <i class="fas  fa-arrow-left"></i>
              上一步，確認購物清單</router-link>
          </div>
          <!-- 訂單清單-折價券-->
          <div class="col-md-5 my-md-0 my-2">
            <div class="border p-3 shadow">
              <span class="badge badge-pill badge-danger float-right bg-primary">
                {{ Carts.carts.length }}</span>
              <div class="h5 text-center pb-2">訂 單 內 容</div>
              <table class="table m-0 teble-order">
                <thead>
                  <tr>
                    <td>商品</td>
                    <td  class="text-right" width="135">總計</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in Carts.carts" :key="cart.id">
                    <td>{{ cart.product.title }} Ｘ {{ cart.qty }}</td>
                    <td class="text-right">{{ cart.product.price | currency }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="">
                    <th>總計</th>
                    <td class="text-right h4 font-weight-bold h5 text-primary"
                      :class="{'text-secondary': Carts.total===Carts.final_total }">
                      {{ Carts.total | currency }}</td>
                  </tr>
                  <tr v-if="Carts.total!==Carts.final_total">
                    <th>
                      折扣價
                      <small class="text-success">(已套用優惠券)</small>
                    </th>
                    <td class="text-right h4 font-weight-bold text-secondary">
                      {{ Carts.final_total | currency }}</td>
                  </tr>
                </tfoot>
              </table>
              <div class="p-2">
                <button class="btn btn-block btn-submit mt-4 py-3 rounded-0 f-size125">
                  送出訂單
                  <i class="fas  fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} 欄位不得留空',
});
extend('email', {
  ...email,
  message: '{_field_} 必須是有效的電子郵件地址',
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      Carts: {
        carts: [],
      },
      form: {
        user: {},
      },
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
    createdOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/order`;
      this.$refs.form.validate().then((valid) => {
        if (valid) {
          vm.$http.post(url, { data: vm.form }).then((response) => {
            if (response.data.success) {
              vm.$store.dispatch(
                'alertMessageModules/updateMessage',
                { message: response.data.message, status: 'success' },
              );
              vm.$router.push({
                name: 'ConsumerOrder',
                params: { orderId: response.data.orderId },
              });
            } else {
              vm.$store.dispatch(
                'alertMessageModules/updateMessage',
                { message: response.data.message, status: 'danger' },
              );
            }
          });
        } else {
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: '欄位填寫不完整', status: 'danger' },
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
</style>
