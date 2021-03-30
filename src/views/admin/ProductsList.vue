<template>
  <div class="back-grid-setting d-flex flex-column justify-content-between">
    <main>
      <div class="d-flex align-items-center justify-content-between
        mt-4 mb-6 mx-md-4">
        <h2 class="h4 text-dark">Product List</h2>
        <button class="btn ml-8 font-weight-bold hover--colorPrimary"
          @click="openModal(true)">
          <span class="fas fa-plus mr-1 text-primary"></span>
          Add
          <span class="d-none d-md-inline hover--colorPrimary">New Product</span>
        </button>
      </div>
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col" class="d-none d-sm-table-cell">狀態</th>
            <th scope="col" class="d-none d-lg-table-cell">縮圖</th>
            <th scope="col" class="text-left">名稱</th>
            <th scope="col" class="d-none d-md-table-cell">分類</th>
            <th scope="col" class="d-none d-md-table-cell text-right">原價</th>
            <th scope="col" class="text-right">售價</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-dark cursor-pointer hover--shadow"
            v-for="item in productList" :key="item.id"
            @click="detailModal(item)">
            <td class="align-middle d-none d-sm-table-cell">
              <span v-if="item.is_enabled" class="text-success">啟動</span>
              <span v-else class="text-danger">未啟動</span></td>
            <td class="align-middle d-none d-lg-table-cell">
              <img :src="item.imageUrl" alt="" class="img-cover" height="50px" width="50px">
            </td>
            <td class="align-middle text-left">
              {{ item.title }}</td>
            <td class="align-middle d-none d-md-table-cell">
              {{ item.category }}</td>
            <td class="align-middle d-none d-md-table-cell text-right">
              {{ item.origin_price | currency }}</td>
            <td class="align-middle text-right">
              {{ item.price | currency }}</td>
            <th class="align-middle">
              <button class="btn btn-sm hover--colorPrimary"
                @click.stop="openModal(false, item)">
                <span class="fas fa-pen fa-lg"></span>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </main>
    <Pagination :page="page" @ChanePageKey="getProductsList"></Pagination>
    <!-- Modal -->
    <!-- Updata Modal -->
    <div class="modal fade" id="updataModal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <ValidationObserver ref="form">
        <form class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark">
              <h5 class="modal-title font-weight-normal" id="exampleModalLabel">
                <span class="font-weight-bold" v-if="isCreate">New</span>
                <span class="font-weight-bold" v-else>Edit</span>
                Product
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">使用圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <div class="form-group">
                    <label for="customFile">使用本機圖片檔案
                    <i class="fas fa-spinner fa-spin mx-1"
                      v-if="status.itemLodingId === 'change'"></i>
                    </label>
                    <input type="file" id="customFile" class="form-control"
                      ref="files" @change="uploadFile">
                  </div>
                  <img class="img-fluid mb-4" :src="tempProduct.imageUrl" alt="">
                  <hr class="d-sm-none">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">商品名稱</label>
                    <ValidationProvider name="名稱" rules="required" v-slot="{ errors }">
                      <input type="text" class="form-control" id="title"
                        placeholder="請輸入商品名稱"
                        v-model="tempProduct.title">
                      <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="title_EN">英文名稱</label>
                    <ValidationProvider name="英文名稱" rules="required" v-slot="{ errors }">
                      <input type="text" class="form-control" id="title_EN"
                        placeholder="請輸入英文名稱"
                        v-model="tempProduct.title_EN">
                      <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-6">
                      <label for="category">分類</label>
                      <ValidationProvider name="分類" rules="required" v-slot="{ errors }">
                        <input type="text" class="form-control" id="category"
                          placeholder="請輸入分類"
                          v-model="tempProduct.category">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-6">
                      <label for="price">單位</label>
                      <ValidationProvider name="單位" rules="required" v-slot="{ errors }">
                        <input type="unit" class="form-control" id="unit"
                          placeholder="請輸入單位"
                          v-model="tempProduct.unit">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-6">
                    <label for="origin_price">原價</label>
                    <ValidationProvider name="原價" rules="required" v-slot="{ errors }">
                      <input type="number" class="form-control" id="origin_price"
                        placeholder="請輸入原價"
                        v-model="tempProduct.origin_price">
                      <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="form-group col-6">
                      <label for="price">售價</label>
                      <ValidationProvider name="售價" rules="required" v-slot="{ errors }">
                        <input type="number" class="form-control" id="price"
                          placeholder="請輸入售價"
                          v-model="tempProduct.price">
                        <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="col-12">
                  <div class="form-group">
                    <label for="content">花語</label>
                    <ValidationProvider name="花語" rules="required" v-slot="{ errors }">
                      <textarea type="text" class="form-control" id="content"
                        placeholder="請輸入產品的花語" rows="1"
                        v-model="tempProduct.content"></textarea>
                      <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <ValidationProvider name="描述" rules="required" v-slot="{ errors }">
                      <textarea type="text" class="form-control" id="description"
                        placeholder="請輸入產品描述" rows="3"
                        v-model="tempProduct.description"></textarea>
                      <span class="font-sm text-danger-500">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group mb-0">
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
                <div class="col d-sm-none mb-3" v-if="!isCreate">
                  <hr>
                  <p class="text-danger mb-1">
                    <span class="fas fa-exclamation-triangle mr-1"></span>
                    刪除商品</p>
                  <a class="btn btn-outline-danger btn-block font-weight-bold font-family-raleway"
                    href="#" type="button" data-dismiss="modal"
                    @click="openModal(false, tempProduct, true)">
                    Delete This Product !</a>
                </div>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <a v-if="!isCreate" type="button" href="#" data-dismiss="modal"
                class="btn text-danger font-weight-bold d-none d-sm-block"
                @click="openModal(false, tempProduct, true)">
                <span class="fas fa-exclamation-triangle"></span>
                Delete This Product !</a>
              <div class="ml-auto">
                <button type="button" class="btn btn-outline-gray m-1"
                  data-dismiss="modal">Cancle</button>
                <button type="submit" class="btn modal-btn m-1" v-if="isCreate"
                  @click="updataProduct">
                  <i class="fas fa-spinner fa-spin mx-1"
                    v-if="status.itemLodingId === true"></i>
                    Add</button>
                <button type="submit" class="btn modal-btn m-1" v-else
                  @click="updataProduct">
                  <i class="fas fa-spinner fa-spin mx-1"
                    v-if="status.itemLodingId === true"></i>
                    Update</button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!-- Del Modal -->
    <div class="modal fade" id="delModal" tabindex="-1"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title font-weight-normal text-white" id="exampleModalLabel">
              <span class="font-weight-bold">Del</span>
              Proudct
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-danger mb-2">
              <span class="fas fa-exclamation-triangle mr-1"></span>
              刪除後將無法恢復 !</p>
            <p>是否刪除<strong class="text-black">【 {{ tempProduct.title }} 】</strong>這項商品。
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-gray" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger font-weight-bold"
              @click="delProduct">
              <i class="fas fa-spinner fa-spin mx-1"
                v-if="status.itemLodingId === true"></i>
                Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Detail Modal -->
    <div class="modal fade" id="detailModal" tabindex="-1"
      aria-labelledby="detailModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header py-2 border-0 d-sm-none">
            <button type="button" data-dismiss="modal" aria-label="Close"
              class="close text-secondary focus--outline-none">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body pt-0 pt-sm-8">
            <button type="button" data-dismiss="modal" aria-label="Close"
              class="close position-absolute text-secondary d-none d-sm-block focus--outline-none">
              <i class="fas fa-times"></i>
            </button>
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-6">
                  <img class="img-cover" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="col-sm-6 d-flex flex-column justify-content-around">
                  <h3 class="h4 text-dark my-2">{{ tempProduct.title }}
                    <span class="font-sm">|</span>
                    <span class="font-sm text-brown"> {{ tempProduct.category }}</span>
                  </h3>
                  <p class="font-sm">花語：{{ tempProduct.content }}</p>
                  <div class="d-flex my-2 justify-content-between align-items-center">
                    <h4 class="h5 text-dark">
                      <span class="badge badge-pill badge-primary h5 py-1 d-flex align-items-center"
                        v-if="tempProduct.is_enabled">
                        <i class="fas fa-check mr-1"></i>
                        Public</span>
                      <span class="badge badge-pill badge-primary h5 py-1 d-flex align-items-center"
                        v-else>
                        <i class="fas fa-lock mr-1"></i>
                        Private</span>
                    </h4>
                    <a class="text-primary" role="button"
                      data-toggle="collapse" href="#collapseExample"
                      aria-expanded="true" aria-controls="collapseExample">
                      <span class="fas fa-chevron-down"></span>
                    </a>
                  </div>
                </div>
                <div class="col-sm-12 collapse pt-3 show" id="collapseExample">
                  <div class="row">
                    <div class="col-12">
                      <table class="table table-sm mb-sm-3">
                        <tbody>
                          <tr class="border-2">
                            <th class="text-center">售價</th>
                            <td>{{ tempProduct.price | currency }}</td>
                            <th class="d-none d-sm-table-cell text-center">原價</th>
                            <td class="d-none d-sm-table-cell">
                              {{ tempProduct.origin_price | currency }}</td>
                            <th class="d-none d-sm-table-cell text-center">單位</th>
                            <td class="d-none d-sm-table-cell">
                              {{ tempProduct.unit }}</td>
                          </tr>
                          <tr class="d-sm-none border-2">
                            <th class="text-center">原價</th>
                            <td>{{ tempProduct.origin_price | currency }}</td>
                          </tr>
                          <tr class="d-sm-none border-2">
                            <th class="text-center">單位</th>
                            <td>{{ tempProduct.unit }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-12">
                      <p class="px-1 font-sm text-black">
                        關於
                        <span class="text-gray">{{ tempProduct.title }}</span>
                        ，{{ tempProduct.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between py-1">
            <a type="button" href="#" data-dismiss="modal"
              class="font-xs font-h6-sm text-danger font-weight-bold text-decoration-none px-2"
              @click="openModal(false, tempProduct, true)">
              <span class="fas fa-exclamation-triangle"></span>
              Delete This Product !</a>
            <button type="button" data-dismiss="modal"
              class="font-sm font-h6-xs btn btn-dark font-weight-bold m-1 px-2 px-xs-3"
              @click="openModal(false, tempProduct, false)">
              Edit <span class="font-weight-normal">product</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';
import { mapActions, mapGetters } from 'vuex';

extend('required', {
  ...required,
  message: '{_field_} 欄位不得留空',
});

export default {
  components: {
    Pagination,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      productId: '',
      isCreate: true,
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
    updataProduct() {
      const vm = this;
      vm.$refs.form.validate().then((valid) => {
        if (valid) {
          vm.$store.dispatch('productModules/updataProduct', vm.isCreate);
        } else {
          vm.$store.dispatch(
            'alertMessageModules/updateMessage',
            { message: '欄位填寫不完整', status: 'danger' },
          );
        }
      });
    },
    openModal(isCreate, product, isDelete = false) {
      if (isDelete) {
        $('#delModal').modal('show');
        this.$store.state.productModules.tempProduct = { ...product };
      } else {
        this.isCreate = isCreate;
        if (isCreate) {
          this.$store.state.productModules.tempProduct = {};
        } else {
          this.$store.state.productModules.tempProduct = { ...product };
        }
        $('#updataModal').modal('show');
      }
    },
    detailModal(product) {
      this.$store.state.productModules.tempProduct = { ...product };
      $('#detailModal').modal('show');
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
