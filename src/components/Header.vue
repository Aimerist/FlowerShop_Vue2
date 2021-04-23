<template>
  <div>
    <header class="navbar navbar-expand-md navbar-light bg-white sticky-top shadow p-0 py-md-2">
      <div class="container-fluid container-lg">
        <h1 class="h3 ml-2 ml-sm-8 ml-md-0">
          <router-link class="navbar-brand mr-0"
            :to="{ name: 'Home' }">Flower Shop</router-link>
        </h1>
        <nav class="ml-auto mr-2">
          <ul class="navbar-nav d-md-none flex-row">
            <!-- shop cart -->
            <li class="mr-2 btn-group">
              <a class="position-relative text-muted p-2 m-0" href="#"
              data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-shopping-cart fa-lg"></i>
                <span class="badge badge-pill badge-danger">{{ cartLength }}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow"
                :class="{'show': isShowCart}">
                <h4 class="h5 text-center text-brown my-2">購物車</h4>
                <div class="dropdown-divider"></div>
                <ul class="list-inline">
                  <li class="dropdown-item"
                    v-for="cart in carts.carts" :key="cart.id">
                    <router-link class="text-decoration-none d-flex align-items-center"
                      :to="{ name: 'ProductDetail', params: { productId: `${cart.product_id}` }}">
                      <button class="btn btn-del pl-0 text-danger focus--outline-none" type="button"
                        @click.stop.prevent="removeCart(cart.id)">
                        <i class="fas fa-spinner fa-spin"
                          v-if="status.itemLodingId === cart.id"></i>
                        <i class="fas fa-trash-alt" v-else></i>
                      </button>
                      <img class="dropdown-img img-cover mr-3"
                        :src="cart.product.imageUrl"
                        :alt="cart.product.title">
                      <div class="mr-auto">
                        <h5 class="h6 mr-4 text-dark">{{ cart.product.title }}</h5>
                        <p class="text-gray line-height-1">
                          <small>{{ cart.qty }}/<span>{{ cart.product.unit }}</span></small></p>
                      </div>
                      <p class="h5">{{ cart.product.price | currency }}</p>
                    </router-link>
                  </li>
                </ul>
                <!-- 結帳btn -->
                <div class="mx-4 my-2">
                  <router-link class="btn btn-block btn-primary hover--doublePulse"
                    :to="{ name: 'Cart' }"
                    v-if="cartLength !== 0">
                    <i class="fas fa-cart-arrow-down mr-2"></i>
                    結帳去
                  </router-link>
                </div>
                <!-- 沒有商品 -->
                <div class="m-4 p-4 bg-light text-center"
                  v-if="cartLength === 0">
                  <p>購物車內沒有任何商品唷 !</p>
                  <router-link :to="{ name: 'Products'}"
                    class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                    前往購物</router-link>
                </div>
              </div>
            </li>
            <!-- fraovate -->
            <li class="mr-2 btn-group">
              <a class="position-relative text-muted p-2 m-0" href="#"
              data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-heart fa-lg"></i>
                <span class="badge badge-pill badge-danger">{{ favoriteLength }}</span>
              </a>
              <div class="dropdown-menu dropdown-mini dropdown-menu-right shadow">
                <h4 class="h5 text-center text-brown my-2">收藏夾</h4>
                <div class="dropdown-divider"></div>
                <ul class="list-unstyled">
                  <li class="dropdown-item"
                    v-for="favorite in favorites" :key="favorite.id">
                    <router-link class="text-decoration-none d-flex align-items-center"
                      :to="{ name: 'ProductDetail', params: { productId: `${favorite.id}` }}">
                      <img class="dropdown-img img-cover mr-3 rounded-lg"
                        :src="favorite.imageUrl"
                        :alt="favorite.title">
                      <h5 class="h6 text-dark mr-auto">{{ favorite.title }}</h5>
                      <button class="btn btn-del px-0 text-danger mr-2 focus--outline-none"
                      type="button"
                        @click.stop.prevent="removeFavorite(false, favorite.id)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </router-link>
                  </li>
                </ul>
                <!-- 全部刪除 btn -->
                <div class="mx-4 my-2">
                  <button class="btn btn-block btn-outline-danger" type="button"
                    data-toggle="modal" data-target="#delFavoriteModal"
                    v-if="favoriteLength !== 0">
                    刪除全部</button>
                </div>
                <!-- 沒有商品 -->
                <div class="m-4 p-4 bg-light text-center"
                  v-if="favoriteLength === 0">
                  <p>沒有任何收藏商品唷 !</p>
                  <router-link :to="{ name: 'Products'}"
                    class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                    前往商店</router-link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <button class="navbar-toggler mr-2 mr-sm-8 mr-md-0 my-2"
          type="button" data-toggle="collapse"
          data-target="#headerMenu" aria-controls="headerMenu"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <nav class="collapse navbar-collapse" id="headerMenu">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item position-relative mr-md-2">
              <router-link class="nav-link text-center py-4 py-md-2"
                :to="{ name: 'Products' }">Product</router-link></li>
            <li class="nav-item position-relative mr-md-2">
              <router-link class="nav-link text-center py-4 py-md-2"
                :to="{ name: 'About' }">
                About</router-link></li>
            <li class="nav-item position-relative mr-md-4">
              <router-link class="nav-link text-center py-4 py-md-2"
                :to="{ name: 'Cart' }">Cart</router-link></li>
            <!-- shop cart -->
            <li class="nav-item d-none d-md-inline btn-group">
              <a class="nav-link text-muted position-relative" href="#"
              data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge badge-pill badge-danger">{{ cartLength }}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right shadow"
                :class="{'show': isShowCart}">
                <h4 class="h5 text-center text-brown my-2">購物車</h4>
                <div class="dropdown-divider"></div>
                <ul class="list-inline">
                  <li class="dropdown-item"
                    v-for="cart in carts.carts" :key="cart.id">
                    <router-link class="text-decoration-none d-flex align-items-center"
                      :to="{ name: 'ProductDetail', params: { productId: `${cart.product_id}` }}">
                      <button class="btn btn-del pl-0 text-danger focus--outline-none" type="button"
                        @click.stop.prevent="removeCart(cart.id)">
                        <i class="fas fa-spinner fa-spin"
                          v-if="status.itemLodingId === cart.id"></i>
                        <i class="fas fa-trash-alt" v-else></i>
                      </button>
                      <img class="dropdown-img img-cover mr-3"
                        :src="cart.product.imageUrl"
                        :alt="cart.product.title">
                      <div class="mr-auto">
                        <h5 class="h6 mr-4 text-dark">{{ cart.product.title }}</h5>
                        <p class="text-gray line-height-1">
                          <small>{{ cart.qty }}/<span>{{ cart.product.unit }}</span></small></p>
                      </div>
                      <p class="h5">{{ cart.product.price | currency }}</p>
                    </router-link>
                  </li>
                </ul>
                <!-- 結帳btn -->
                <div class="mx-4 my-2">
                  <router-link class="btn btn-block btn-primary hover--doublePulse"
                    :to="{ name: 'Cart' }"
                    v-if="cartLength !== 0">
                    <i class="fas fa-cart-arrow-down mr-2"></i>
                    結帳去
                  </router-link>
                </div>
                <!-- 沒有商品 -->
                <div class="m-4 p-4 text-center"
                  v-if="cartLength === 0">
                  <p>購物車內沒有任何商品唷 !</p>
                  <router-link :to="{ name: 'Products'}"
                    class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                    前往購物</router-link>
                </div>
              </div>
            </li>
            <!-- fraovate -->
            <li class="nav-item d-none d-md-inline btn-group">
              <a class="nav-link text-muted position-relative" href="#"
              data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-heart"></i>
                <span class="badge badge-pill badge-danger">{{ favoriteLength }}</span>
              </a>
              <div class="dropdown-menu dropdown-mini dropdown-menu-right shadow">
                <h4 class="h5 text-center text-brown my-2">收藏夾</h4>
                <div class="dropdown-divider"></div>
                <ul class="list-unstyled">
                  <li class="dropdown-item"
                    v-for="favorite in favorites" :key="favorite.id">
                    <router-link class="text-decoration-none d-flex align-items-center"
                      :to="{ name: 'ProductDetail', params: { productId: `${favorite.id}` }}">
                      <img class="dropdown-img img-cover mr-3 rounded-lg"
                        :src="favorite.imageUrl"
                        :alt="favorite.title">
                      <h5 class="h6 text-dark mr-auto">{{ favorite.title }}</h5>
                      <button class="btn btn-del px-0 text-danger mr-2 focus--outline-none"
                      type="button"
                        @click.stop.prevent="removeFavorite(false, favorite.id)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </router-link>
                  </li>
                </ul>
                <!-- 全部刪除 btn -->
                <div class="mx-4 my-2">
                  <button class="btn btn-block btn-outline-danger" type="button"
                    data-toggle="modal" data-target="#delFavoriteModal"
                    v-if="favoriteLength !== 0">
                    刪除全部</button>
                </div>
                <!-- 沒有商品 -->
                <div class="m-4 p-4 text-center"
                  v-if="favoriteLength === 0">
                  <p class="text-dark">沒有任何收藏商品唷 !</p>
                  <router-link :to="{ name: 'Products'}"
                    class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                    前往商店</router-link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="modal fade" id="delFavoriteModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog justify-content-center d-flex" role="document">
        <div class="modal-content border-0 w-75">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title text-white" id="exampleModalLabel">
              <span>刪除商品</span>
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('cartModules', ['carts', 'cartLength', 'isShowCart']),
    ...mapGetters('favoriteModules', ['favorites', 'favoriteLength'])
  },
  methods: {
    removeCart (id) {
      this.$store.dispatch('cartModules/removeCart', id)
    },
    removeFavorite (isDeleteAll, id) {
      this.$store.dispatch('favoriteModules/removeFavorite', { id, isDeleteAll })
    }
  },
  created () {
    this.$store.dispatch('cartModules/getCart')
    this.$store.dispatch('favoriteModules/getFavorite')
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
