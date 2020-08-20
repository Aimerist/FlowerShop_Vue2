<template>
  <div>
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
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

<style scoped>

body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
</style>
