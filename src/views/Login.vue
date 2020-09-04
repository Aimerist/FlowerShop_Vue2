<template>
  <div class="container gap-setting">
    <form class="form-signin" @submit.prevent="signin">
      <img class="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg"
        alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-bold text-brown text-center">管理者登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required
        v-model="user.username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mb-3"
        placeholder="Password" required
        v-model="user.password">
      <button class="btn btn-lg btn-primary btn-block text-white"
        type="submit">登入</button>
      <div class="btn-block text-center mt-4">
        <router-link class="link-line text-brown font-weight-bold"
          :to="{ name: 'Products' }">
          <i class="fas  fa-arrow-left"></i>
          回到 Flower Shop 購物去</router-link>
      </div>
      <p class="mt-1 text-brown text-center">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$http.post(url, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push({ name: 'ProductsList' });
        }
      });
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
