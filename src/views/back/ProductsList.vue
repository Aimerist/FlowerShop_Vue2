<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h3 class="h3">產品列表</h3>
      <button class="btn btn-success mr-5"
        @click="openProductModal(false)">新增產品</button>
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
            <span v-if="item.is_enabled" class="text-success">啟動</span>
            <span v-else class="text-secondary">未啟動</span></td>
          <th class="d-md-table-cell d-none align-middle">
            <button class="btn btn-outline-info btn-sm mr-1"
              @click="openProductModal(true, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openDelProductModal(item)">刪除</button>
          </th>
        </tr>
      </tbody>
    </table>
<!-- Modal -->
    <!-- product -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files">
                </div>
                <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled" >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updataProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delProduct -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      Products: {},
      tempProduct: {},
      productId: '',
      isEdit: false,
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
    openProductModal(isEdit, product) {
      this.isEdit = isEdit;
      if (isEdit) {
        this.tempProduct = JSON.parse(JSON.stringify(product));
      } else {
        this.tempProduct = {};
      }
      $('#productModal').modal('show');
    },
    updataProduct() {
      const vm = this;
      let apiMethod = 'post';
      let apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product`;
      if (vm.isEdit) {
        apiMethod = 'put';
        apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product/${vm.tempProduct.id}`;
      }
      vm.$http[apiMethod](apiUrl, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          vm.getProductsList();
        } else {
          console.log(response.data);
        }
        $('#productModal').modal('hide');
      });
    },
    openDelProductModal(item) {
      this.tempProduct = item;
      $('#delProductModal').modal('show');
    },
    delProduct() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(url).then((response) => {
        if (response.data.success) {
          vm.getProductsList();
        }
        $('#delProductModal').modal('hide');
      });
    },
  },
  created() {
    this.getProductsList();
  },
};
</script>
