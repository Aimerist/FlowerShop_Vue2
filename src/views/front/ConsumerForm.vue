<template>
  <div class="container-fluid container-lg grid-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- 流程 -->
    <ol class="row justify-content-center list-unstyled mb-4 mb-md-6">
      <li class="col-3 col-lg-2 text-center d-none d-md-block py-3 mx-2 bg-gray-100"
        data-aos="zoom-in">
        <span class="h6 text-secondary d-block">STOP</span>
        <span class="h5 font-h4-md text-secondary d-block py-md-1 font-family-roboto">
          <i class="fa fa-check"></i></span>
        <p class="text-secondary">確認清單內容</p>
      </li>
      <li class="col-md-3 col-lg-2 text-center bg-primary-300
        py-1 py-md-3 mx-4 mx-md-2"
        data-aos="zoom-in" data-aos-delay="150">
        <span class="font-sm font-h6-md text-brown font-weight-bold d-block">STOP</span>
        <span class="h5 font-h4-md text-brown font-family-roboto d-block py-md-1 ">02</span>
        <p class="font-sm font-h6-md text-brown">填寫訂購資料</p>
      </li>
      <li class="col-3 col-lg-2 text-center d-none d-md-block py-3 mx-2 bg-gray-100"
        data-aos="zoom-in" data-aos-delay="300">
        <span class="h6 text-secondary d-block">STOP</span>
        <span class="h4 text-secondary d-block py-md-1 font-family-roboto">03</span>
        <p class="text-secondary">付款/完成訂單</p>
      </li>
    </ol>
    <ValidationObserver ref="form">
      <form class="row justify-content-center" @submit.prevent="createdOrder">
        <div class="col d-md-none mb-6 mx-2" data-aos="fade-up" data-aos-delay="150">
          <div class="border border-light shadow rounded position-relative
            px-4 py-4">
            <a class="h6 font-h5-sm text-dark font-weight-normal
              d-flex justify-content-center text-decoration-none py-1"
              data-toggle="collapse" href="#collapseExample" role="button"
              aria-expanded="false" aria-controls="collapseExample">訂 單 內 容
              <span class="badge badge-pill badge-warning text-white ml-2">{{ cartLength }}</span>
              <i class="fas fa-chevron-down position-absolute"></i>
            </a>
            <div class="collapse mt-4" id="collapseExample">
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">商品</th>
                    <th scope="col" class="text-right">金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts.carts" :key="cart.id">
                    <td>{{ cart.product.title }} x {{ cart.qty }}</td>
                    <td class="text-right">{{ cart.product.price | currency }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">總計</td>
                    <td class="h5 text-dark text-right font-family-roboto">
                      {{ carts.total | currency }}</td>
                  </tr>
                  <tr v-if="carts.total!==carts.final_total">
                    <td class="font-weight-bold">折扣價
                      <p class="text-success font-xs font-weight-normal line-height-1">(已套用優惠券)</p>
                      </td>
                    <td class="h3 text-right text-success font-family-roboto">
                      {{ carts.final_total | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 訂單資訊 -->
        <div class="col-md-7" data-aos="fade-up" data-aos-delay="150">
          <div class="jumbotron text-center rounded-0 mb-4"
            v-if="cartLength === 0">
            <div class="h4 text-base mb-5">購物清單內無商品</div>
            <router-link class="btn btn-lg btn-primary py-1 mt-4 rounded-0"
              :to="{ name: 'Products'}" >
              前往購物</router-link>
          </div>
          <h2 class="h4 text-base text-center bg-light rounded-top
            d-none d-md-block mb-md-3 py-4"
            v-if="cartLength !== 0">
            訂單資料</h2>
          <div class="px-2"
            v-if="cartLength !== 0">
            <div class="row">
              <div class="form-group col-sm-6">
                <label for="username">姓名</label>
                <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                  <input type="text" class="form-control" name="name" id="username"
                    v-model="form.user.name" placeholder="輸入姓名">
                  <span class="text-danger font-sm">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-sm-6">
                <label for="usertel">電話</label>
                <ValidationProvider name="電話" rules="required" v-slot="{ errors }">
                  <input type="tel" class="form-control" id="usertel"
                    v-model="form.user.tel" placeholder="請輸入電話">
                  <span class="text-danger font-sm">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-group">
              <label for="useremail">信箱</label>
              <ValidationProvider name="信箱" rules="required|email" v-slot="{ errors }">
                <input type="email" class="form-control" name="email" id="useremail"
                  v-model="form.user.email" placeholder="請輸入信箱">
                <span class="text-danger font-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="useraddress">收件地址</label>
              <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                <input type="text" class="form-control" name="address" id="useraddress"
                  v-model="form.user.address" placeholder="請輸入地址">
                <span class="text-danger font-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="comment">留言 <small class="text-warning">(選填)</small></label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="4"
              v-model="form.message"></textarea>
            </div>
          </div>
          <div class="m-5 d-md-none">
            <button class="btn btn-block btn-warning btn-submit btn-lg text-white py-3 rounded-0"
              :class="{'d-none': cartLength === 0}">
              送出訂單
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          <div class="m-5 mx-md-0 text-center">
            <router-link class="d-block btn-light text-center
              text-decoration-none py-1 py-md-2"
              :to="{ name: 'Cart'}"
              v-if="cartLength !== 0">
              <i class="fas fa-arrow-left"></i>
              上一步，編輯購物清單</router-link>
          </div>
          <div class="text-center my-2 d-md-none"
            v-if="cartLength === 0">
            <router-link class="text-brown font-weight-bold hover--shadowLine"
              :to="{ name: 'Home' }">
              <i class="fas fa-arrow-left"></i> 回到 Home 首頁</router-link>
          </div>
        </div>
        <!-- 訂單內容 -->
        <div class="col-md-5 d-none d-md-block" data-aos="fade-down" data-aos-delay="150">
          <div class="card p-4 shadow mb-6">
            <h4 class="h5 text-base text-center pb-4 border-bottom border-light
              d-flex justify-content-center">訂 單 內 容
              <span class="badge badge-pill badge-warning text-white ml-2">{{ cartLength }}</span>
            </h4>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">商品</th>
                  <th scope="col" class="text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in carts.carts" :key="cart.id">
                  <td>{{ cart.product.title }} x {{ cart.qty }}</td>
                  <td class="text-right">{{ cart.product.price | currency }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">總計</td>
                  <td class="h5 text-right text-dark font-family-roboto">
                    {{ carts.total | currency }}</td>
                </tr>
                <tr v-if="carts.total!==carts.final_total">
                  <td class="font-weight-bold align-middle">折扣價
                    <span class="text-success font-sm font-weight-normal">(已套用優惠券)</span></td>
                  <td class="h3 text-right text-success font-family-roboto">
                    {{ carts.final_total | currency }}</td>
                </tr>
              </tbody>
            </table>
            <div class="m-4">
              <button class="btn btn-block btn-warning btn-submit btn-lg rounded-0 text-white"
                :class="{'disabled': cartLength === 0}">
                送出訂單
                <i class="fas fa-arrow-right"></i>
              </button>
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
import { mapGetters } from 'vuex';

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
      form: {
        user: {},
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('cartModules', ['carts', 'cartLength']),
  },
  methods: {
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
    this.$store.dispatch('cartModules/getCart');
  },
};
</script>

<style scoped lang="scss">
.fa-chevron-down {
  top: 24px;
  right: 24px;
}
</style>
