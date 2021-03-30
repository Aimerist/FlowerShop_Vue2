<template>
  <div class="back-grid-setting d-flex flex-column justify-content-between">
    <main>
      <div class="d-flex align-items-center justify-content-between
        mt-4 mb-6 mx-md-4">
        <h2 class="h4 text-dark">Coupon List</h2>
        <button class="btn ml-8 font-weight-bold hover--colorPrimary"
          @click="openModal(true)">
          <span class="fas fa-plus mr-1 text-primary"></span>
          Add
          <span class="d-none d-md-inline hover--colorPrimary">New Coupon</span>
        </button>
      </div>
      <table class="table text-center">
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
        <tbody>
          <tr class="cursor-pointer hover--shadow"
            v-for="item in coupons" :key="item.id"
            @click="detailModal(item)">
            <td class="d-sm-table-cell d-none align-middle">
              <span v-if="item.is_enabled" class="text-success">啟動</span>
              <span v-else class="text-danger">未啟動</span></td>
            <td scope="row" class="align-middle text-left">
              {{ item.title }}</td>
            <td class="d-lg-table-cell d-none align-middle text-left">
              {{ item.code }}</td>
            <td class="align-middle">
              {{ item.percent | percentage }}</td>
            <td class="d-md-table-cell d-none align-middle">
              {{ item.due_date | date }}</td>
            <th class="align-middle">
              <button class="btn btn-sm hover--colorPrimary"
                @click.stop="openModal(false, item)">
                <span class="fas fa-pen fa-lg"></span>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </main>
    <Pagination :page="page" @ChanePageKey="getCoupons"></Pagination>
    <!-- Modal -->
    <!-- Updata Modal -->
    <div class="modal fade" id="updataModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <ValidationObserver ref="form">
        <form class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark">
              <h5 class="modal-title font-weight-normal" id="exampleModalLabel">
                <span class="font-weight-bold" v-if="isCreate">New</span>
                <span class="font-weight-bold" v-else>Edit</span>
                Coupon
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm text-left">
                  <div class="form-row">
                    <div class="form-group  col-md-6">
                      <label for="title">名稱</label>
                      <ValidationProvider name="名稱" rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control" id="title"
                        v-model="tempCoupon.title" placeholder="請輸入名稱">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group  col-md-6">
                      <label for="code">優惠碼</label>
                      <ValidationProvider name="優惠碼" rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control" id="code"
                          v-model="tempCoupon.code" placeholder="請輸入優惠卷的代碼">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="percent">折扣百分比</label>
                      <ValidationProvider name="折扣" rules="required"
                        v-slot="{ errors }">
                        <input type="text" class="form-control" id="percent"
                          v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="due_date">到期日期</label>
                      <ValidationProvider name="日期" rules="required" v-slot="{ errors }">
                        <input type="date" class="form-control" id="due_date"
                          v-model="tempCoupon.due_date" placeholder="請輸入到期日">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <hr class="d-none d-sm-block">
                  <div class="form-group mb-0 mb-sm-4">
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
                <div class="col d-sm-none mb-3" v-if="!isCreate">
                  <hr>
                  <p class="text-danger mb-1">
                    <span class="fas fa-exclamation-triangle mr-1"></span>
                    刪除優惠</p>
                  <a class="btn btn-outline-danger btn-block font-weight-bold font-family-raleway"
                    href="#" type="button" data-dismiss="modal"
                    @click="openModal(false, tempCoupon, true)">
                    Delete This Coupon !</a>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <a v-if="!isCreate" type="button" href="#" data-dismiss="modal"
                class="btn text-danger font-weight-bold d-none d-sm-block"
                @click="openModal(false, tempCoupon, true)">
                <span class="fas fa-exclamation-triangle"></span>
                Delete This Coupon !</a>
              <div class="ml-auto">
                <button type="button" class="btn btn btn-outline-gray m-1"
                  data-dismiss="modal">Cancle</button>
                <button type="submit" class="btn modal-btn m-1" v-if="isCreate"
                  @click="updataCoupon">
                  <i class="fas fa-spinner fa-spin mx-1"
                    v-if="status.itemLodingId === true"></i>
                    Add</button>
                <button type="submit" class="btn modal-btn m-1" v-else
                  @click="updataCoupon">
                  <i class="fas fa-spinner fa-spin mx-1"
                    v-if="status.itemLodingId === true"></i>
                    Update</button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!-- Del Modal -->
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger">
            <h5 class="modal-title font-weight-normal text-white" id="exampleModalLabel">
              <span class="font-weight-bold">Del</span>
              Coupon
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger mb-2">
              <span class="fas fa-exclamation-triangle mr-1"></span>
              刪除後將無法恢復 !</p>
            <p>是否刪除<strong class="text-black">【 {{ tempCoupon.title }} 】</strong>這項優惠。
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-gray" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger font-weight-bold"
              @click="delCoupon(tempCoupon.id)">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1"
      aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-body pt-6">
            <button type="button" data-dismiss="modal" aria-label="Close"
              class="close position-absolute text-secondary focus--outline-none">
              <i class="fas fa-times"></i>
            </button>
            <div class="d-flex align-items-center mb-3">
              <h3 class="font-h5 text-black mr-2">{{ tempCoupon.title }}</h3>
              <h4 class="font-h6 text-dark">
                <span class="badge badge-pill badge-primary h5 py-1 d-flex align-items-center"
                  v-if="tempCoupon.is_enabled">
                  <i class="fas fa-check mr-1"></i>
                  Public</span>
                <span class="badge badge-pill badge-primary h5 py-1 d-flex align-items-center"
                  v-else>
                  <i class="fas fa-lock mr-1"></i>
                  Private</span>
              </h4>
            </div>
            <div class="px-2">
              <table class="table table-sm mb-1">
                <tbody>
                  <tr>
                    <th class="text-center border-primary">折扣</th>
                    <td class="border-primary">{{ tempCoupon.percent | percentage }}</td>
                  </tr>
                  <tr>
                    <th class="text-center">序號</th>
                    <td>{{ tempCoupon.code }}</td>
                  </tr>
                  <tr>
                    <th class="text-center">期限</th>
                    <td>{{ tempCoupon.due_date | date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between py-1">
            <a type="button" href="#" data-dismiss="modal"
              class="font-xs text-danger font-weight-bold text-decoration-none"
              @click="openModal(false, tempCoupon, true)">
              <span class="fas fa-exclamation-triangle"></span>
              Delete This Coupon</a>
            <button type="button" data-dismiss="modal"
              class="font-sm font-h6-xs btn btn-dark font-weight-bold m-1 px-2 px-xs-3 ml-auto"
              @click="openModal(false, tempCoupon)">
              Edit <span class="font-weight-normal">coupon</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import percentage from '@/filters/percentage';
import { mapActions, mapGetters } from 'vuex';

extend('required', {
  ...required,
  message: '{_field_} 欄位不得留空',
});

export default {
  components: {
    Pagination,
    ValidationProvider,
    ValidationObserver,
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
        this.isCreate = isCreate;
        if (isCreate) {
          this.$store.state.couponModules.tempCoupon = {};
        } else {
          this.$store.state.couponModules.tempCoupon = { ...coupon };
          this.$store.commit('couponModules/DUE_DATE_FORMAT', coupon.due_date);
        }
        $('#updataModal').modal('show');
      }
    },
    detailModal(coupon) {
      this.$store.state.couponModules.tempCoupon = { ...coupon };
      $('#detailModal').modal('show');
    },
    updataCoupon() {
      const vm = this;
      vm.$refs.form.validate().then((valid) => {
        if (valid) {
          vm.$store.dispatch('couponModules/updataCoupon', vm.isCreate);
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
    this.getCoupons();
  },
};
</script>
