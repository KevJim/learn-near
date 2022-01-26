<template>
  <div id="main-footer">
    <div class="rectangle" />
    <b-container class="footer-container">
      <b-row>
        <b-col cols="12" md="5" class="mb-5 mb-md-0 d-flex align-items-center justify-content-center justify-content-md-start">
          <img
            src="~/assets/images/logo-white.png"
            alt="NEAR DOJO Logo"
            height="30px"
            width="170px"
          >
        </b-col>
        <b-col md="7">
          <b-navbar-nav class="flex-row justify-content-between justify-content-md-end">
            <b-nav-item to="/">
              Inicio
            </b-nav-item>
            <b-nav-item href="#">
              Cursos
            </b-nav-item>
            <b-nav-item href="#">
              Contacto
            </b-nav-item>
            <b-nav-item href="#">
              Blog
            </b-nav-item>
          </b-navbar-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'MainNav'
}
</script>

<style scoped>
.rectangle {
  background-color: #f5f5f5;
  height: 63px;
}

.footer-container {
  padding-bottom: 52px;
  padding-top: 100px;
}

.nav-item > .nav-link {
  color: var(--secondary-color);
  font-size: 1.1rem;
  font-family: "Manrope";
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .nav-item {
    margin-right: 40px;
  }

  .nav-item:last-child{
    margin-right: 0;
  }
}
</style>
