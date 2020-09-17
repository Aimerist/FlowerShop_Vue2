<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap
      align-items-center pt-3 pb-2">
      <h3 class="h2 ml-5 my-2 font-weight-bold text-primary">產品列表</h3>
      <button class="btn btn-success mr-5"
        @click="openModal(false)">新增產品</button>
    </div>
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th scope="col" class="d-sm-table-cell d-none">是否啟用</th>
          <th scope="col" class="d-md-table-cell d-none">分類</th>
          <th scope="col" class="d-lg-table-cell d-none">縮圖</th>
          <th scope="col" class="text-left">名稱</th>
          <th scope="col" class="d-md-table-cell d-none text-right">原價</th>
          <th scope="col" class="text-right">售價</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-dark"
          v-for="item in productList" :key="item.id">
          <td class="d-sm-table-cell d-none align-middle">
            <span v-if="item.is_enabled" class="text-success">啟動</span>
            <span v-else class="text-danger">未啟動</span></td>
          <td scope="row" class="d-md-table-cell d-none align-middle">
            {{item.category}}</td>
          <td class="d-lg-table-cell d-none align-middle">
            <img :src="item.imageUrl" alt="" style="height: 80px;width: 80px; border-style: none">
          </td>
          <td class="align-middle text-left">
            {{item.title}}</td>
          <td class="d-md-table-cell d-none align-middle text-right">
            {{item.origin_price | currency}}</td>
          <td class="align-middle text-right">
            {{item.price | currency}}</td>
          <th class="align-middle">
            <button class="btn btn-outline-info btn-sm mr-1"
              @click="openModal(true, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openModal(false ,item, true)">刪除</button>
          </th>
        </tr>
      </tbody>
    </table>
    <Pagination :page="page" @ChanePageKey="getProductsList"></Pagination>
<!-- Modal -->
    <!-- updataModal -->
    <div class="modal fade" id="updataModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-success text-white"
            :class="{ 'bg-info': isEdit }">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="!isEdit">新增產品</span>
              <span v-else>編輯產品</span>
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
                  <i class="fas fa-spinner fa-spin mx-1"
                    v-if="status.itemLodingId === 'change'"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-6">
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
            <button type="button" class="btn btn-outline-gray" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-success"  v-if="!isEdit"
              @click="updataProduct(isEdit, tempProduct)">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認新增</button>
            <button type="button" class="btn btn-info" v-else
              @click="updataProduct(isEdit, tempProduct)">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認編輯</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
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
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品。
            <em class="text-gray f-size75">(刪除後將無法恢復 )</em>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-gray" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="delProduct">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      productId: '',
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters(['page', 'status']),
    ...mapGetters('productModules', ['productList', 'tempProduct']),
  },
  methods: {
    ...mapActions('productModules', ['delProduct']),
    getProductsList(page) {
      this.$store.dispatch('productModules/getProductList', { isFront: false, page });
    },
    updataProduct(isEdit) {
      this.$store.dispatch('productModules/updataProduct', isEdit);
    },
    openModal(isEdit, product, isDelete = false) {
      if (isDelete) {
        this.$store.state.productModules.tempProduct = { ...product };
        $('#delModal').modal('show');
      } else {
        this.isEdit = isEdit;
        if (isEdit) {
          this.$store.state.productModules.tempProduct = { ...product };
        } else {
          this.$store.state.productModules.tempProduct = {};
        }
        $('#updataModal').modal('show');
      }
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUTOMPATH}/admin/upload`;
      vm.$store.commit('ITEM_LOADING_ID', 'change');
      vm.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: '圖片上傳成功', status: 'success' },
          );
        } else {
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: response.data.message, status: 'danger' },
          );
        }
        vm.$store.commit('ITEM_LOADING_ID', '');
      });
    },
  },
  created() {
    this.getProductsList();
  },
};
</script>
