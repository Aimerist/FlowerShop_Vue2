<template>
  <div>
    <AlertMessage></AlertMessage>
    <header class="header navbar navbar-light sticky-top bg-white
      flex-row py-0 px-3 shadow">
      <h1 class="navbar-brand py-2 pl-md-4 pl-lg-8">
        <a class="navbar-brand mr-0 text-decoration-none" href="./index.html">Flower Shop</a>
      </h1>
      <button class="navbar-toggler d-md-none collapsed"
        data-toggle="collapse" data-target="#sidebarMenu"
        aria-controls="sidebarMenu" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </header>
    <div class="container-fluid mt-0">
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import AlertMessage from '../components/AlertMessage.vue';

export default {
  components: {
    Sidebar,
    AlertMessage,
  },
};
</script>

<style lang="scss"  scoped scope="this api replaced by slot-scope in 2.5.0+">
  .header {
    @media (min-width: 768px) {
      width: 200px;
      background-color: transparent !important;
      box-shadow: none !important;
    }
    @media (min-width: 992px) {
      width: 240px;
    }
  }
  i {
    vertical-align: text-bottom;
  }
</style>
