<template>
  <div class="app-wrapper">
    <header>
      <MainNav />
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

main {
  padding-bottom: 60px;
}

footer {
  background-color: #3f4246;
  position: absolute;
  bottom: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .app-wrapper {
    padding-bottom: 244px;
  }
}
</style>
