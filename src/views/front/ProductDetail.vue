<template>
  <div class="container gap-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>

<!-- 商品內容 -->
    <div class="row">
      <!-- 商品圖片 -->
      <div class="col-md-7 mb-5">
        <img class="img-fluid img-cover"
          :src="product.imageUrl">
          <div class="favorite">
            <a class="text-white f-size125 cursor-pointer"
              v-if="!isFavorite(product.id)"
              @click.prevent="
                addFavorite(product.id, product.title, product.origin_price, product.imageUrl)">
              <i class="far fa-heart fa-lg"></i>
            </a>
            <a class="text-danger f-size125 cursor-pointer"
              v-if="isFavorite(product.id)"
              @click.prevent="removeFavorite(product.id)">
              <i class="fas fa-heart fa-lg"></i>
            </a>
          </div>
      </div>
      <!-- 商品資訊 -->
      <div class="col-md-5">
        <div class="px-4">
          <h2 class="mb-2 text-primary font-weight-bold">{{ product.title }}
            <span class="h5 text-muted">| {{ product.category }}</span></h2>
          <div class="p-2 text-brown" v-if="product.content">
            <h6>【商品介紹】</h6>
            <p class="pl-2"> {{ product.content }} </p>
          </div>
          <div class="p-2 text-brown" v-if="product.description">
            <h6>【商品描述】</h6>
            <p class="pl-2"> {{ product.description }} </p>
          </div>
          <hr>
          <div class="d-flex align-items-baseline px-2 pb-3">
            <p class="text-gray mb-0">原價 <del>{{ product.origin_price | currency }}</del></p>
            <p class="ml-auto h3 text-dark">NT {{ product.price | currency }}</p>
          </div>
          <div class="row mx-0 no-gutters">
            <div class="col-lg-5 mr-auto mb-3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <a href="#" class="btn btn-outline-graylight"
                    :class="{'disabled': qty === 1}"
                    @click.prevent="qty = qty - 1">−</a>
                </div>
                <input type="number" min="1" max="15" class="form-control text-center"
                  v-model.number="qty"/>
                <div class="input-group-append">
                  <a href="#" class="btn btn-outline-graylight"
                    :class="{'disabled':qty === 15}"
                    @click.prevent="qty = qty + 1">+</a>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <button class="btn btn-block btn-add py-2 text-secondary"
                @click="addCart(product.id, qty)">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      productId: '',
      Favorites: [],
      qty: 1,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters('productModules', ['product']),
  },
  methods: {
    addCart(id, qty = 1) {
      this.$store.dispatch('cartModules/addCart', { id, qty });
    },
    getFavorite() {
      this.Favorites = JSON.parse(localStorage.getItem('favoriteData')) || [];
    },
    addFavorite(id, title, price, imageUrl) {
      if (!this.isFavorite(id)) {
        const data = {
          id, title, price, imageUrl,
        };
        this.Favorites.push(data);
        localStorage.setItem('favoriteData', JSON.stringify(this.Favorites));
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '已加入收藏夾', status: 'success' },
        );
      } else {
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '已經加入過收藏了', status: 'danger' },
        );
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
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '已刪除收藏', status: 'warning' },
        );
      } else {
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '目前並被沒有收藏唷', status: 'danger' },
        );
      }
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.$store.dispatch('productModules/getProduct', this.productId);
    this.getFavorite();
  },
};
</script>

<style lang="scss" scoped>

.favorite {
  position: absolute;
  top: 8px;
  right: 58px;
}

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
