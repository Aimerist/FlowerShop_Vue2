<template>
  <div class="back-grid-setting d-flex flex-column justify-content-between">
    <main>
      <h2 class="h4 text-dark mt-4 mb-6 mx-md-4">Order List</h2>
      <table class="table text-left">
        <thead>
          <tr>
            <th scope="col" class="text-center">是否付款</th>
            <th scope="col" class="d-sm-table-cell d-none text-right">訂單總額</th>
            <th scope="col" class="pl-sm-8 pl-lg-12 text-center text-sm-left">訂單編號</th>
            <th scope="col" class="d-lg-table-cell d-none">下單時間</th>
            <th scope="col" class="d-sm-table-cell d-none">購買品項</th>
            <th scope="col" class="d-xl-table-cell d-none">留言</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id" class="hover--shadow">
            <td class="text-center">
              <span v-if="item.is_paid" class="text-success">已付</span>
              <span v-else class="text-danger">未付</span>
            </td>
            <td class="d-sm-table-cell d-none text-right">
              {{item.total | currency}}</td>
            <td class="pl-sm-8 pl-lg-12 text-center text-sm-left"
              :class="{'text-danger':!item.is_paid}">
              {{item.id}}</td>
            <td class="d-lg-table-cell d-none">
              {{item.create_at | date}}</td>
            <td class="align-middle d-none d-sm-table-cell">
              <ul class="m-0 p-0" v-for="(product, i) in item.products" :key="i">
                <li class="list-unstyled">{{ product.product.title }}</li>
              </ul>
            </td>
            <td class="d-xl-table-cell d-none">
              {{item.message | contentLength(6)}}</td>
          </tr>
        </tbody>
      </table>
    </main>
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
