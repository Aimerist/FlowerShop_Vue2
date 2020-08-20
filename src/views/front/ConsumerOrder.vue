<template>
  <div class="container" >
    <div class="row justify-content-center my-4">
      <div class="col-md-6 mt-md-4">
        <div class="row border p-4 shadow justify-content-center">
          <div class="col-12">
            <table class="table">
              <tbody>
                <tr>
                  <th class="border-0" width="120">下單日期</th>
                  <td class="border-0">{{order.create_at|date}}</td>
                </tr>
                <tr>
                  <th>訂單編號</th>
                  <td>{{order.id}}</td>
                </tr>
                <tr>
                  <th>姓名</th>
                  <td>{{order.user.name}}</td>
                </tr>
                <tr>
                  <th>信箱</th>
                  <td>{{order.user.email}}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{order.user.tel}}</td>
                </tr>
                <tr>
                  <th>收件地址</th>
                  <td>{{order.user.address}}</td>
                </tr>
                <tr v-if="order.message">
                  <th>留言</th>
                  <td>{{order.message}}</td>
                </tr>
                <tr>
                  <th>訂單金額</th>
                  <td>{{order.total|currency}}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span class="text-success" v-if="order.is_paid">
                      {{order.paid_date|date}} <strong>完成付款</strong>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-5">
            <div class="text-right">
              <button class="btn btn-danger btn-block"
                v-if="!order.is_paid"
                @click="payOrder">確認付款</button>
            </div>
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
      order: {
        user: { },
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/order/${vm.order.id}`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order;
        }
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/pay/${vm.order.id}`;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.getOrder();
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
