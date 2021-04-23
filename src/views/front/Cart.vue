<template>
  <div class="container-fluid container-lg grid-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <!-- 流程 -->
    <ol class="row justify-content-center list-unstyled mb-4 mb-md-6">
      <li class="col-md-3 col-lg-2 text-center py-1 py-md-3 mx-4 mx-md-2 bg-primary-300"
        data-aos="zoom-in">
        <span class="font-sm font-h6-md text-brown d-block font-weight-bold">STEP</span>
        <span class="h5 font-h4-md text-brown d-block py-md-1 font-family-roboto">01</span>
        <p class="font-sm font-h6-md text-brown">確認清單內容</p>
      </li>
      <li class="col-3 col-lg-2 text-center d-none d-md-block py-3 mx-2 bg-gray-100"
        data-aos="zoom-in" data-aos-delay="150">
        <span class="h6 text-secondary d-block">STEP</span>
        <span class="h4 text-secondary d-block py-md-1 font-family-roboto">02</span>
        <p class="text-secondary">填寫訂購資料</p>
      </li>
      <li class="col-3 col-lg-2 text-center d-none d-md-block py-3 mx-2 bg-gray-100"
        data-aos="zoom-in" data-aos-delay="300">
        <span class="h6 text-secondary d-block">STEP</span>
        <span class="h4 text-secondary d-block py-md-1 font-family-roboto">03</span>
        <p class="text-secondary">付款/完成訂單</p>
      </li>
    </ol>
    <div class="row justify-content-center">
      <!-- 購物車清單-->
      <div class="col-md-7" data-aos="fade-up" data-aos-delay="150">
        <!-- 沒有商品 -->
        <div class="jumbotron text-center rounded-0 mb-6"
          v-if="cartLength === 0">
          <div class="h4 text-base mb-5">購物車內無商品</div>
          <router-link class="btn btn-lg btn-primary py-1 mt-4 rounded-0"
            :to="{ name: 'Products' }" >
            前往購物</router-link>
        </div>
        <h2 class="h4 text-base bg-light text-center py-4 rounded-top"
          v-if="cartLength !== 0">購物清單</h2>
        <table class="table border border-light mb-6 table-hoverShadow"
          v-if="cartLength !== 0">
          <thead>
            <tr>
              <th class="text-center d-none d-xs-table-cell" scope="col"></th>
              <th class="text-left" scope="col">品名</th>
              <th class="text-center" scope="col">數量</th>
              <th class="text-center" scope="col">價格</th>
              <th class="text-right" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="cursor-pointer hover--shadow"
              v-for="cart in carts.carts" :key="cart.id"
              @click="productLink(cart.product_id)">
              <td class="table-img align-middle d-none d-xs-table-cell">
                <img class="img-cover"
                  :src="cart.product.imageUrl"
                  :alt="cart.product.title">
                  </td>
              <td class="align-middle">
                <span class="text-success line-height-1 d-none d-md-block font-sm"
                  v-if="cart.total!==cart.final_total">
                  (已折價)</span>
                <h3 class="h6 font-h5-sm text-base">
                  {{ cart.product.title }}
                  <span class="text-success d-none d-sm-inline d-md-none font-xs"
                    v-if="cart.total!==cart.final_total">(已折價)</span>
                </h3>
              </td>
              <td class="align-middle text-center font-xs font-sm-sm font-h6-md">
                {{ cart.qty }}/{{ cart.product.unit }}
              </td>
              <td class="align-middle text-center text-dark h6 font-h5-sm font-family-roboto">
                {{ cart.final_total | currency }}
              </td>
              <td class="align-middle text-center" width="20">
                <a class="btn text-danger btn-del pl-1"
                  @click.stop.prevent="removeCart(cart.id)">
                  <i class="fas fa-spinner fa-spin"
                  v-if="status.itemLodingId === cart.id"></i>
                  <i class="fas fa-trash-alt" v-else></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="btn-light text-center text-decoration-none d-none d-md-block py-2 my-6"
          :to="{ name: 'Products' }"
          v-if="cartLength !== 0">
          <i class="fas fa-arrow-left"></i>
           返回商店</router-link>
      </div>
      <!-- 購物車合計-折價券-->
      <div class="col-md-5" data-aos="fade-down" data-aos-delay="150">
        <div class="card p-4 shadow mb-6">
          <h4 class="h5 text-base text-center border-bottom d-flex justify-content-center pb-4">
            購 物 車 合 計
            <span class="badge badge-pill badge-warning text-white ml-2">
              {{ cartLength }}</span>
          </h4>
          <div class="card-body">
            <div class="d-flex mb-3">
              <h5 class="text-base">總計</h5>
              <span class="h5 ml-auto text-dark font-family-roboto">
                {{ carts.total | currency }}</span>
            </div>
            <div class="d-flex align-items-end mb-4 text-nowrap"
              v-if="carts.total!==carts.final_total">
              <p class="text-base line-height-1">折扣價
                <span class="text-success d-block font-xs">
                  使用『 OPEN80OFF 』優惠</span>
              </p>
              <h4 class="h3 ml-auto text-success font-family-roboto">
                {{ carts.final_total | currency }}</h4>
            </div>
            <div class="input-group mb-1">
              <input type="text" class="form-control"
                placeholder="請輸入優惠序號"
                aria-label="add Coupon Code"
                v-model="couponCode">
              <div class="input-group-append">
                <a class="btn btn-outline-secondary py-2" href="#"
                  @click.prevent="addCouponCode"
                  :class="{ 'disabled': cartLength === 0 }">使用優惠</a>
              </div>
            </div>
            <p class="text-info line-height-1 mb-5 font-xs">
              現在輸入『 OPEN80OFF 』即可享有全館 8 折優惠喔 !
            </p>
            <router-link class="btn btn-sm-sm btn-block btn-warning btn-lg rounded-0 text-white"
              :to="{ name: 'ConsumerForm' }"
              :class="{ 'disabled': cartLength === 0 }">
              確認商品
              <i class="fas  fa-arrow-right"></i>
            </router-link>
          </div>
        </div>
        <div class="px-8 my-6">
          <router-link class="d-block btn-light py-2 text-center text-decoration-none d-md-none"
            :to="{ name: 'Products' }"
            v-if="cartLength !== 0">
            <i class="fas fa-arrow-left"></i>
             返回商店</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('cartModules', ['carts', 'cartLength']),
    couponCode: {
      get () {
        return this.$store.state.couponModules.couponCode
      },
      set (value) {
        this.$store.commit('couponModules/COUPON_CODE', value)
      }
    }
  },
  methods: {
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    addCouponCode () {
      this.$store.dispatch('couponModules/useCouponCode')
    },
    productLink (id) {
      if (this.$route.params.productId !== id) {
        this.$router.push({ name: 'ProductDetail', params: { productId: id } })
      } else {
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '您已在本頁', status: 'warning' }
        )
      }
    }
  },
  created () {
    this.$store.dispatch('cartModules/getCart')
  }
}
</script>

<style scoped lang="scss">
.btn-del {
  padding-top: 0;
  padding-bottom: 0;
  &:hover,
  &:focus {
    padding-right: 9px;
    font-size: 1.2rem;
  }
}
</style>
