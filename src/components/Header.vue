<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow">
      <div class="container-xl">
        <a class="navbar-brand text-uppercase" href="/index.html">flower shop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarsExample07XL"
          aria-controls="navbarsExample07XL"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07XL">
          <ul class="navbar-nav mr-auto align-items-center w-100">
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'Products' }">Product
                <span class="sr-only">(current)</span></router-link></li>
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'Cart' }">Cart</router-link></li>
            <li class="nav-item ml-lg-auto">
              <router-link class="nav-link"
                :to="{ name: 'ProductsList' }">
                <i class="fas fa-user-circle fa-lg"></i>
              </router-link></li>
            <li class="nav-item">
              <!-- 購物車 -->
              <div class="btn-group">
                <a type="button" class="btn text-dark" data-toggle="dropdown">
                  <i class="fas fa-shopping-cart fa-lg"></i>
                  <span class="badge badge-pill badge-danger">{{ cartLength }}</span>
                </a>
                <div class="dropdown-menu shadow"
                  :class="{'show': isShowCart}">
                  <div class="p-2 px-sm-3">
                    <h5 class="text-center">購物車</h5>
                    <table class="table mb-2 table-hover" style="min-width:270px">
                      <tbody>
                        <tr class="cursor-pointer"
                          v-for="cart in carts.carts" :key="cart.id"
                          @click="productLink(cart.product_id)">
                          <td class="align-middle px-2">
                            <a class="btn-del text-danger"
                              @click.stop.prevent="removeCart(cart.id)">
                              <i class="fas fa-spinner fa-spin"
                                v-if="status.itemLodingId === cart.id"></i>
                              <i class="fas fa-trash-alt" v-else></i>
                            </a>
                          </td>
                          <td class="align-middle px-1">
                            <div class="bg-cover"
                              :style="`background-image:url(${ cart.product.imageUrl });`"></div>
                          </td>
                          <td class="align-middle py-1 px-0">
                            <div class="px-0 f-size75">
                              <div class="text-dark">{{ cart.product.title }}</div>
                              <div class="text-secondary">
                                {{ cart.qty }}/{{ cart.product.unit }}</div>
                            </div>
                          </td>
                          <td class="text-right align-middle px-1 text-success font-weight-bold">
                            {{ cart.total | currency }}</td>
                        </tr>
                        <tr>
                          <td class="text-center p-0 m-0" v-if="cartLength === 0">
                            <div class="text-center bg-brownlight m-0 p-4">
                              <div>購物車內沒有任何商品唷!!</div>
                              <router-link :to="{ name: 'Products'}"
                                class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                                前往購物</router-link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <router-link class="btn btn-block btn-important text-white"
                      :to="{ name: 'Cart' }"
                      v-if="cartLength !== 0">
                      <i class="fas fa-cart-arrow-down"></i>
                      結帳去</router-link>
                  </div>
                </div>
              </div>
              <!-- 收藏夾 -->
              <div class="btn-group">
                <a type="button" class="btn colorE" data-toggle="dropdown">
                  <i class="fas fa-heart fa-lg"></i>
                  <span class="badge badge-pill badge-danger">{{ favoriteLength }}</span>
                </a>
                <div class="dropdown-menu favorite shadow">
                  <div class="p-2 px-sm-3">
                    <h5 class="text-center">收藏夾</h5>
                    <table class="table mb-2 table-hover" style="min-width:200px">
                      <tbody>
                        <tr class="cursor-pointer"
                          v-for="favorite in favorites" :key="favorite.id"
                          @click="productLink(favorite.id)">
                          <td class="align-middle px-1">
                            <div class="bg-cover"
                              :style="`background-image:url(${ favorite.imageUrl })`"></div>
                          </td>
                          <td class="align-middle px-1">{{ favorite.title }}</td>
                          <td class="align-middle px-1 text-right">
                            <a class="btn-del text-danger pr-1"
                              @click.stop.prevent="removeFavorite(false, favorite.id)">
                              <i class="fas fa-trash-alt"></i>
                            </a>
                          </td>
                        </tr>
                        <td class="text-center p-0 m-0"
                          v-if="favoriteLength === 0">
                          <div class="text-center bg-brownlight m-0 p-4">
                            <div>沒有任何收藏商品唷!!</div>
                            <router-link :to="{ name: 'Products'}"
                              class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                              前往商店</router-link>
                          </div>
                        </td>
                      </tbody>
                    </table>
                    <button class="btn btn-outline-danger btn-block"
                      data-toggle="modal" data-target="#delFavoriteModal"
                      v-if="favoriteLength !== 0">
                      刪除全部</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="delFavoriteModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog justify-content-center d-flex" role="document">
        <div class="modal-content border-0 w-75">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除商品 </span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">全部收藏</strong> 商品。
            <em class="text-gray f-size75">(刪除後將無法恢復 )</em>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="removeFavorite(true)">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('cartModules', ['carts', 'cartLength', 'isShowCart']),
    ...mapGetters('favoriteModules', ['favorites', 'favoriteLength']),
  },
  methods: {
    removeCart(id) {
      this.$store.dispatch('cartModules/removeCart', id);
    },
    productLink(id) {
      if (this.$route.params.productId !== id) {
        this.$router.push({ name: 'ProductDetail', params: { productId: id } });
      } else {
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '您已在本頁', status: 'warning' },
        );
      }
    },
    removeFavorite(isDeleteAll, id) {
      this.$store.dispatch('favoriteModules/removeFavorite', { id, isDeleteAll });
    },
  },
  created() {
    this.$store.dispatch('cartModules/getCart');
    this.$store.dispatch('favoriteModules/getFavorite');
  },
};
</script>

<style lang="scss" scoped>
.navbar .navbar-brand {
  font-size: 1.4rem;
  font-weight: bold;
  color: #B69418;
}

.navbar-nav .nav-item .nav-link {
  color: #5e573e;
}

.navbar .navbar-brand:hover,
.navbar .navbar-brand:focus {
  color: #D1A813;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.4rem;
}

.navbar-nav .nav-item .nav-link:hover,
.navbar-nav .nav-item .nav-link:focus {
  color: #B69418;
  text-decoration: none;
}

.btn-group .badge {
  position: absolute;
  top: auto;
  bottom: 18px;
  right: -5px;
}

.dropdown-menu {
  position: absolute;
  left: -122px;
  width: 300px;
  border-color: #e9eaec;
  &.favorite {
    left: -96px;
    width: 240px;
  }
  &:before {
    position: absolute;
    content: "";
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #e9eaec transparent;
  }
  &:after {
    position: absolute;
    content: "";
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
  .bg-cover {
    width: 35px;
    height: 35px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .btn-del {
    &:hover {
      margin-right: -4px;
      i {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
