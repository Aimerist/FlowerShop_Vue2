<template>
  <div class="container gap-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

<!-- 商品內容 -->
    <div class="row">
      <!-- 商品圖片 section-->
      <div class="col-md-7 mb-5">
        <img class="img-fluid img-cover"
          :src="Product.imageUrl">
      </div>
      <!-- 商品資訊 section-->
      <div class="col-md-5">
        <div class="px-4">
          <div class="favorite p-1 float-right text-danger">
            <a v-if="!isFavorite(Product.id)"
              @click.prevent="addFavorite(Product.id, Product.title, Product.origin_price)">
              <i class="far fa-heart fa-lg"></i>
            </a>
            <a v-if="isFavorite(Product.id)"
              @click.prevent="removeFavorite(Product.id)">
              <i class="fas fa-heart fa-lg"></i>
            </a>
          </div>
          <h2 class="mb-2 text-primary font-weight-bold">{{ Product.title }}
            <span class="h5 text-muted">| {{ Product.category }}</span></h2>
          <div class="p-2 text-brown" v-if="Product.content">
            <h6>【商品介紹】</h6>
            <p class="pl-2"> {{ Product.content }} </p>
          </div>
          <div class="p-2 text-brown" v-if="Product.description">
            <h6>【商品描述】</h6>
            <p class="pl-2"> {{ Product.description }} </p>
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
                      @click.prevent="getProduct(cart.product_id)">
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
                      @click="getProduct(favorite.id)">
                      <td class="px-1">
                        <a class="text-danger"
                          @click.stop.prevent="removeFavorite(favorite.id)">
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </td>
                      <td class="px-1">{{ favorite.title }}</td>
                      <td class="text-right px-1">{{ favorite.price | currency}}</td>
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
          <hr>
          <div class="d-flex align-items-baseline px-2 pb-3">
            <p class="text-gray mb-0">原價 <del>{{ Product.origin_price | currency }}</del></p>
            <p class="ml-auto h3 text-dark">NT {{ Product.price | currency }}</p>
          </div>
          <div class="row mx-0 no-gutters">
            <div class="col-lg-5 mr-auto mb-3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <a href="#" class="btn btn-outline-graylight"
                    :class="{'disabled':qty ===1}"
                    @click.prevent="qty = qty - 1">−</a>
                </div>
                <input type="number" min="1" max="15" class="form-control text-center"
                  v-model.number="qty"/>
                <div class="input-group-append">
                  <a href="#" class="btn btn-outline-graylight"
                    :class="{'disabled':qty ===15}"
                    @click.prevent="qty = qty + 1">+</a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <button class="btn btn-block btn-add py-2 text-secondary"
                @click="addProductToCart(Product.id, qty)">
                加到購物車<i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 相關商品 -->
      <div class="col-12 similar">
        <div class="similar-line">
          <span class="similar-titlet">相關商品</span>
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
      productId: '',
      Product: {},
      Carts: {},
      Favorites: [],
      qty: 1,
      isLoading: false,
      isShowCart: false,
    };
  },
  methods: {
    getProduct(id = this.productId) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/product/${id}`;
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
      vm.isLoading = true;
      vm.$http.post(url, { data: product }).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          vm.getCart();
          vm.$bus.$emit('message:push', '已加入購物車', 'success');
        }
      }).then(() => {
        vm.isShowCart = true;
        setTimeout(() => {
          vm.isShowCart = false;
        }, 3000);
      });
    },
    removeProductToCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart/${id}`;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        vm.$bus.$emit('message:push', response.data.message, 'warning');
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
        this.$bus.$emit('message:push', '已加入收藏夾', 'success');
      } else {
        this.$bus.$emit('message:push', '已經加入過收藏夾了唷', 'danger');
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
        this.$bus.$emit('message:push', '已刪除', 'warning');
      } else {
        this.$bus.$emit('message:push', '目前並被沒有收藏唷', 'danger');
      }
    },
    deletAllFavorite() {
      localStorage.removeItem('favoriteData');
      this.getFavorite();
      $('#delFavoriteModal').modal('hide');
      this.$bus.$emit('message:push', '已全部刪除', 'warning');
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

<style lang="scss" scoped>

.img-cover {
  width: 100vw;
  max-height: 450px;
  padding: 0 2rem;
}

.btn-add {
  background-color: #EFE5DC;
  text-align: center;
  &:hover {
    background-color: #EEDEA6;
  }
}

/* 相關商品的分隔線 */
.similar-line {
  position: relative;
  text-align: center;
  padding: 2rem 0;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    border-top: 2px solid #F5EED7;
    width: 100%;
    z-index: -1;
  }
  .similar-titlet {
    z-index: 1;
    background-color: #FFF;
    padding: 0 1.5rem;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 2rem;
    border-inline-start: 10px solid #EEDEA6;
    border-inline-end: 10px solid #EEDEA6;
  }
}
</style>
