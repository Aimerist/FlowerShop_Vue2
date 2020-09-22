<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h2 class="ml-5 my-2 font-weight-bold text-primary">訂單列表</h2>
    </div>
    <table class="table table-hover text-left">
      <thead>
        <tr>
          <th class="text-center" scope="col">是否付款</th>
          <th class="d-lg-table-cell d-none" scope="col">訂單編號</th>
          <th class="" scope="col">購買品項</th>
          <th class="d-sm-table-cell d-none text-right" scope="col">應付金額</th>
          <th class="d-lg-table-cell d-none" scope="col">購買時間</th>
          <th class="d-xl-table-cell d-none" scope="col">留言</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td scope="row" class="align-middle text-center">
            <span v-if="item.is_paid" class="text-success">付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
          <td scope="row" class="d-lg-table-cell d-none align-middle">{{item.id}}</td>
          <td scope="row" class="align-middle">
            <ul class="m-0 p-0" v-for="(product, i) in item.products" :key="i">
              <li scope="row" class="list-unstyled">{{ product.product.title }}</li>
            </ul>
          </td>
          <td scope="row" class="d-sm-table-cell d-none align-middle text-right">
            {{item.total | currency}}</td>
          <td scope="row" class="d-lg-table-cell d-none align-middle">{{item.create_at | date}}</td>
          <td scope="row" class="d-xl-table-cell d-none align-middle">
            {{item.message | contentLength(6)}}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :page="page" @ChanePageKey="getOrderList"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import { mapGetters } from 'vuex';
import contentLength from '@/filters/stringlenght';

export default {
  filters: {
    contentLength,
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(['page']),
    ...mapGetters('orderModules', ['orders']),
  },
  methods: {
    getOrderList(page) {
      this.$store.dispatch('orderModules/getOrderList', page);
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>
