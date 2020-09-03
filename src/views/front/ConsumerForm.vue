<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="h4 text-center mb-3">填 寫 訂 單 資 料</div>
    <div class="my-5 row justify-content-center">
      <ValidationObserver ref="form">
        <form class="text-left" @submit.prevent="createdOrder">
          <div class="row">
            <div class="form-group col-md-6">
              <label for="username">姓名</label>
              <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                <input type="text" class="form-control" name="name" id="username"
                  v-model="form.user.name" placeholder="輸入姓名">
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group col-md-6">
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
            <textarea name="" id="comment" class="form-control" cols="30" rows="10"
            v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <router-link to="/checkorder" class="btn btn-success">
              <i class="fas fa-arrow-left"></i>
              回上一步
            </router-link>
            <button class="btn btn-danger">
              送出訂單
              <i class="fas fa-arrow-right"></i></button>
          </div>
        </form>
      </ValidationObserver>
    </div>
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
      Carts: {},
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
              vm.$bus.$emit('message:push', response.data.message, 'success');
              vm.$router.push({
                name: 'ConsumerOrder',
                params: { orderId: response.data.orderId },
              });
            } else {
              vm.$bus.$emit('message:push', response.data.message, 'danger');
            }
          });
        } else {
          vm.$bus.$emit('message:push', '欄位填寫不完整', 'danger');
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
