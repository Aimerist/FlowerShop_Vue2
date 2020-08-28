<template>
  <div>
    <footer class="footer text-center mt-5">
      <ul class="list-inline contact-info">
        <li class="list-inline-item">
          <a href="#" class="primary-color">
            <i class="fab fa-facebook-f"></i></a></li>
        <li class="list-inline-item">
          <a href="#" class="primary-color">
            <i class="fab fa-github"></i></a></li>
        <li class="list-inline-item">
          <a href="#" class="primary-color">
            <i class="fab fa-instagram"></i></a></li>
        <li class="list-inline-item">
          <a href="#" type="mail" class="primary-color">
            <i class="fas fa-envelope"></i></a></li>
      </ul>
      <!-- 僅做為個人學習使用，非商業用途。 -->
      <div class="copyright">
        2020 © <a href="#" class="link-line">WangPeiShing</a>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0;
  padding: 1rem 1rem;
  line-height: 1.5rem;
  border-top: 1px solid #EEDEA6;
  /* background-color: #f5eed7; */
}
.contact-info {
  font-size: 1.7rem;
  margin-bottom: 5px;
  margin-top: 15px;
}

.primary-color i {
  color: #5e573e;
}

.primary-color i:hover {
  color: #B69418;
}

.copyright {
  color: #555;
  .link-line {
    color: #6b460f;
  }
}
</style>
