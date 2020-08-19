<template>
  <div>
    <div class="h4 text-center mb-3">填 寫 訂 單 資 料</div>
    <div class="my-5 row justify-content-center">
  <form class="col-md-6 text-left">
    <div class="row">
      <div class="form-group col-md-6">
        <label for="useremail">Email</label>
        <input type="email" class="form-control" name="email" id="useremail"
          v-model="form.user.email" placeholder="請輸入 Email" required>
        <span class="text-danger"></span>
      </div>
      <div class="form-group col-md-6">
        <label for="username">收件人姓名</label>
        <input type="text" class="form-control" name="name" id="username"
          v-model="form.user.name" placeholder="輸入姓名">
        <span class="text-danger"></span>
      </div>
    </div>
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel"
        v-model="form.user.tel" placeholder="請輸入電話">
    </div>
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress"
        v-model="form.user.address" placeholder="請輸入地址">
      <span class="text-danger">地址欄位不得留空</span>
    </div>
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10"
      v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger">送出訂單</button>
    </div>
  </form>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: {},
      },
    };
  },
};
</script>
