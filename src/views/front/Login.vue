<template>
  <main class="container grid-setting">
    <div class="row justify-content-center pt-md-10">
      <div class="col-10 col-md-6 col-lg-4 text-center">
        <h2 class="d-flex flex-column  text-brown mb-5" data-aos="fade-up">
          <i class="fas fa-users fa-2x mb-2"></i>
          管理者登入</h2>
        <form @submit.prevent="signin" data-aos="fade-up" data-aos-delay="100">
          <input type="email" class="form-control"
            id="inputEmail" placeholder="Email address"
            v-model="user.username" required>
          <input type="password" class="form-control mb-5"
            id="inputPassword" placeholder="Passwords"
            v-model="user.password" required>
          <button class="btn btn-lg btn-primary btn-block text-white font-weight-bold mb-5"
            type="submit">LOGIN</button>
        </form>
        <router-link class="text-brown font-weight-bold hover--shadowLine"
          :to="{ name: 'Products' }" data-aos="fade-up" data-aos-delay="200">
          <i class="fas fa-arrow-left"></i>
          回到 Flower Shop 購物
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.$http.post(url, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push({ name: 'ProductsList' })
        } else {
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' }
          )
        }
      })
    }
  }
}
</script>

<style scoped>
input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
