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
              <li scope="row" class="list-unstyled">
                {{product.product.title}} x {{product.product.num}}</li>
            </ul>
          </td>
          <td scope="row" class="d-sm-table-cell d-none align-middle">{{item.total}}</td>
          <td scope="row" class="d-lg-table-cell d-none align-middle">{{item.create_at}}</td>
          <td scope="row" class="d-xl-table-cell d-none align-middle">{{item.message}}</td>
          <td scope="row" class="align-middle">
            <button class="btn btn-outline-info btn-sm"
              @click="openOrderModal(item.id)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單： {{tempOrder.id}}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group row">
                  <label for="create_at" class="col-4 col-form-label">下單時間：</label>
                  <div class="col-8">
                    <input type="text" readonly class="form-control-plaintext"
                      id="create_at" v-model="tempOrder.create_at">
                  </div>
                  <label for="total" class="col-4 col-form-label">應付金額：</label>
                  <div class="col-8">
                    <input type="text" readonly class="form-control-plaintext" id="total"
                      placeholder="請輸入標題" v-model="tempOrder.total">
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_paid"
                      v-model="tempOrder.is_paid">
                    <label class="form-check-label" for="is_paid">是否付款完成</label>
                  </div>
                </div>
                <hr>
                <div class="form-group row  text-left">
                  <label for="name" class="col-4 col-form-label">名稱：</label>
                  <div class="col-8 mt-1">
                    <input type="text" class="form-control mb-1"
                      id="name" v-model="tempOrder.user.name">
                  </div>
                  <label for="tel" class="col-4 col-form-label">聯絡方式：</label>
                  <div class="col-8">
                    <input type="text" class="form-control mb-1"
                      id="tel" v-model="tempOrder.user.tel">
                  </div>
                  <label for="email" class="col-4 col-form-label">Email：</label>
                  <div class="col-8">
                    <input type="text" class="form-control mb-1"
                      id="email" v-model="tempOrder.user.email">
                  </div>
                  <label for="tel" class="col-4 col-form-label">收件地址：</label>
                  <div class="col-8">
                    <input type="text" class="form-control mb-1"
                      id="tel" v-model="tempOrder.user.tel">
                  </div>
                  <label for="message" class="col-3 col-form-label">留言：</label>
                  <div class="col-9">
                    <textarea type="text" class="form-control mb-1" id="message"
                      v-model="tempOrder.user.message"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div v-for="(item, key) in isOrderProduct" :key="key">
                  <div class="form-group row">
                    <label for="title" class="col-3 col-form-label">商品：</label>
                    <div class="col-9">
                      <input type="text" readonly class="form-control-plaintext" id="title"
                        placeholder="請輸入標題" v-model="item.product.title">
                    </div>
                    <label for="title" class="col-3 col-form-label">編號：</label>
                    <div class="col-9">
                      <input type="text" readonly class="form-control-plaintext" id="title"
                        placeholder="請輸入標題" v-model="item.id">
                    </div>
                    <label for="title" class="col-3 col-form-label">數量：</label>
                    <div class="col-5">
                      <input type="text" class="form-control" id="title"
                        placeholder="請輸入標題" v-model="item.product.num">
                    </div>
                    <button class="col-1 btn"
                      @click="delProductToOrder(item.id)">
                      <i class="fas fa-trash-alt"></i></button>
                  </div>
                  <hr>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>
    <Pagination :page="Page" @ChanePageKey="getOrderList"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      Orders: {},
      tempOrder: {
        user: {},
        products: {},
      },
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
    openOrderModal(orderId) {
      const Order = this.Orders.find((item) => item.id === orderId);
      this.tempOrder = JSON.parse(JSON.stringify(Order));
      $('#orderModal').modal('show');
    },
    delProductToOrder(id) {
      // console.log(this.tempOrder.products.product.id.indexOf(id));
      delete this.tempOrder.products[id];
      console.log('methods', this.tempOrder.products);
    },
  },
  created() {
    this.getOrderList();
  },
  computed: {
    isOrderProduct() {
      console.log('computed', this.tempOrder.products);
      return this.tempOrder.products;
    },
  },
};
</script>
