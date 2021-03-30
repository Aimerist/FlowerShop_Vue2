<template>
  <nav id="sidebarMenu" class="d-md-block bg-white sidebar collapse">
    <div class="sidebar-sticky">
      <div class="mx-4 mb-1 mt-4 text-secondary border-bottom d-none d-md-block">
        <span class="font-sm d-block pb-1 pl-2">後台管理</span>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'ProductsList' }">
            <i class="fas fa-box-open mr-3 mr-md-2"></i>
              Product
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'OrderList' }">
            <i class="far fa-list-alt mr-3 mr-md-2"></i>
            Order
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'CouponList' }">
            <i class="fas fa-ticket-alt mr-3 mr-md-2"></i>
            Coupon
          </router-link>
        </li>
      </ul>
      <div class="mx-4 mb-2 mt-4 text-secondary border-bottom d-none d-md-block">
        <span class="font-sm d-block pb-1 pl-2">模擬功能</span>
      </div>
      <router-link class="nav-link" :to="{ name: 'Products' }">
        <i class="fas fa-shopping-cart mr-3 mr-md-2"></i>
        Shopping
      </router-link>
      <div class="sidebar-fooder position-absolute border-top text-center">
        <a class="nav-link my-md-2" href="#" @click.prevent="signout">
          <i class="fas fa-sign-out-alt mr-md-2 d-none d-md-inline-block"></i>
          Sign out
          <i class="fas fa-sign-out-alt ml-2 d-md-none"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signout() {
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          this.$router.push({ name: 'Products' });
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
