<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h3 class="h3">訂單列表</h3>
    </div>
    <table class="table table-hover text-left">
      <thead>
        <tr>
          <th class="" scope="col-1">是否付款</th>
          <th class="d-lg-table-cell d-none" scope="col">訂單編號</th>
          <th class="" scope="col">購買品項</th>
          <th class="d-sm-table-cell d-none" scope="col">應付金額</th>
          <th class="d-lg-table-cell d-none" scope="col">購買時間</th>
          <th class="d-xl-table-cell d-none" scope="col">留言</th>
          <th class="" scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Orders" :key="item.id">
          <td scope="row" class="align-middle">
            <span v-if="item.is_paid" class="text-success">付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
          <td scope="row" class="d-lg-table-cell d-none align-middle">{{item.id}}</td>
          <td scope="row" class="align-middle">
            <ul class="m-0 p-0" v-for="(product, i) in item.products" :key="i">
              <li scope="row" class="list-unstyled">{{ product.product.title }}</li>
            </ul>
          </td>
          <td scope="row" class="d-sm-table-cell d-none align-middle">{{item.total | currency}}</td>
          <td scope="row" class="d-lg-table-cell d-none align-middle">{{item.create_at | date}}</td>
          <td scope="row" class="d-xl-table-cell d-none align-middle">{{item.message}}</td>
          <td scope="row" class="align-middle">
            <button class="btn btn-outline-info btn-sm">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :page="Page" @ChanePageKey="getOrderList"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      Orders: {},
      Page: {},
    };
  },
  methods: {
    getOrderList(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/orders?page=${page}`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Orders = response.data.orders;
          vm.Page = response.data.pagination;
        }
      });
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>
