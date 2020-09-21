<template>
  <div class="container">
    <div class="gap-setting">
      <div class="row">
        <!-- 選單 -->
        <div class="col-lg-2 col-md-3">
          <ul class="list-group mb-3 text-center category-menu">
            <li class="list-group-item category-title disabled">CATEGORY</li>
            <li class="list-group-item"
              :class="{active: nowCategoryStatus === ''}"
              @click="switchCategoryStatus(''); nowCategoryStatus=''">
              ALL</li>
            <li class="list-group-item"
              :class="{active: nowCategoryStatus === `${ category }`}"
              @click="switchCategoryStatus(category); nowCategoryStatus = category"
              v-for="category in categories" :key="category">
              {{ category }}</li>
          </ul>
        </div>
        <!-- 列表 -->
        <div class="col-lg-10 col-md-9">
          <div class="row align-items-stretch">
            <div class="col-md-12 col-lg-6 col-xl-4 mb-4 rounded"
              v-for="item in filterProducts" :key="item.id">
              <div class="card">
                <div class="card-img"
                  :style="`background: url(${ item.imageUrl }) center center no-repeat;`">
                </div>
                <div class="favorite p-1">
                  <a class="text-white" v-if="!isFavorite(item.id)"
                    @click.prevent="addFavorite(item.id, item.title, item.price, item.imageUrl)">
                    <i class="far fa-heart fa-lg"></i>
                  </a>
                  <a class="text-danger" v-if="isFavorite(item.id)"
                    @click.prevent="removeFavorite(item.id)">
                    <i class="fas fa-heart fa-lg"></i>
                  </a>
                </div>
                <div class="card-body rounded pb-2">
                  <span class="float-right text-important">
                    <i class="fas fa-tag btn-sm"></i>
                    {{ item.category }}</span>
                  <h5 class="card-title mb-2">
                    <router-link class="link-line"
                      :to="{ name: 'ProductDetail', params: { productId: `${item.id}` }}">
                      {{ item.title }}</router-link>
                  </h5>
                  <div class="px-2 pb-1"
                    style="color: #555;">{{ item.content | contentLength(26) }}</div>
                  <div class="d-flex align-items-baseline px-2">
                    <p class="text-gray mb-0">原價 <del>{{ item.origin_price | currency }}</del></p>
                    <p class="ml-auto h5 text-danger">NT {{ item.price | currency }}</p>
                  </div>
                </div>
                <div class="card-footer cursor-pointer text-brown"
                  @click.prevent="addCart(item.id)">
                  <i class="fas fa-spinner fa-spin mx-1" v-if="status.itemLodingId === item.id"></i>
                  <a href="#">加入購物車</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contentLength from '@/filters/stringlenght';
import { mapGetters } from 'vuex';

export default {
  filters: {
    contentLength,
  },
  data() {
    return {
      nowCategoryStatus: '',
    };
  },
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('productModules', ['filterProducts', 'categories']),
  },
  methods: {
    switchCategoryStatus(CategoryName) {
      this.$store.dispatch('productModules/switchCategoryStatus', CategoryName);
    },
    addCart(id) {
      this.$store.dispatch('cartModules/addCart', { id });
    },
    addFavorite(id, title, price, imageUrl) {
      const data = {
        id, title, price, imageUrl,
      };
      this.$store.dispatch('favoriteModules/addFavorite', data);
    },
    isFavorite(id) {
      return this.$store.state.favoriteModules.favorites
        .map((item) => item.id)
        .some((item) => item === id);
    },
    removeFavorite(id) {
      this.$store.dispatch('favoriteModules/removeFavorite', { id });
    },
  },
  created() {
    this.$store.dispatch('productModules/getProductList', { isFront: true });
  },
};
</script>

<style lang="scss" scoped>
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
    min-height: 200px;
    width: auto;
    background-size: cover !important;
    object-fit:cover;
    border-radius: 5px 5px 0px 0px;
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

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  a {
    cursor: pointer;
    font-size: 1rem;
  }
}
</style>
