<template>
  <div style="max-width: 500px; margin: 0 auto;">
    <table class="table">
        <tr><th>編號：</th><td>{{Product.id}}</td></tr>
        <tr><th>名稱：</th><td>{{Product.title}}</td></tr>
        <tr><th>分類：</th><td>{{Product.category}}</td></tr>
        <tr><th>內容：</th><td>{{Product.content}}</td></tr>
        <tr><th>描述：</th><td>{{Product.description}}</td></tr>
        <tr><th>售價：</th><td>{{Product.origin_price}}</td></tr>
        <tr><th>原價：</th><td>{{Product.price}}</td></tr>
        <tr><th>單位：</th><td>{{Product.unit}}</td></tr>
        <tr><th>是否啟用</th><td>{{Product.is_enabled}}</td></tr>
        <tr><th>圖片</th><td>
          <img style="height: 150px; background-size: cover; background-position: center"
            :src="Product.imageUrl" alt=""></td></tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: '',
      Product: {},
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/product/${vm.productId}`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Product = JSON.parse(JSON.stringify(response.data.product));
        }
      });
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>
