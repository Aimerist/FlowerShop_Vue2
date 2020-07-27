<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h1 class="h2">產品列表</h1>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">分類</th>
          <th scope="col">縮圖</th>
          <th scope="col">名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Products" :key="item.id">
          <td scope="row" class="d-md-table-cell d-none align-middle">
            {{item.category}}</td>
          <td class="d-lg-table-cell d-none align-middle">
            <img :src="item.imageUrl" alt="" style="height: 80px;width: 80px; border-style: none">
          </td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.title}}</td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.origin_price}}</td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.price}}</td>
          <td class="d-md-table-cell d-none align-middle">
            {{item.is_enabled}}</td>
          <th class="d-md-table-cell d-none align-middle">
            <button class="btn btn-outline-info btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Products: {},
    };
  },
  methods: {
    getProductsList() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/products`;
      vm.$http.get(url).then((response) => {
        if (response.data.success) {
          vm.Products = JSON.parse(JSON.stringify(response.data.products));
        }
      });
    },
  },
  created() {
    this.getProductsList();
  },
};
</script>
