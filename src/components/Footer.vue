<template>
  <footer class="text-center position-relative">
    <nav class="position-absolute d-inline-flex bg-primary-200
      px-2 px-xs-4 px-md-10 py-1 py-xs-2 py-md-3">
      <ul class="list-inline z-index-2">
        <li class="list-inline-item text-white-80">
          <router-link class="text-decoration-none px-1 mr-1 px-xs-2 mr-xs-2 hover--shadowLine"
            :to="{ name: 'Home' }">Home</router-link>|</li>
        <li class="list-inline-item text-white-80">
          <router-link class="text-decoration-none px-1 mr-1 px-xs-2 mr-xs-2 hover--shadowLine"
            :to="{ name: 'Products' }">Product</router-link>|</li>
        <li class="list-inline-item text-white-80">
          <router-link class="text-decoration-none px-1 mr-1 px-xs-2 mr-xs-2 hover--shadowLine"
            :to="{ name: 'About' }">About</router-link>|</li>
        <li class="list-inline-item text-white-80">
          <router-link class="text-decoration-none px-1 mr-1 px-xs-2 mr-xs-2 hover--shadowLine"
            :to="{ name: 'Cart' }">Cart</router-link></li>
      </ul>
    </nav>
    <div class="border-top border-primary-300 border-2 pt-4 pt-xs-6 pt-md-8 pb-3">
      <ul class="list-inline py-2">
        <li class="list-inline-item">
          <a class="text-info h4 font-weight-normal" href="#">
            <i class="fab fa-facebook-f hover--colorPrimary"></i></a></li>
        <li class="list-inline-item">
          <a class="text-info h4 font-weight-normal" href="https://github.com/Aimer-ist" target="_blank">
            <i class="fab fa-github hover--colorPrimary"></i></a></li>
        <li class="list-inline-item">
          <a class="text-info h4 font-weight-normal" href="#">
            <i class="fab fa-instagram hover--colorPrimary"></i></a></li>
        <li class="list-inline-item">
          <a class="text-info h4 font-weight-normal" href="#" type="mail">
            <i class="fas fa-envelope hover--colorPrimary"></i></a></li>
      </ul>
      <div class="list-inline font-weight-bold text-info">
        2020 ©
        <a class="hover--shadowLine text-warning text-decoration-none" href="https://github.com/Aimer-ist/FlowerShop" target="_blank">&ensp;WangPeiShing&ensp;</a>
      </div>
      <p class="text-center">僅做為個人學習使用，非商業用途</p>
    </div>
  </footer>
</template>
