<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
<!-- 購物車內容 -->
    <div class="btn-group" :class="{'show': isShowCart}">
      <button type="button" class="btn" data-toggle="dropdown">
        <i class="fas fa-shopping-cart fa-lg"></i>
        <span class="badge badge-pill badge-danger">{{Carts.length}}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right" :class="{'show': isShowCart}">
        <div class="p-2 px-sm-3">
          <h5 class="text-center">購物車清單</h5>
          <table class="table mb-2 table-hover" style="min-width:270px">
            <tbody>
              <tr v-for="cart in Carts" :key="cart.id" class="clicktable-row"
                @click="productLink(cart.product_id)">
                <td class="px-1">
                  <a href="#" class="text-danger"
                    @click.stop.prevent="removeProductToCart(cart.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
                <td class="px-1">{{ cart.product.title }}</td>
                <td class="px-1">{{ cart.qty }} {{ cart.product.unit }}</td>
                <td class="text-right px-1">{{ cart.total | currency }}</td>
              </tr>
              <tr>
                <td class="text-center" v-if="Carts.length===0">去購物吧!</td>
              </tr>
            </tbody>
          </table>
          <router-link to="/checkorder" class="btn btn-outline-danger d-block mb-2"
            v-if="Carts.length">
            <i class="fas fa-cart-arrow-down"></i> 結帳去
          </router-link>
        </div>
      </div>
    </div>
<!-- 收藏內容 -->
    <div class="btn-group">
      <button type="button" class="btn" data-toggle="dropdown">
        <i class="fas fa-heart fa-lg"></i>
        <span class="badge badge-pill badge-danger">{{Favorites.length}}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="p-2 px-sm-3">
          <h5 class="text-center">收藏清單</h5>
          <table class="table mb-2 table-hover" style="min-width:270px">
            <tbody>
              <tr v-for="favorite in Favorites" :key="favorite.id" class="clicktable-row"
                @click="productLink(favorite.id)">
                <td class="px-1">
                  <a class="text-danger"
                    @click.stop.prevent="removeFavorite(favorite.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
                <td class="px-1">{{ favorite.title }}</td>
                <td class="text-right px-1">{{ favorite.price | currency }}</td>
              </tr>
              <tr>
                <td class="text-center" v-if="Favorites.length===0">快去加入收藏吧!</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-outline-danger btn-block"
            v-if="Favorites.length!==0"
            data-toggle="modal" data-target="#delFavoriteModal">
            刪除全部</button>
        </div>
      </div>
    </div>
<!-- 商品類別 -->
    <ul>
      <li class="list-unstyled">
        <button class="btn btn-outline-info btn-sm"
          :class="{active: nowCategoryStatus === ''}"
          @click="nowCategoryStatus=''"
          >全部顯示</button>
        <button class="btn btn-outline-info btn-sm"
          :class="{active: nowCategoryStatus === `${category}`}"
          @click="nowCategoryStatus=`${category}`"
          v-for="category in Categories" :key="category"
          >{{ category }}</button>
      </li>
    </ul>
<!-- 產品列表 -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4"
       v-for="item in filterData" :key="item.id">
        <div class="border-0 shadow-sm">
          <img style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          <div>
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <router-link class="text-dark"
                :to="{ name: 'ProductDetail', params: { productId: `${item.id}` }}">
                {{ item.title }}</router-link>
            </h5>
            <p>{{ item.conext }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{ item.price | currency }}</del>
              <div class="h5">特價 {{ item.origin_price | currency }}</div>
            </div>
          </div>
          <div class="d-flex">
            <router-link type="button" class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'ProductDetail', params: { productId: `${item.id}` }}">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </router-link>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addProductToCart(item.id)">
              <!-- <i class="fas fa-spinner fa-spin"></i> -->
              加到購物車
            </button>
            <button class="btn" v-if="!isFavorite(item.id)"
              @click="addFavorite(item.id, item.title, item.price)">
              <i class="far fa-heart"></i></button>
            <button class="btn" v-if="isFavorite(item.id)"
              @click="removeFavorite(item.id)">
              <i class="fas fa-heart"></i></button>
          </div>
        </div>
      </div>
    </div>
<!-- delFavoriteModal -->
    <div class="modal fade" id="delFavoriteModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">全部收藏</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="deletAllFavorite">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      Products: [],
      Carts: {},
      Favorites: [],
      Categories: [],
      nowCategoryStatus: '',
      isLoading: false,
      isShowCart: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Products = JSON.parse(JSON.stringify(response.data.products))
            .filter((item) => item.is_enabled);
          vm.Categories = vm.Products
            .map((item) => item.category)
            .filter((item, index, arr) => arr.indexOf(item) === index);
          vm.isLoading = false;
        }
      });
    },
    productLink(id) {
      this.$router.push({ name: 'ProductDetail', params: { productId: id } });
    },
    addProductToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      const product = {
        product_id: id,
        qty,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: product }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          vm.getCart();
        }
      }).then(() => {
        vm.isShowCart = true;
        setTimeout(() => {
          vm.isShowCart = false;
        }, 3000);
      });
    },
    removeProductToCart(id) {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart/${id}`;
      this.$http.delete(url).then(() => {
        this.getCart();
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Carts = JSON.parse(JSON.stringify(response.data.data.carts));
        }
      });
    },
    getFavorite() {
      this.Favorites = JSON.parse(localStorage.getItem('favoriteData')) || [];
    },
    addFavorite(id, title, price) {
      if (!this.isFavorite(id)) {
        this.Favorites.push({ id, title, price });
        localStorage.setItem('favoriteData', JSON.stringify(this.Favorites));
      } else {
        alert('已經加入過了唷', this.Favorites);
      }
    },
    isFavorite(id) {
      if (this.Favorites.some((item) => item.id === id)) {
        return true;
      }
      return false;
    },
    removeFavorite(id) {
      if (this.isFavorite(id)) {
        this.Favorites.splice(this.Favorites.indexOf(id), 1);
        localStorage.setItem('favoriteData', JSON.stringify(this.Favorites));
      } else {
        alert('目前並被沒有收藏唷', this.Favorites);
      }
    },
    deletAllFavorite() {
      localStorage.removeItem('favoriteData');
      this.getFavorite();
      $('#delFavoriteModal').modal('hide');
    },
  },
  created() {
    this.getProducts();
    this.getCart();
    this.getFavorite();
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.nowCategoryStatus) {
        return vm.Products.filter((item) => item.category === vm.nowCategoryStatus);
      }
      return vm.Products;
    },
  },
};
</script>

<style>
.clicktable-row {
  cursor: pointer;
}
</style>
