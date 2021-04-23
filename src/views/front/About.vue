<template>
  <main class="grid-setting py-0">
    <section class="container-fluid container-lg banner mb-8 mb-md-12 mb-lg-20">
      <div class="row justify-content-center">
        <div class="col-3 z-index-2 py-12 py-md-15 pl-0 pl-md-4">
          <div class="d-flex flex-column justify-content-center align-items-center bg-warning
            mr-n20 h-100"
            data-aos="zoom-in-right">
            <h2 class="h4 font-h2-md font-h1-lg text-white font-family-raleway
            border-bottom border-2 border-light mb-3">
              About us
            </h2>
            <h2 class="font-sm font-h6-md text-white-80 text-letter-spacing-3">關於我們</h2>
          </div>
        </div>
        <div class="col-9 banner__img bg-cover"></div>
      </div>
    </section>
    <section class="container mb-12  mb-md-12 mb-lg-20">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-7">
          <h5 class="h4 text-letter-spacing-2 mb-5 mb-md-8" data-aos="fade-up" data-aos-delay="200">
            相信生命需要點綴
            <span class="font-xs font-sm-sm font-italic d-block font-weight-normal mt-1">
              Believe that life needs embellishment</span>
          </h5>
          <p class="font-sm font-h6-sm mb-3 mb-md-6" data-aos="fade-up" data-aos-delay="400">
            我們相信生命需要點綴，花賦予我們更繽紛的人生。 <br>
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            是我們對每個人的祝福。
            在喧鬧的都市角落，讓
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            為你的一天點綴上色彩
            花朵隨著季節的變化交替著它的色彩，帶給每一個平凡的日常不一樣的心情。
            慢下腳步，感受
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            的朝氣，將各種美好分享給大家
          </p>
          <p class="font-sm font-h6-sm" data-aos="fade-up" data-aos-delay="450">
            我們相信生命需要點綴，花賦予我們更繽紛的人生。
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            是我們對每個人的祝福。
            在喧鬧的都市角落，讓
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            為你的一天點綴上色彩
            花朵隨著季節的變化交替著它的色彩，帶給每一個平凡的日常不一樣的心情。
            慢下腳步，感受
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            的朝氣，將各種美好分享給大家
          </p>
        </div>
      </div>
    </section>
    <section class="container-fluid container-lg mb-8 mb-md-12 mb-lg-20">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center
          mb-6 mb-md-0 px-md-0 px-lg-4" data-aos="fade-up">
          <img class="img-cover img-fluid"
            src="../../assets/images/about/people.jpg" alt="花與笑容">
        </div>
        <div class="col-12 col-sm-10 col-md-6 d-flex flex-column justify-content-center
          align-items-center px-lg-8 px-xl-15" data-aos="fade-up" data-aos-duration="2000">
          <h5 class="h4 text-letter-spacing-2 mb-4 text-center">
            讓幸福變得更簡單
            <span class="font-xs font-sm-sm font-italic d-block font-weight-normal mt-1">
              Make happiness easier</span>
          </h5>
          <p class="font-sm font-h6-sm mb-2">
            為你傳遞一份純粹而美好的心意，讓「幸福」變得更簡單。<br>
          </p>
          <p class="font-sm font-h6-sm">
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            陪伴著每一個人記憶生命中的美好片段。
            量身打造專屬於你們的回憶與感動，為「幸福」點上印記，
            透過無數個獨一無二的花禮，見證每個重要時刻。 <br>
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            精緻高貴的設計，精準描繪出「幸福」的形狀，細心對待每一位顧客，
            <router-link class="font-family-raleway hover--shadowLine"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            永遠為你獻上最真誠的祝福，用行動來表達我們的追求。
            能讓你在生活中的每個當下，能夠使美好時刻更加美好。
          </p>
        </div>
      </div>
    </section>
    <section class="container mb-8 mb-md-12 mb-lg-20">
      <div class="row mb-8 mb-md-12">
        <div class="col text-center">
          <h3 class="font-h4 font-h3-xs font-weight-normal text-letter-spacing-3
            border-bottom border-warning d-inline pb-2">Serivce</h3>
        </div>
      </div>
      <ol class="row list-unstyled">
        <li class="col-6 col-md-3 text-center mb-6" data-aos="fade-up" data-aos-delay="00">
          <div class="serivce__img-1 bg-cover rounded-circle mb-n10"
            style="padding-top: 100%"></div>
          <span class="h6 font-h5-md font-family-raleway text-white text-letter-spacing-1
            d-inline-block border-bottom pb-1 mb-5">01</span>
          <h4 class="h5 font-h4-md text-base mb-2">Design</h4>
          <p class="px-lg-5">
            花藝設計｜大型花禮｜花束｜盆花｜恆星花｜乾燥花
          </p>
        </li>
        <li class="col-6 col-md-3 text-center mb-6" data-aos="fade-up" data-aos-delay="150">
          <div class="serivce__img-2 bg-cover rounded-circle mb-n10"
            style="padding-top: 100%"></div>
          <span class="h6 font-h5-md font-family-raleway text-white text-letter-spacing-1
            d-inline-block border-bottom pb-1 mb-5">02</span>
          <h4 class="h5 font-h4-md text-base mb-2">Garden</h4>
          <p class="px-lg-5">
            空間造景｜住宅庭院｜活動展場｜商業空間花藝規劃
          </p>
        </li>
        <li class="col-6 col-md-3 text-center mb-6" data-aos="fade-up" data-aos-delay="300">
          <div class="serivce__img-3 bg-cover rounded-circle mb-n10"
            style="padding-top: 100%"></div>
          <span class="h6 font-h5-md font-family-raleway text-white text-letter-spacing-1
            d-inline-block border-bottom pb-1 mb-5">03</span>
          <h4 class="h5 font-h4-md text-base mb-2">Wedding</h4>
          <p class="px-lg-5">
            客製化主題規劃｜新娘捧花｜婚禮精品花禮｜燈光音響統籌
          </p>
        </li>
        <li class="col-6 col-md-3 text-center mb-6" data-aos="fade-up" data-aos-delay="450">
          <div class="serivce__img-4 bg-cover rounded-circle mb-n10"
            style="padding-top: 100%"></div>
          <span class="h6 font-h5-md font-family-raleway text-white text-letter-spacing-1
            d-inline-block border-bottom pb-1 mb-5">04</span>
          <h4 class="h5 font-h4-md text-base mb-2">Exhibition</h4>
          <p class="px-lg-5">
            活動會場布置｜品牌發表會｜私人派對｜商業花藝規劃
          </p>
        </li>
      </ol>
    </section>
    <section class="container access">
      <div class="row pb-5 pb-xs-10 pb-sm-12 pb-lg-20">
        <div class="col-10">
          <div class="access__inner text-center">
            <h3 class="h5 font-h3-sm font-h2-lg font-weight-normal text-md-left
              mb-1 mb-md-2  pt-2 pt-xs-3 px-md-2 px-lg-6">Access</h3>
            <img class="img-cover w-100" data-aos="fade-up-right"
              src="../../assets/images/about/access.jpg" alt="實體店家">
          </div>
        </div>
        <div class="col-12 col-sm-10 col-md-7 d-flex
          justify-content-center mt-2 mt-lg-7 mt-xl-9 mx-auto px-0">
          <dl class="bg-white p-2" data-aos="zoom-in">
            <div class="mb-2 mb-md-3 mb-xl-5">
              <dt class="font-h6 d-sm-inline badge badge-light mr-2">門市位置</dt>
              <dd class="d-sm-inline">台北市大大區小小小路5段66巷77弄88號</dd>
            </div>
            <div class="mb-2 mb-md-3 mb-xl-5">
              <dt class="font-h6 d-sm-inline badge badge-light mr-2">電話號碼</dt>
              <dd class="d-sm-inline">02-1234-1234</dd>
            </div>
            <div class="">
              <dt class="font-h6 d-sm-inline badge badge-light mr-2">營業時間</dt>
              <dd class="d-sm-inline">9:30 ~ 18:30</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <section class="container-fluid bg-gradual">
      <div class="row justify-content-center py-6 py-sm-8 pt-lg-10"
        data-aos="fade-up" data-aos-duration="1500">
        <div class="col text-center">
          <p class="font-sm font-h6-sm text-info mb-4">
            追求精緻高貴的設計與服務至上的理念<br>
            把愛化成行動來表達我們
            <router-link class="font-family-raleway hover--shadowLine text-dark"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            的祝福<br>
            <router-link class="font-family-raleway hover--shadowLine text-dark"
              :to="{ name: 'Home' }">Flower Shop</router-link>
            提供各種花束、祝賀花禮籃及婚禮佈置
            <span class="pt-4 d-block"> 歡迎您蒞臨</span>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
// 僅限 image url
.banner__img {
  background-image: url("../../assets/images/about/banner.jpg");
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
