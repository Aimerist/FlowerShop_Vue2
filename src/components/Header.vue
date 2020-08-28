<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-white shadow">
      <div class="container-xl">
        <a class="navbar-brand text-uppercase" href="/index.html">flower shop</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarsExample07XL"
          aria-controls="navbarsExample07XL"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample07XL">
          <ul class="navbar-nav mr-auto align-items-center w-100">
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'Products' }">Product
                <span class="sr-only">(current)</span></router-link></li>
            <li class="nav-item">
              <a class="nav-link" href="#">Coupon</a></li>
            <li class="nav-item">
              <router-link class="nav-link"
                to="/about">About</router-link></li>
            <li class="nav-item">
              <router-link class="nav-link"
                :to="{ name: 'Login' }">Login</router-link></li>
            <li class="nav-item ml-auto">
              <!-- 購物車 -->
              <div class="btn-group">
                <button type="button" class="btn text-dark" data-toggle="dropdown">
                  <i class="fas fa-shopping-cart fa-lg"></i>
                  <span class="badge badge-pill badge-danger">3</span>
                </button>
              </div>
              <!-- 收藏夾 -->
              <div class="btn-group">
                <button type="button" class="btn text-dark" data-toggle="dropdown">
                  <i class="fas fa-heart fa-lg"></i>
                  <span class="badge badge-pill badge-danger">3</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.navbar .navbar-brand {
  font-size: 1.4rem;
  font-weight: bold;
  color: #B69418;
}

.navbar-nav .nav-item .nav-link {
  color: #5e573e;
}

.navbar .navbar-brand:hover,
.navbar .navbar-brand:focus {
  color: #D1A813;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.4rem;
}

.navbar-nav .nav-item .nav-link:hover,
.navbar-nav .nav-item .nav-link:focus {
  color: #B69418;
  text-decoration: none;
}

.btn-group .badge {
  position: absolute;
  top: auto;
  bottom: 18px;
  right: -5px;
}
</style>
