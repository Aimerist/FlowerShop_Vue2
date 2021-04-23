<template>
  <main class="grid-setting">
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <section class="container-fluid container-lg">
      <!-- Introduction -->
      <div class="row introduction mb-12">
        <div class="col-sm-1 introduction__tab pr-0 position-absolute z-index-2
          mt-2 mt-sm-3 mt-md-0" data-aos="fade-up">
          <ul class="nav d-flex flex-column justify-content-center h-100"
            id="tab" role="tablist">
            <li class="text-md-right" role="presentation">
              <a class="active" id="flower_1-tab" href="#flower_1" role="tab"
                data-toggle="pill" aria-controls="flower_1" aria-selected="true">
                <img class="introduction__tab__img img-cover ml-2 ml-sm-3 ml-md-0 mb-2 mb-md-3"
                  :src="product.imageUrl" :alt="product.title">
              </a>
            </li>
            <li class="text-md-right" role="presentation">
              <a id="flower_2-tab" data-toggle="pill" href="#flower_2"
                role="tab" aria-controls="flower_2" aria-selected="false">
                <img class="introduction__tab__img img-cover ml-2 ml-sm-3 ml-md-0 mb-2 mb-md-3"
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600776218281.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=bb4q9fCmnEvHyMjgLHiaTeqZre4En6qM34tmmA5nfu88fVPug8KKRjhwkDly%2FMOEij7xNXlFHlG5GJSZurRh%2FQiVHXtSo4kvS4ObZacje%2FlHyzfDltIIT6N%2Bhy9oGOiAw%2FSGLe5fqyiBbsIaM7bevfbXn4g8j9k%2B1Ql3oHul4cBk58YLojMELcX8CNqomYcLa0xNLFvFRXVtA74LLbn13DKVzJ89Kxch51PTDhhWSIxm7VxubLZ6VoUYlQC8b%2FABIDiwOTrBn9kMuo2KhSLLsh2wka1nO%2FVRMaSrUbn%2BWOuQe5eag6Ak2YAOQuG0mcWfAIUYKfqXP%2FLTOm3bv2FQ8A%3D%3D" alt="金輝玫瑰">
              </a>
            </li>
            <li class="text-md-right" role="presentation">
              <a id="flower_3-tab" data-toggle="pill" href="#flower_3"
                role="tab" aria-controls="flower_3" aria-selected="false">
                <img class="introduction__tab__img img-cover ml-2 ml-sm-3 ml-md-0 mb-2 mb-md-3"
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600770263193.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=WQTPZ3lFtzjEboFhnBQenqE9X8Lh7Poc2aSiorro5lnax5Z2820b%2BgOYyWtZDhnUAq4g0XJzr0O2832DXG%2Bl9ua8I38T0Wln74F6M3lqFVcINZwq%2Bq86bAw894imNq%2BgHNEXLctbhE5HzvHRjbiT9iE265tqvh8dZLeqvDKI4yDjG62ydRWBP6fMSdVF4v7Dk0ddcQt1%2FGmbHIDvIa17K4LDtepMyrEi3aUxGLozvr3yTzTwZZIwmezEnHGQGJ3u4d0TRN4Z170JM%2BGo23SjX2PLqD%2FSaCKCrAE4QyhYgd8139Co8wKSGJHAAYFyO%2Bo%2Fi7aO9hO%2FFhF599fK%2FjJojw%3D%3D" alt="紅脣"></a>
            </li>
            <li class="text-md-right" role="presentation">
              <a id="flower_4-tab" data-toggle="pill" href="#flower_4"
                role="tab" aria-controls="flower_4" aria-selected="false">
                <img class="introduction__tab__img img-cover ml-2 ml-sm-3 ml-md-0 mb-2 mb-md-3"
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600778499805.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=Pb7%2B3SizYU160KVhzpwJfilCe6j0VKDYfz%2Ff%2FKq%2F%2FGe9NUZY6o6PWI74hiHL8rPsJzFozwWikzvbPtd6ovPobhslmxWddB%2Fq9%2B1Wigpe6Fj6U%2F2KYTlM0YQJvaaBUU3R9uiibh36DU62ofv6UOjLr1%2FuTfrMUvpEYrDiZtHE61bU0a4UC3Flk8tpErCbp9o67UFtQaWuzX7XGM3%2BsH2nSDcwEUiMI13dvqFG8AckhmgY2RnSX7TyyNZ6O25oEmDnV%2FgIA9XB8u64%2FLb%2BEyHRI8xy2E1H8bXXjf1cgYMS8NX1laTtkYfW7wonSFLAZFL4o5pmiyty0ITjOICD5s7XYg%3D%3D" alt="香檳玫瑰"></a>
            </li>
          </ul>
        </div>
        <div class="col-sm-6 mb-3 mb-sm-0" data-aos="fade-up">
          <div class="tab-content position-relative" id="tabContent">
            <div class="tab-pane fade show active" id="flower_1"
              role="tabpanel" aria-labelledby="flower_1-tab">
              <div class="introduction__img bg-cover"
                :style="`background-image: url(${ product.imageUrl });`">
              </div>
            </div>
            <div class="tab-pane fade" id="flower_2" role="tabpanel"
              aria-labelledby="flower_2-tab">
              <div class="introduction__img bg-cover"
                style="background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600776218281.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=bb4q9fCmnEvHyMjgLHiaTeqZre4En6qM34tmmA5nfu88fVPug8KKRjhwkDly%2FMOEij7xNXlFHlG5GJSZurRh%2FQiVHXtSo4kvS4ObZacje%2FlHyzfDltIIT6N%2Bhy9oGOiAw%2FSGLe5fqyiBbsIaM7bevfbXn4g8j9k%2B1Ql3oHul4cBk58YLojMELcX8CNqomYcLa0xNLFvFRXVtA74LLbn13DKVzJ89Kxch51PTDhhWSIxm7VxubLZ6VoUYlQC8b%2FABIDiwOTrBn9kMuo2KhSLLsh2wka1nO%2FVRMaSrUbn%2BWOuQe5eag6Ak2YAOQuG0mcWfAIUYKfqXP%2FLTOm3bv2FQ8A%3D%3D);">
              </div>
            </div>
            <div class="tab-pane fade" id="flower_3" role="tabpanel" aria-labelledby="flower_3-tab">
              <div class="introduction__img bg-cover"
                style="background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600770263193.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=WQTPZ3lFtzjEboFhnBQenqE9X8Lh7Poc2aSiorro5lnax5Z2820b%2BgOYyWtZDhnUAq4g0XJzr0O2832DXG%2Bl9ua8I38T0Wln74F6M3lqFVcINZwq%2Bq86bAw894imNq%2BgHNEXLctbhE5HzvHRjbiT9iE265tqvh8dZLeqvDKI4yDjG62ydRWBP6fMSdVF4v7Dk0ddcQt1%2FGmbHIDvIa17K4LDtepMyrEi3aUxGLozvr3yTzTwZZIwmezEnHGQGJ3u4d0TRN4Z170JM%2BGo23SjX2PLqD%2FSaCKCrAE4QyhYgd8139Co8wKSGJHAAYFyO%2Bo%2Fi7aO9hO%2FFhF599fK%2FjJojw%3D%3D);">
              </div>
            </div>
            <div class="tab-pane fade" id="flower_4" role="tabpanel" aria-labelledby="flower_4-tab">
              <div class="introduction__img bg-cover"
                style="background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/aimer%2F1600778499805.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&amp;Expires=1742169600&amp;Signature=Pb7%2B3SizYU160KVhzpwJfilCe6j0VKDYfz%2Ff%2FKq%2F%2FGe9NUZY6o6PWI74hiHL8rPsJzFozwWikzvbPtd6ovPobhslmxWddB%2Fq9%2B1Wigpe6Fj6U%2F2KYTlM0YQJvaaBUU3R9uiibh36DU62ofv6UOjLr1%2FuTfrMUvpEYrDiZtHE61bU0a4UC3Flk8tpErCbp9o67UFtQaWuzX7XGM3%2BsH2nSDcwEUiMI13dvqFG8AckhmgY2RnSX7TyyNZ6O25oEmDnV%2FgIA9XB8u64%2FLb%2BEyHRI8xy2E1H8bXXjf1cgYMS8NX1laTtkYfW7wonSFLAZFL4o5pmiyty0ITjOICD5s7XYg%3D%3D);">
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-5 d-flex flex-column justify-content-center
          position-relative px-6 px-md-5" data-aos="fade-up">
          <div class="border-bottom pb-3 pb-md-5 mb-3 mb-md-5">
            <h3 class="font-sm font-h6-md text-primary font-weight-normal
              d-flex justify-content-between pr-md-4">{{ product.category }}
              <span class="h6 favorite text-danger-500 hover--enlarge shadow-black-30"
                v-if="!isFavorite(product.id)"
                @click.prevent="
                  addFavorite(product.id, product.title, product.origin_price, product.imageUrl)">
                <i class="far fa-heart font-h5"></i></span>
              <span class="h6 favorite text-danger-500 hover--enlarge shadow-black-30"
                v-if="isFavorite(product.id)"
                @click.prevent="removeFavorite(product.id)">
                <i class="fas fa-heart font-h5"></i></span>
            </h3>
            <h2 class="h4 font-h3-md mb-2 text-dark text-letter-spacing-3">
              {{ product.title }}</h2>
            <p class="font-sm font-h6-md text-secondary text-truncate">
              {{ product.content }}
            </p>
          </div>
          <div class="row no-gutters">
            <div class="col-md-7 pr-4 d-flex flex-column justify-content-end mb-2 mb-md-0">
              <div class="text-right mr-lg-4">
                <p class="text-secondary text-decoration-del">
                  原價
                  <span class="font-weight-bold ml-4 mr-2">
                    NT {{ product.origin_price }}</span>
                  元
                </p>
              </div>
              <p class="text-right text-secondary mr-lg-4">
                售價
                <span class="h5 font-h4-md font-family-roboto text-danger-500
                  ml-4 mr-2">NT {{ product.price }}</span>
                元
              </p>
            </div>
            <div class="col-md-5">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <a href="#" class="btn btn-light font"
                    :class="{ 'disabled': qty === 1 }"
                    @click.prevent="qty = qty - 1">
                    <i class="fas fa-minus"></i></a>
                </div>
                <input type="number" min="1" max="15" value="1"
                  class="form-control text-center border-light"
                  v-model.number="qty">
                <div class="input-group-append">
                  <a href="#" class="btn btn-light"
                    :class="{ 'disabled':qty === 15 }"
                    @click.prevent="qty = qty + 1">
                    <i class="fas fa-plus"></i></a>
                </div>
              </div>
              <button class="btn btn-block btn-danger-500 hover--doublePulse" type="button"
                @click="addCart(product.id, qty)">
                <span v-if="status.itemLodingId === product.id">
                  加入中<i class="fas fa-spinner fa-spin mx-1"></i></span>
                <span v-else>加入購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Flower Meanings -->
      <div class="row">
        <div class="col-12 text-center mb-12">
          <h4 class="font-h5 font-h4-xs font-weight-normal font-italic text-letter-spacing-3 mb-5"
            data-aos="fade-up">
            Flower Meanings
            <span class="font-xs font-h6-xs"> [花語]</span></h4>
          <p class="mb-1" data-aos="fade-up" data-aos-delay="100">
            花不只美麗，<span class="d-sm-none"><br></span>
            花語更能給予花朵不一樣的浪漫氣息</p>
          <p data-aos="fade-up" data-aos-delay="100">
            {{ product.title }}的花語象徵著，
            <span class="d-sm-none"><br></span>{{ product.content }}</p>
        </div>
        <div class="col-4 col-md-3 mx-md-4 mx-lg-6" data-aos="fade-right">
          <img class="img-cover img-fluid" src="../../assets/images/detail/2.jpg" alt="花瓶與花">
        </div>
        <div class="col-8 mt-8 mt-md-15 ml-md-4 ml-lg-6 mb-15" data-aos="fade-left">
          <img class="img-cover img-fluid mt-lg-4" alt="結婚與花束"
            src="../../assets/images/detail/1.jpg" >
        </div>
      </div>
      <!-- Particular -->
      <div class="row particular justify-content-center justify-content-md-start
        position-relative mb-12 mb-md-15">
        <div class="particular__inner d-flex flex-column justify-content-center
          h-100 mb-6 mr-md-4 text-center z-index-2"
          data-aos="zoom-in-left" data-aos-duration="2000">
          <h4 class="font-h4 font-h3-xs font-weight-normal font-italic text-letter-spacing-3 mb-5">
            Particular
            <span class="font-xs font-h6-xs">[特色]</span>
          </h4>
          <p v-if="product.description">
            {{ product.description }}
          </p>
        </div>
        <div class="col-md-7 col-lg-8" data-aos="fade-right">
          <img class="img-fluid" src="../../assets/images/detail/3.jpg" alt="粉色玫瑰花">
        </div>
      </div>
    </section>
    <!-- bigImage -->
    <div class="container-fluid bg-gradual mb-8 mb-md-12">
      <div class="row no-gutters justify-content-center pb-15 position-relative">
        <div class="col-12 text-center mb-4 mb-sm-5">
          <h2 class="font-h5 font-h4-xs font-weight-normal font-italic text-letter-spacing-3">
            Queen's Day
            <span class="d-sm-none"><br></span>
            <span class="font-xs font-h6-xs">[{{ product.title }}]</span></h2>
        </div>
        <div class="col-10 col-md-8 col-xl-6 bg-cover detail__bigImg" data-aos="fade-up"
          :style="`background-image: url( ${ product.imageUrl });`"
          :alt="product.title">
        </div>
      </div>
    </div>
    <!-- Recommend -->
    <section class="container recommend mb-2 mb-md-8">
      <div class="row">
        <div class="col-12 mb-4 mb-sm-7 mb-lg-8 px-0">
          <h5 class="recommend__title h4 font-h3-md text-warning
            d-inline-block bg-white px-2 px-sm-4 px-md-6 ml-6 ml-md-12">Recommend</h5>
        </div>
        <RecommendProducts/>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import RecommendProducts from '@/components/RecommendProducts.vue'

export default {
  components: {
    RecommendProducts
  },
  data () {
    return {
      qty: 1,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['status']),
    ...mapGetters('productModules', ['product', 'productId', 'filterProducts'])
  },
  methods: {
    addCart (id, qty = 1) {
      this.$store.dispatch('cartModules/addCart', { id, qty })
    },
    productLink (id) {
      if (this.$route.params.productId !== id) {
        this.$router.push({ name: 'ProductDetail', params: { productId: id } })
      } else {
        this.$store.dispatch(
          'alertMessageModules/updateMessage',
          { message: '您已在本頁', status: 'warning' }
        )
      }
    },
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
  },
  watch: {
    $route () {
      this.$store.commit('productModules/PRODUCT_ID', this.$route.params.productId)
      this.$store.dispatch('productModules/getProduct')
    }
  },
  created () {
    this.$store.commit('productModules/PRODUCT_ID', this.$route.params.productId)
    this.$store.dispatch('productModules/getProduct')
  }
}
</script>
