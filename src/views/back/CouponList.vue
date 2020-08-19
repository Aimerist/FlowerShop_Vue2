<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h3 class="h3">折價卷列表</h3>
      <button class="btn btn-success mr-5"
        @click="openCouponModal(true)">新增折價卷</button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col" class="d-lg-table-cell d-none">優惠碼</th>
          <th scope="col" class="d-sm-table-cell d-none">折扣百分比</th>
          <th scope="col" class="d-md-table-cell d-none">到期日期</th>
          <th scope="col" class="d-sm-table-cell d-none">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Coupons" :key="item.id">
          <td scope="row" class="align-middle">
            {{item.title}}</td>
          <td class="d-lg-table-cell d-none align-middle">
            {{item.code}}</td>
          <td class="d-sm-table-cell d-none align-middle">
            {{item.percent | percentage}}</td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.due_date | date}}</td>
          <td class="d-sm-table-cell d-none align-middle">
            <span v-if="item.is_enabled" class="text-success">啟動</span>
            <span v-else class="text-secondary">未啟動</span></td>
          <th class="align-middle">
            <button class="btn btn-outline-info btn-sm mr-1"
              @click="openCouponModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)">刪除</button>
          </th>
        </tr>
      </tbody>
    </table>
    <Pagination :page="Page" @ChanePageKey="getCoupons"></Pagination>
    <!-- Coupon Modal -->
    <div class="modal fade" id="addCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isCreate">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm text-left">
                <div class="form-row">
                  <div class="form-group  col-md-6">
                    <label for="title">名稱</label>
                    <input type="text" class="form-control" id="title"
                      v-model="tempCoupon.title" placeholder="請輸入名稱">
                  </div>
                  <div class="form-group  col-md-6">
                    <label for="code">優惠碼</label>
                    <input type="text" class="form-control" id="code"
                      v-model="tempCoupon.code" placeholder="請輸入優惠卷的代碼">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input type="text" class="form-control" id="percent"
                      v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日期</label>
                    <input type="date" class="form-control" id="due_date"
                      v-model="tempCoupon.due_date" placeholder="請輸入到期日">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempCoupon.is_enabled" id="is_enabled"
                      :true-value="1" :fasle-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary"
              @click="updataCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Del Coupon Modal -->
    <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠卷</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="delCoupon(tempCoupon.id)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import percentage from '@/filters/percentage';

export default {
  components: {
    Pagination,
  },
  filters: {
    percentage,
  },
  data() {
    return {
      Coupons: [],
      tempCoupon: {},
      isCreate: true,
      Page: {},
    };
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupons?page=${page}`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Coupons = response.data.coupons;
          vm.Page = response.data.pagination;
        }
      });
    },
    openCouponModal(isCreate, item) {
      if (isCreate) {
        this.isCreate = true;
        this.tempCoupon = {};
      } else {
        this.isCreate = false;
        this.tempCoupon = item;
      }
      $('#addCouponModal').modal('show');
    },
    openDelCouponModal(item) {
      $('#delCouponModal').modal('show');
      this.tempCoupon = item;
    },
    updataCoupon() {
      const vm = this;
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon`;
      let apiMethd = 'post';
      if (!vm.isCreate) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        apiMethd = 'put';
      }
      vm.tempCoupon.due_date = Math.floor(new Date(vm.tempCoupon.due_date) / 1000);
      vm.$http[apiMethd](url, { data: vm.tempCoupon }).then((response) => {
        if (response.data.success) {
          $('#addCouponModal').modal('hide');
          vm.getCoupons();
        }
      });
    },
    delCoupon(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/coupon/${id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.getCoupons();
          $('#delCouponModal').modal('hide');
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
