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
                <a type="button" class="btn text-dark" data-toggle="dropdown">
                  <i class="fas fa-shopping-cart fa-lg"></i>
                  <span class="badge badge-pill badge-danger">{{ Carts.length }}</span>
                </a>
                <div class="dropdown-menu shadow">
                  <div class="p-2 px-sm-3">
                    <h5 class="text-center">購物車</h5>
                    <table class="table mb-2 table-hover" style="min-width:270px">
                      <tbody>
                        <tr class="cursor-pointer"
                          v-for="cart in Carts" :key="cart.id"
                          @click="productLink(cart.product_id)">
                          <td class="align-middle px-2">
                            <a class="btn-del text-danger"
                              @click.stop.prevent="removeCartItem(cart.id)">
                              <i class="fas fa-trash-alt"></i>
                            </a>
                          </td>
                          <td class="align-middle px-1">
                            <div class="bg-cover"
                              :style="`background-image:url(${ cart.product.imageUrl });`"></div>
                          </td>
                          <td class="py-1 px-0">
                            <div class="align-middle px-0 f-size75">
                              <div class="text-dark">{{ cart.product.title }}</div>
                              <div class="text-secondary">
                                {{ cart.qty }}/{{ cart.product.unit }}</div>
                            </div>
                          </td>
                          <td class="text-right align-middle px-1 text-success font-weight-bold">
                            {{ cart.total | currency }}</td>
                        </tr>
                        <tr>
                          <td class="text-center p-0 m-0" v-if="Carts.length===0">
                            <div class="text-center bg-brownlight m-0 p-4">
                              <div>購物車內沒有任何商品唷!!</div>
                              <router-link :to="{ name: 'Products'}"
                                class="btn btn-md btn-primary py-1 mt-3 h5 text-white">
                                前往購物</router-link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <router-link class="btn btn-block btn-important text-white"
                      :to="{ name: 'Cart' }"
                      v-if="Carts.length !== 0">
                      <i class="fas fa-cart-arrow-down"></i>
                      結帳去</router-link>
                  </div>
                </div>
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

<script>
export default {
  data() {
    return {
      Carts: {},
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Carts = response.data.data.carts;
        }
      });
    },
    productLink(id) {
      this.$router.push({ name: 'ProductDetail', params: { productId: id } });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/cart/${id}`;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        vm.$bus.$emit('message:push', response.data.message, 'warning');
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

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

.dropdown-menu {
  position: absolute;
  left: -248px;
  width: 300px;
  border-color: #e9eaec;
  &:before {
    position: absolute;
    content: "";
    top: -20px;
    left: 92%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #e9eaec transparent;
  }
  &:after {
    position: absolute;
    content: "";
    top: -18px;
    left: 92%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
  }
  .bg-cover {
    width: 35px;
    height: 35px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .btn-del {
    &:hover {
      margin-right: -4px;
      i {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
