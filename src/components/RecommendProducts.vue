<template>
  <swiper class="swiper col-12 px-3 pb-10" :options="swiperOption">
    <swiper-slide class="overflow-hidden" ref="mySwiper"
      v-for="item in recommendProducts" :key="item.id">
      <p class="text-center w-100" v-if="recommendProducts.length === 0">
        目前沒有相關商品</p>
      <router-link class="swiper-slide-link"
        :to="{ name:'ProductDetail', params: { productId: item.id } }">
        <span class="h6 favorite position-absolute text-white z-index-2
          hover--enlarge shadow-black-30"
          v-if="!isFavorite(item.id)"
          @click.stop.prevent="
            addFavorite(item.id, item.title, item.origin_price, item.imageUrl)">
          <i class="far fa-heart font-h5"></i></span>
        <span class="h6 favorite position-absolute text-white z-index-2 hover--enlarge"
          v-if="isFavorite(item.id)"
          @click.stop.prevent="removeFavorite(item.id)">
          <i class="fas fa-heart font-h5"></i></span>
        <img :src="item.imageUrl" :alt="item.title"
          class="swiper-slide-img img-cover w-100">
        <h6 class="swiper-slide-text h6 font-h5-sm font-weight-normal text-white text-center
          px-2 px-md-3 py-2 hover__animation-slideOutDown">{{ item.title }}</h6>
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev d-none d-md-flex" slot="button-prev">
      <span class="fas fa-angle-left fa-2x pl-3"></span>
    </div>
    <div class="swiper-button-next d-none d-md-flex" slot="button-next">
      <span class="fas fa-angle-right fa-2x pr-3"></span>
    </div>
  </swiper>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'swiper-example-loop',
  title: 'Loop mode / Infinite loop',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 4500
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 12,
        breakpoints: {
          640: {
            spaceBetween: 20
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
          992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30
          }
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    ...mapGetters('productModules', ['recommendProducts'])
  },
  methods: {
    addFavorite (id, title, price, imageUrl) {
      const data = {
        id, title, price, imageUrl
      }
      this.$store.dispatch('favoriteModules/addFavorite', data)
    },
    removeFavorite (id) {
      this.$store.dispatch('favoriteModules/removeFavorite', { id })
    },
    isFavorite (id) {
      return this.$store.state.favoriteModules.favorites
        .map((item) => item.id)
        .some((item) => item === id)
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite.position-absolute {
  top: 1rem;
  right: 1rem;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #df7475 !important;
  }
}
</style>
