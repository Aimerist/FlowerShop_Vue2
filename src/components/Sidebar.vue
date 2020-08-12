<template>
  <div>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <hr>
        <h6 class="sidebar-heading d-flex justify-content-between
          align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'ProductsList'}">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'OrderList'}">
              <i class="far fa-list-alt"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'CouponList'}">
              <i class="fas fa-ticket-alt"></i>
              優惠卷列表
            </router-link>
          </li>
        </ul>
        <hr>
        <h6 class="sidebar-heading d-flex justify-content-between
          align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'Products'}">
              <i class="fas fa-shopping-cart"></i>
              購物
            </router-link>
          </li>
        </ul>
        <hr>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" @click.prevent="">
              <i class="fas fa-sign-out-alt"></i>
              登出
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 60px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  text-align: left;
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
    text-align: center;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}
</style>
