<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
<!-- 購物車內容 -->
    <div class="btn-group">
      <button type="button" class="btn" data-toggle="dropdown">
        <i class="fas fa-shopping-cart fa-lg"></i>
        <span class="badge badge-pill badge-danger">{{Carts.length}}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <div class="p-2 px-sm-3">
          <h5 class="text-center">購物車清單</h5>
          <table class="table mb-2" style="min-width:270px">
            <tbody>
              <tr v-for="cart in Carts" :key="cart.id">
                <td class="px-1">
                  <a href="#" class="text-danger"
                    @click.prevent="removeProductToCart(cart.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
                <td class="px-1">{{ cart.product.title }}</td>
                <td class="px-1">{{ cart.qty }} {{ cart.product.unit }}</td>
                <td class="text-right px-1">{{ cart.total}} 元</td>
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
          <table class="table mb-2" style="min-width:270px">
            <tbody>
              <tr v-for="favorite in Favorites" :key="favorite.id">
                <td class="px-1">
                  <a class="text-danger"
                    @click.prevent="removeFavorite(favorite.id)">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
                <td class="px-1">{{ favorite.title }}</td>
                <td class="text-right px-1">{{ favorite.price}} 元</td>
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
<!-- 商品內容 -->
    <div style="max-width: 500px; margin: 0 auto;">
      <table class="table">
        <tr>
          <th>加入收藏：</th>
          <td v-if="!isFavorite(Product.id)">
            <button class="btn p-0"
              @click="addFavorite(Product.id, Product.title, Product.origin_price)">
              <i class="far fa-heart"></i> 收藏商品
            </button>
          </td>
          <td v-if="isFavorite(Product.id)" @click="removeFavorite(Product.id)">
            <button class="btn p-0"
              @click="removeFavorite(Product.id)">
              <i class="fas fa-heart"></i> 取消收藏
            </button>
          </td>
        </tr>
        <tr>
          <th>
            <label for="qty"></label>加入購物車：</th>
          <td>
            <select name="qty" id="qty" v-model="qty">
              <option value="0"  disabled >請選擇數量</option>
              <option :value="num" v-for="num in 10" :key="num">{{num}} {{Product.unit}}</option>
            </select>
          </td>
          <td>
            <button type="button" class="btn btn-primary"
              @click="addProductToCart(Product.id, qty)">加到購物車</button>
          </td>
        </tr>
        <tr><th>編號：</th><td>{{Product.id}}</td></tr>
        <tr><th>名稱：</th><td>{{Product.title}}</td></tr>
        <tr><th>分類：</th><td>{{Product.category}}</td></tr>
        <tr><th>內容：</th><td>{{Product.content}}</td></tr>
        <tr><th>描述：</th><td>{{Product.description}}</td></tr>
        <tr><th>售價：</th><td>{{Product.origin_price}}</td></tr>
        <tr><th>原價：</th><td>{{Product.price}}</td></tr>
        <tr><th>單位：</th><td>{{Product.unit}}</td></tr>
        <tr><th>是否啟用</th><td>{{Product.is_enabled}}</td></tr>
        <tr><th>圖片</th><td>
          <img style="height: 150px; background-size: cover; background-position: center"
            :src="Product.imageUrl" alt=""></td></tr>
      </table>
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
      productId: '',
      Product: {},
      Carts: {},
      Favorites: [],
      qty: '',
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/product/${vm.productId}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Product = JSON.parse(JSON.stringify(response.data.product));
          vm.isLoading = false;
        }
      });
    },
    addProductToCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      const product = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: product }).then((response) => {
        if (response.data.success) {
          vm.getCart();
        }
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
    this.productId = this.$route.params.productId;
    this.getProduct();
    this.getCart();
    this.getFavorite();
  },
};
</script>
