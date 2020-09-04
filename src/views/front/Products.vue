<template>
  <div class="container">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <div class="container gap-setting">
      <div class="row">
        <!-- 選單 -->
        <div class="col-lg-2 col-md-3">
          <ul class="list-group mb-3 text-center category-menu">
            <li class="list-group-item category-title disabled">CATEGORY</li>
            <li class="list-group-item"
              :class="{active: nowCategoryStatus === ''}"
              @click="nowCategoryStatus=''">
              ALL</li>
            <li class="list-group-item"
              :class="{active: nowCategoryStatus === `${category}`}"
              @click="nowCategoryStatus=`${category}`"
              v-for="category in Categories" :key="category">
              {{ category }}</li>
          </ul>
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
                <router-link to="/cart" class="btn btn-outline-danger d-block mb-2"
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
        </div>
        <!-- 列表 -->
        <div class="col-lg-10 col-md-9">
          <div class="card-columns">
            <div class="card mb-4 rounded"
              v-for="item in filterData" :key="item.id">
              <div class="card-img rounded-0" style="height: 200px; background-size:cover;"
                :style="`background: url(${ item.imageUrl }) center center no-repeat`">
              </div>
              <div class="favorite p-1">
                <a class="text-white" v-if="!isFavorite(item.id)"
                  @click.prevent="addFavorite(item.id, item.title, item.price)">
                  <i class="far fa-heart fa-lg"></i>
                </a>
                <a class="text-danger" v-if="isFavorite(item.id)"
                  @click.prevent="removeFavorite(item.id)">
                  <i class="fas fa-heart fa-lg"></i>
                </a>
              </div>
              <div class="card-body rounded pb-2">
                <span class="float-right category">
                  <i class="fas fa-tag btn-sm"></i>
                  {{ item.category }}</span>
                <h5 class="card-title mb-2">
                  <router-link class="link-line"
                    :to="{ name: 'ProductDetail', params: { productId: `${item.id}` }}">
                    {{ item.title }}</router-link>
                </h5>
                <div class="px-2 pb-1"
                  style="color: #555;">{{ item.content | contentLength }}</div>
                <div class="d-flex align-items-baseline px-2">
                  <p class="text-gray mb-0">原價 <del>{{ item.price | currency }}</del></p>
                  <p class="ml-auto h5 text-danger">NT {{ item.origin_price | currency }}</p>
                </div>
              </div>
              <div class="card-footer cursor-pointer"
                @click.prevent="addProductToCart(item.id)">
                <a href="#">加入購物車</a>
              </div>
            </div>
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
import contentLength from '@/filters/stringlenght';

export default {
  filters: {
    contentLength,
  },
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

<style lang="scss" scoped>
.clicktable-row {
  cursor: pointer;
}

.category-menu {
  .list-group-item {
    color: #555;
    font-weight: 700;
    border: 1px solid #e9ddd2;
    border-top: none;
  }
  .list-group-item.category-title {
    background-color: #e9ddd2;
    border-radius: 5px 5px 0px 0;
    border: 1px solid #e9ddd2;
    color: #5e573e;
  }
  .list-group-item:hover {
    background-color: rgba(238, 222, 166, .25);
    box-shadow: inset 10px 0px 0px #EEDEA6;
    color: #866f19;
  }
  .list-group-item.active {
    background-color: transparent;
    color: #B69418;
    font-weight: 700;
  }
}

.card {
  &:hover {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .2);
  }
  .card-img{
    max-height: 200px;
    width: auto;
    background-size: cover;
    object-fit:cover;
  }
  .card-body {
    min-height: 145px;
  }
  .card-title {
    color: #5e573e;
    font-weight: 600;
    a {
      color: #5e573e;
      padding: 0 0.25rem;
    }
  }
  .card-footer {
    background-color: #efe5dc;
    border-top: none;
    text-align: center;
    &:hover {
      background-color: #EEDEA6;
    }
    a {
      text-decoration: none;
      color: #6B460F;
    }
  }
}

.category {
  color: #B69418;
}

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  a {
    cursor: pointer;
    font-size: 1rem;
  }
}

@media (max-width: 991px) {
  .card-columns {
    column-count: 2;
  }
}

@media (max-width: 767px) {
  .card-columns {
    column-count: 1;
  }
}

</style>
