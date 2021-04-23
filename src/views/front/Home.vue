<template>
  <main class="grid-setting py-0">
    <!-- banner -->
    <div id="carouselBanner" class="carousel slide mb-4"
      data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselBanner" data-slide-to="0" class="active"><span></span></li>
        <li data-target="#carouselBanner" data-slide-to="1"><span></span></li>
        <li data-target="#carouselBanner" data-slide-to="2"><span></span></li>
        <li data-target="#carouselBanner" data-slide-to="3"><span></span></li>
        <li data-target="#carouselBanner" data-slide-to="4"><span></span></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../assets/images/index/banner/banner1.jpg"
            class="carousel-img d-block w-100 img-cover" alt="結婚與花束">
          <div class="carousel-caption d-none">
            <h5>精緻嚴選，花研美學</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner/banner2.jpg"
            class="carousel-img d-block w-100 img-cover" alt="天空與花">
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner/banner3.jpg"
            class="carousel-img d-block w-100 img-cover" alt="梅花">
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner/banner4.jpg"
            class="carousel-img d-block w-100 img-cover" alt="櫻花">
        </div>
        <div class="carousel-item">
          <img src="../../assets/images/index/banner/banner5.jpg"
            class="carousel-img d-block w-100 img-cover" alt="藍邊繡球">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselBanner" role="button" data-slide="prev">
        <span class="sr-only" aria-hidden="true">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselBanner" role="button" data-slide="next">
        <span class="sr-only" aria-hidden="true">Next</span>
      </a>
    </div>
    <!-- sale -->
    <section class="container sale">
      <div class="row">
        <div class="col sale__inner d-flex flex-column justify-content-center align-items-center
          text-center">
          <h3 class="sale__title" data-aos="flip-up" data-aos-duration="500">
            <span class="font-xs font-h6-md font-h5-xl text-primary d-block">
              2021 Open Special Offer</span>
            開幕全館限時折扣</h3>
          <p class="sale__text font-xs font-sm-sm font-h6-md font-h5-xl text-white d-inline-block
            bg-primary rounded-lg  px-4 px-sm-8"
            data-aos="flip-up" data-aos-duration="500">
            輸入折扣碼 【 <span class="font-weight-bold">OPEN8080</span> 】</p>
        </div>
      </div>
    </section>
    <!-- categories -->
    <section class="container categories container-xl-fluid pt-4 mb-4 mb-md-6 mb-lg-8">
      <ul class="row list-unstyled justify-content-xl-center">
        <li class="col-sm-6 col-md-4 col-xl-2 mb-4"
          v-for="(category, key) in categories" :key="category"
          @click.prevent="productLinkOfCategory(category)">
          <div class="card card-overlay text-decoration-none border-0">
            <img class="img-cover h-100 rounded-lg"
              :class="`categories__img-${ key+1 }`"
              src="../../assets/images/index/banner/banner5.jpg"
              :alt="category">
            <div class="card-overlay-inner d-flex justify-content-between align-items-center
              rounded-lg">
              <div>
                <p class="font-xs font-family-raleway font-weight-bold text-letter-spacing-1">
                  {{ category }}</p>
                <h4 class="font-h4 text-white text-letter-spacing-3">{{ category }}</h4>
              </div>
              <span class="fas fa-angle-right text-white font-h4 shadow-black-30"></span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- hot -->
    <section class="hot bg-light pt-6 pt-md-4 pb-4 mb-12">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <h3 class="font-h4 font-h3-xs font-italic font-weight-normal text-letter-spacing-3
              text-center mb-4"
              data-aos-throttleDelay="2000">Hot
              <span class="font-xs font-h6-xs">[熱門]</span></h3>
          </div>
        </div>
        <ul class="row list-unstyled">
          <li class="col-md-4 hot__item card border-0 mb-6 mb-md-0"
            v-for="(hotProduct, key) in hotProducts" :key="key">
            <router-link class="text-decoration-none"
              :to="{ name: 'ProductDetail', params: { productId: hotProduct.id }}"
              data-aos="zoom-in" data-aos-duration="500" data-aos-anchor-placement="center-bottom"
              :data-aos-delay="100*key">
              <div class="bg-cover mb-3 hot__img"
                :style="`background-image:url(${ hotProduct.imageUrl })`"></div>
              <div class=" px-2">
                <h4 class="text-dark font-weight-bold text-letter-spacing-1 d-inline-block
                  hover--shadowLine mb-1">
                  {{ hotProduct.title }}
                </h4>
                <p class="text-muted">NT {{ hotProduct.price }}
                  <del class="text-gray ml-2">NT {{ hotProduct.origin_price }}</del>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <!-- contact -->
    <section class="container-fluid contact mb-12">
      <div class="row justify-content-center no-gutters">
        <div class="col-11 col-sm-10 col-lg-8 col-xl-9 contact__img bg-cover
          py-xl-15 d-flex flex-column justify-content-center align-items-center">
          <div class="text-center">
            <h3 class="font-h2-md text-white-80 font-weigth-normal text-letter-spacing-3"
              data-aos="zoom-in" data-aos-once="false"
              data-aos-duration="1500">
              傳遞好心情
              <span class="d-none d-sm-inline">，送花送到心坎裡</span>
              <span class="h6 d-block font-weight-normal font-family-raleway text-white-80
                text-letter-spacing-1 mb-6">
                Convey a good mood,
                <span class="d-sm-none"><br></span>
                send flowers to your heart</span>
            </h3>
            <div class="d-inline-block contact__content text-white-80 text-center py-6 px-8"
              data-aos="zoom-in" data-aos-once="false"
              data-aos-duration="1500">
              <p class="font-sm font-h6-md mb-2">
                為你傳遞一份純粹而美好的心意
                <span class="d-none d-sm-inline">，</span>
                <span class="d-sm-none"><br></span>
                化為一段段動人而浪漫的詩篇<br>
                讓思念留下美好回憶
                <span class="d-none d-sm-inline">，</span>
                <span class="d-sm-none"><br></span>
                客製化只屬於你的心思<br>
              </p>
              <p>
                歡迎來電洽詢
                <span class="d-sm-none"><br></span>
                <a class="text-white-50 text-decoration-none
                  hover--colorPrimary hover--shadowLine px-sm-1 ml-sm-1"
                  href="tel:+021234567">TEL : 02-1234567</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- serivce -->
    <section class="container-fluid serivce px-0">
      <h3 class="font-h4 font-h3-xs font-italic font-weight-normal
        text-letter-spacing-3 text-center mb-4">Serivce
        <span class="font-xs font-h6-xs">[服務]</span></h3>
      <ul class="d-flex flex-wrap justify-content-between list-unstyled px-4 px-md-0">
        <li class="serivce__item mb-4">
          <div class="bg-cover serivce__img-1"
            style="padding-top:100%"></div>
          <h4 class="serivce__title font-h5 font-h4-sm font-weight-normal
            text-letter-spacing-1 text-white-80 shadow-black-30">
            Design
          </h4>
        </li>
        <li class="serivce__item mb-4">
          <div class="bg-cover serivce__img-2"
            style="padding-top:100%"></div>
          <h4 class="serivce__title font-h5 font-h4-sm font-weight-normal
            text-letter-spacing-1 text-white-80 shadow-black-30">
            Garden
          </h4>
        </li>
        <li class="serivce__item mb-4">
          <div class="bg-cover serivce__img-3"
            style="padding-top:100%"></div>
          <h4 class="serivce__title font-h5 font-h4-sm font-weight-normal
            text-letter-spacing-1 text-white-80 shadow-black-30">
            Wedding
          </h4>
        </li>
        <li class="serivce__item mb-4">
          <div class="bg-cover serivce__img-4"
            style="padding-top:100%"></div>
          <h4 class="serivce__title font-h5 font-h4-sm font-weight-normal
            text-letter-spacing-1 text-white-80 shadow-black-30">
            Exhibition
          </h4>
        </li>
      </ul>
    </section>
    <!-- footer -->
    <section class="container-fluid bg-gradual">
      <div class="row justify-content-center py-6 py-sm-8 pt-lg-10"
        data-aos="fade-up" data-aos-duration="1500">
        <div class="col text-center">
          <p class="font-sm font-h6-sm text-info mb-4">
            追求精緻高貴的設計與服務至上的理念<br>
            把愛化成行動來表達我們
            <span class="font-family-raleway hover--shadowLine">FlowerShop</span>
            的祝福<br>
            <span class="font-family-raleway hover--shadowLine">FlowerShop</span>
            提供各種花束、祝賀花禮籃及婚禮佈置
            <span class="pt-4 d-block"> 歡迎您蒞臨</span>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      hotProductIds: [
        '-MHsrgCcA0KJVlemHr-9',
        '-MHpkt62GaADy2v3P0sa',
        '-MHpjmjUzEd7BHE_ezRU'
      ]
    }
  },
  computed: {
    ...mapGetters('productModules', ['categories']),
    hotProducts () {
      const hotData = []
      this.$store.state.productModules.filterProducts.forEach((item) => {
        if (this.hotProductIds.includes(item.id)) {
          hotData.push(item)
        }
      })
      return hotData
    }
  },
  methods: {
    productLinkOfCategory (categoryName) {
      this.$router.push({ path: '/products', query: { category: categoryName } })
    }
  }
}
</script>

<style lang="scss" scoped>
// 僅限 image url
.contact__img {
  background-image: url("../../assets/images/index/parallax.jpg");
}
.categories__img {
  &-1 {
    content:url(../../assets/images/index/category/Rose.jpg);
  }
  &-2 {
    content:url(../../assets/images/index/category/Lily.jpg);
  }
  &-3 {
    content:url(../../assets/images/index/category/Hydrangea.jpg);
  }
  &-4 {
    content:url(../../assets/images/index/category/Tulip.jpg);
  }
  &-5 {
    content:url(../../assets/images/index/category/Sunflower.jpg);
  }
  &-6 {
    content:url(../../assets/images/index/category/Other.jpg);
  }
}
.serivce__img {
  &-1 {
    background-image: url('../../assets/images/serivce/design.jpg');
  }
  &-2 {
    background-image: url('../../assets/images/serivce/Garden.jpg');
  }
  &-3 {
    background-image: url('../../assets/images/serivce/wedding.jpg');
  }
  &-4 {
    background-image: url('../../assets/images/serivce/event.jpg');
  }
}
</style>
