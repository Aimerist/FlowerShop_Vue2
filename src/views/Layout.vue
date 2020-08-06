<template>
  <div>
    <nav class="navbar navbar-expand-lg fixed-top py-3  rounded text-uppercase ">
      <div class="container-xl navbar-light">
        <a class="navbar-brand" href="#">Flower Shop</a>
        <button type="button" data-toggle="collapse" data-target="#navbarsExample07XL"
          aria-controls="navbarsExample07XL" aria-expanded="false"
          aria-label="Toggle navigation"  class="navbar-toggler">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07XL">
          <ul class="navbar-nav mr-auto color">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home
                <span class="sr-only">(current)</span></router-link></li>
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'Products' }">Product</router-link></li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" href="#">Coupon</router-link></li> -->
            <li class="nav-item">
              <router-link class="nav-link"
                to="/about">About</router-link></li>
            <li class="nav-item">
              <router-link class="nav-link"
                to="/login">Login</router-link></li>
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'ProductsList' }">Dashboard</router-link></li>
          </ul>
          <div class="">
            <button class="btn iocnBtn"><i class="fas fa-shopping-cart color fa-lg"></i></button>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
  },
};
</script>

<style>
.color {
  color: #555;
  /* eebe00 */
}

.navbar {
  transition: all 0.4s;
  background-color: #fff;
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  margin-top: 0.25rem;
}

.navbar-nav .nav-item .nav-link,
.navbar .navbar-brand {
  color: #d1a813;
}

.navbar .navbar-brand:hover,
.navbar .navbar-brand:focus,
.navbar-nav .nav-item .nav-link:hover,
.navbar-nav .nav-item .nav-link:focus {
  color: #b69418;
  text-decoration: none;
  font-weight: 500;
}

/* Change navbar styling on small viewports */
@media (max-width: 991.98px) {
  .navbar {
    background: #fff;
  }

  .navbar-nav .nav-item .nav-link,
  .navbar .navbar-brand {
    color: #555;
  }

  .navbar-nav .nav-item .nav-link {
    padding-left: 5vw;
  }

  .navbar .navbar-brand:hover,
  .navbar .navbar-brand:focus,
  .navbar-nav .nav-item .nav-link:hover,
  .navbar-nav .nav-item .nav-link:focus {
    color: #cfa91e;
    text-decoration: none;
    font-weight: 500;
  }
}

</style>
