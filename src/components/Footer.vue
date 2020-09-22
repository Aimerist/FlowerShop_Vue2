<template>
  <div>
    <footer class="footer text-center mt-5">
      <ul class="list-inline contact-info">
        <li class="list-inline-item">
          <a href="#" class="text-brown">
            <i class="fab fa-facebook-f"></i></a></li>
        <li class="list-inline-item">
          <a href="https://github.com/Aimer-ist" class="text-brown" target="_blank">
            <i class="fab fa-github"></i></a></li>
        <li class="list-inline-item">
          <a href="#" class="text-brown">
            <i class="fab fa-instagram"></i></a></li>
        <li class="list-inline-item">
          <a href="#" type="mail" class="text-brown">
            <i class="fas fa-envelope"></i></a></li>
      </ul>
      <!-- 僅做為個人學習使用，非商業用途。 -->
      <div class="copyright font-weight-bold">
        2020 © <a href="https://github.com/Aimer-ist/FlowerShop" class="link-line text-primary" target="_blank">WangPeiShing</a>
      </div>
      <p class="m-0 text-brown text-center">僅做為個人學習使用，非商業用途</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  margin: 0;
  padding: 1rem 1rem;
  line-height: 1.5rem;
  border-top: 1px solid #EEDEA6;
}
.contact-info {
  font-size: 1.7rem;
  margin-bottom: 5px;
  margin-top: 15px;
}

.text-brown i:hover {
  color: #B69418;
}

.copyright {
  color: #555;
  .link-line {
    color: #6b460f;
  }
}
</style>
