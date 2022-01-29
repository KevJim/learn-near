<template>
  <div class="app-wrapper">
    <header>
      <MainNav />
      <b-container class="position-absolute gradients-container">
        <b-row>
          <b-col>
            <img
              src="~/assets/images/right-gradient.webp"
              alt="Gradient Image"
              width="600px"
              height="256px"
              class="img-fluid"
            >
          </b-col>
          <b-col class="d-none d-xl-block">
            <img
              src="~/assets/images/left-gradient.webp"
              alt="Gradient Image"
              width="380px"
              height="178px"
            >
          </b-col>
        </b-row>
      </b-container>
    </header>

    <main>
      <Nuxt />
    </main>

    <footer>
      <MainFooter />
    </footer>
  </div>
</template>

<script>
import MainFooter from '@/components/layouts/MainFooter.vue'
import MainNav from '@/components/layouts/MainNav.vue'
export default {
  name: 'DefaultLayout',
  components: {
    MainFooter,
    MainNav
  }
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  padding-bottom: 336px;
  position: relative;
}

.gradients-container {
  top: 58px;
  left: 0;
  right: 0;
}

main {
  padding-bottom: 60px;
}

footer {
  background-color: var(--dark-gray-5);
  position: absolute;
  bottom: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .app-wrapper {
    padding-bottom: 244px;
  }

  .gradients-container {
    top: 82px;
  }
}
</style>
