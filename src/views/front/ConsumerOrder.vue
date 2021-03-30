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
        <span class="h4 text-secondary d-block py-md-1 font-family-roboto">
          <i class="fa fa-check"></i>
        </span>
        <p class="text-secondary">確認清單內容</p>
      </li>
      <li class="col-3 col-lg-2 text-center d-none d-md-block py-3 mx-2 bg-gray-100"
        data-aos="zoom-in" data-aos-delay="150">
        <span class="h6 text-secondary d-block">STOP</span>
        <span class="h4 text-secondary d-block py-md-1 font-family-roboto">
          <i class="fa fa-check"></i>
        </span>
        <p class="text-secondary">填寫訂購資料</p>
      </li>
      <li class="col-md-3 col-lg-2 text-center py-1 py-md-3 mx-4 mx-md-2
        bg-primary-300"
        data-aos="zoom-in" data-aos-delay="300">
        <span class="font-sm font-h6-md text-brown d-block font-weight-bold">STOP</span>
        <span class="h5 text-brown d-block py-md-1 font-family-roboto"
          v-if="order.is_paid">
          <i class="fa fa-check"></i>
        </span>
        <span class="h5 text-brown d-block py-md-1 font-family-roboto"
          v-else>03</span>
        <p class="font-sm font-h6-md text-brown">付款/完成訂單</p>
      </li>
    </ol>
    <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="150">
      <div class="col-md-7">
        <div class="bg-light text-center rounded-top
          d-md-flex align-items-center py-3 py-md-4 px-md-6">
          <p class="mx-2 mt-md-1">訂單編號：</p>
          <h2 class="h4 text-dark ml-lg-8 ml-xl-15">{{ order.id }}</h2>
        </div>
        <div class="p-2 px-xs-4 px-sm-6 shadow border border-light">
          <table class="table">
            <tbody>
              <tr class="border-0">
                <th class="border-0 text-nowrap">下單日期</th>
                <td class="border-0">{{ order.create_at | date }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr v-if="order.message">
                <th>留言</th>
                <td>{{ order.message }}</td>
              </tr>
              <tr>
                <th class="text-nowrap">訂單金額</th>
                <td>{{ order.total | currency }}</td>
              </tr>
              <tr>
                <th class="text-nowrap">付款狀態</th>
                <td class=" font-weight-bold text-success"
                  v-if="order.is_paid">付款完成</td>
                <td class=" font-weight-bold text-danger"
                  v-else>尚未付款</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center mx-2 mb-5">
            <button class="btn btn-warning btn-lg btn-block text-white"
              v-if="!order.is_paid"
              @click.prevent="payOrder">確認付款</button>
          </div>
        </div>
        <div class="text-center my-6">
          <router-link class="text-brown font-weight-bold hover--shadowLine"
            :to="{ name: 'Products' }">
            <i class="fas fa-arrow-left"></i> 回到 Flower Shop 購物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('orderModules', ['order', 'orderId']),
  },
  methods: {
    ...mapActions('orderModules', ['getOrder', 'payOrder']),
  },
  watch: {
    $route() {
      this.$store.commit('orderModules/ORDER_ID', this.$route.params.orderId);
      this.$store.dispatch('orderModules/getOrder');
    },
  },
  created() {
    this.$store.commit('orderModules/ORDER_ID', this.$route.params.orderId);
    this.$store.dispatch('orderModules/getOrder');
  },
};
</script>
