<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link :to="{ name: 'Products' }">Product</router-link> |
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
      <a @click="signout">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./assets/all.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/products/all`;
      this.$http.get(url).then((respones) => {
        console.log(respones);
      });
    },
    signout() {
      const url = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          alert(response.data.message);
        }
      });
    },
  },
};
</script>
