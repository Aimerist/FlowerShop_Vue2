<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h2 class="ml-4 my-2 font-weight-bold text-primary">折價卷列表</h2>
      <button class="btn btn-success mr-5"
        @click="openModal(true)">新增折價卷</button>
    </div>
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th scope="col" class="d-sm-table-cell d-none">是否啟用</th>
          <th scope="col" class="text-left">名稱</th>
          <th scope="col" class="d-lg-table-cell d-none text-left">優惠碼</th>
          <th scope="col">折扣 %</th>
          <th scope="col" class="d-md-table-cell d-none">到期日期</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody class="text-dark">
        <tr v-for="item in coupons" :key="item.id">
          <td class="d-sm-table-cell d-none align-middle">
            <span v-if="item.is_enabled" class="text-success">啟動</span>
            <span v-else class="text-danger">未啟動</span></td>
          <td scope="row" class="align-middle text-left">
            {{item.title}}</td>
          <td class="d-lg-table-cell d-none align-middle text-left">
            {{item.code}}</td>
          <td class="align-middle">
            {{item.percent | percentage}}</td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.due_date | date}}</td>
          <th class="align-middle">
            <button class="btn btn-outline-info btn-sm mr-1"
              @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openModal(false, item, true)">刪除</button>
          </th>
        </tr>
      </tbody>
    </table>
    <Pagination :page="page" @ChanePageKey="getCoupons"></Pagination>
    <!-- Coupon Modal -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-success text-white"
            :class="{ 'bg-info': !isCreate }">
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
            <button type="button" class="btn btn btn-outline-gray" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-success" v-if="isCreate"
              @click="updataCoupon">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認新增</button>
            <button type="button" class="btn btn-info" v-else
              @click="updataCoupon">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認編輯</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Del Coupon Modal -->
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠卷。
            <em class="text-gray f-size75">(刪除後將無法恢復 )</em>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-gray" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="delCoupon(tempCoupon.id)">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認刪除</button>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Pagination,
  },
  filters: {
    percentage,
  },
  data() {
    return {
      isCreate: true,
    };
  },
  computed: {
    ...mapGetters(['page', 'status']),
    ...mapGetters('couponModules', ['coupons', 'tempCoupon']),
  },
  methods: {
    ...mapActions('couponModules', ['delCoupon']),
    getCoupons(page) {
      this.$store.dispatch('couponModules/getCoupons', page);
    },
    openModal(isCreate, coupon, isDelete = false) {
      if (isDelete) {
        $('#delModal').modal('show');
        this.$store.state.couponModules.tempCoupon = { ...coupon };
      } else {
        if (isCreate) {
          this.isCreate = true;
          this.$store.state.couponModules.tempCoupon = {};
        } else {
          this.isCreate = false;
          this.$store.state.couponModules.tempCoupon = { ...coupon };
        }
        $('#addModal').modal('show');
      }
    },
    updataCoupon() {
      this.$store.dispatch('couponModules/updataCoupon', this.isCreate);
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
