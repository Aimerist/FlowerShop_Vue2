<template>
  <main class="container-fluid container-lg grid-setting">
    <div class="row">
      <!-- 選單 -->
      <div class="col-sm-3 col-xl-2" data-aos="fade-down">
        <ul class="list-group mb-3 text-center">
          <li class="list-group-item border border-light disabled px-0">CATEGORY</li>
          <li class="list-group-item"
            :class="{ active: nowCategoryStatus === 'all' }"
            @click="switchCategoryStatus('all')">
            ALL</li>
          <li class="list-group-item"
            :class="{ active: nowCategoryStatus === `${ category }` }"
            @click="switchCategoryStatus(category)"
            v-for="category in categories" :key="category">
            {{ category }}</li>
        </ul>
      </div>
      <!-- 列表 -->
      <div class="col-sm-9 col-xl-10">
        <ul class="row list-unstyled row-cols-1 row-cols-md-2 row-cols-xl-3"
          data-aos="fade-up">
          <li class="col mb-6"
            v-for="item in filterProducts" :key="item.id">
            <div class="card hover--shadow">
              <router-link class="text-decoration-none position-relative"
                :to="{ name: 'ProductDetail', params: { productId: `${ item.id }` }}">
                <div class="favorite position-absolute shadow-black-30 hover--enlarge">
                  <a class="text-white" href="#"
                    v-if="!isFavorite(item.id)"
                    @click.prevent="addFavorite(item.id, item.title, item.price, item.imageUrl)">
                    <i class="far fa-heart fa-lg"></i>
                  </a>
                  <a class="text-danger-300" href="#"
                    v-if="isFavorite(item.id)"
                    @click.prevent="removeFavorite(item.id)">
                    <i class="fas fa-heart fa-lg"></i>
                  </a>
                </div>
                <div class="bg-cover rounded-top"
                  :style="`background-image: url(${ item.imageUrl }); padding-top: 70%;`">
                </div>
                <div class="card-body d-flex flex-column">
                  <div class="d-flex justify-content-between">
                    <h2 class="h4 card-title">{{ item.title }}</h2>
                    <h3 class="h6 font-weight-normal">
                      <i class="fas fa-tag mr-2"></i>{{ item.category }}</h3>
                  </div>
                  <p class="m-3 text-muted">{{ item.content | contentLength(20) }}</p>
                  <div class="d-flex justify-content-between mt-auto">
                    <p class="text-gray mb-0">原價 <del>{{ item.origin_price | currency }}</del></p>
                    <h4 class="h5 text-danger-500 font-family-roboto">
                      NT {{ item.price | currency }}</h4>
                  </div>
                </div>
                <div class="card-footer">
                  <a class="d-block text-decoration-none text-brown" href="#"
                    @click.prevent="addCart(item.id)">
                    <i class="fas fa-spinner fa-spin mx-1"
                      v-if="status.itemLodingId === item.id"></i>
                    加入購物車</a>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import contentLength from '@/filters/stringlenght'
import { mapGetters } from 'vuex'

export default {
  filters: {
    contentLength
  },
  data () {
    return {
      nowCategoryStatus: 'all'
    }
  },
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('productModules', ['categories']),
    filterProducts () {
      const vm = this
      const Data = vm.$store.state.productModules.filterProducts
      if (vm.nowCategoryStatus !== 'all') {
        return Data.filter((item) => item.category === vm.nowCategoryStatus)
      }
      return Data
    }
  },
  methods: {
    getRouteQuery () {
      if (this.$route.query.category) {
        this.nowCategoryStatus = this.$route.query.category
      }
    },
    switchCategoryStatus (CategoryName) {
      this.nowCategoryStatus = CategoryName
      this.$router.replace({ query: { category: CategoryName } })
    },
    addCart (id) {
      this.$store.dispatch('cartModules/addCart', { id })
    },
    addFavorite (id, title, price, imageUrl) {
      const data = {
        id, title, price, imageUrl
      }
      this.$store.dispatch('favoriteModules/addFavorite', data)
    },
    isFavorite (id) {
      return this.$store.state.favoriteModules.favorites
        .map((item) => item.id)
        .some((item) => item === id)
    },
    removeFavorite (id) {
      this.$store.dispatch('favoriteModules/removeFavorite', { id })
    }
  },
  created () {
    this.getRouteQuery()
  }
}
</script>

<style lang="scss" scoped>
.favorite {
  top: 12px;
  right: 12px;
}
</style>
