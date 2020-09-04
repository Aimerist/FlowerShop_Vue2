<template>
  <div class="container gap-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <ul class="mb-4 step">
      <li class="bg-light">
        <strong>STEP</strong>
        <h3><i aria-hidden="true" class="fa fa-check"></i></h3>
        <p class="h6">確認購物清單</p>
      </li>
      <li class="bg-light">
        <strong>STEP</strong>
        <h3><i aria-hidden="true" class="fa fa-check"></i></h3>
        <p class="h6">填寫訂購資料</p>
      </li>
      <li class="active">
        <strong>STEP</strong>
        <h3><strong>03</strong></h3>
        <p class="h6">付款/完成訂單</p>
      </li>
    </ul>
    <div class="row justify-content-center colorE">
      <div class="col-12 customerorder-title">
        <div class="row justify-content-center">
          <div class="col-md-6 p-3 bg-brownlight md-dis-none">
            <h4 class="text-center mb-0">付款 / 完成訂單</h4>
          </div>
        </div>
      </div>
      <div class="col-md-6 mt-md-3">
        <div class="row border shadow justify-content-center p-2 mb-4">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">下單日期</th>
                  <td class="border-0">{{ order.create_at | date }}</td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td class="font-weight-bold text-secondary">{{ order.id }}</td>
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
                  <th>收件人電話</th>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <th>收件人地址</th>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr v-if="order.message">
                  <th>留言</th>
                  <td>{{ order.message }}</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>{{ order.total | currency }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <strong class="text-danger"
                      v-if="!order.is_paid">尚未付款</strong>
                    <strong class="text-success"
                      v-if="order.is_paid">付款完成</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-5 pb-3">
            <a href="#" class="btn-block btn-submit mt-0 py-2 h5 rounded"
              v-if="!order.is_paid"
              @click="payOrder">確認付款去</a>
          </div>
        </div>
        <div class="btn-block text-center font-weight-bold">
          <a class="link-line text-brown" href="/detail.html">
            <i class="fas  fa-arrow-left"></i>
            回到 Flower Shop 購物去</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: { },
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/order/${vm.order.id}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order;
          vm.isLoading = false;
        }
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/pay/${vm.order.id}`;
      vm.isLoading = true;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          vm.isLoading = false;
          vm.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
  },
  created() {
    this.order.id = this.$route.params.orderId;
    this.getOrder();
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
</style>
