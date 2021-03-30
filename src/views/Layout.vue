<template>
  <div>
    <AlertMessage></AlertMessage>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertMessage from '../components/AlertMessage.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    AlertMessage,
    Header,
    Footer,
  },
  data() {
    return {
      isLongin: false,
    };
  },
  computed: {
    ...mapGetters('productModules', ['filterProducts']),
  },
  methods: {
    Loginstatus() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.isLongin = true;
        } else {
          vm.isLongin = false;
        }
      });
    },
  },
  created() {
    this.Loginstatus();
    this.$store.dispatch('productModules/getProductList', { isFront: true });
  },
};
</script>
