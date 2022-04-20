<template>
  <div class="app-wrapper">
    <SignupModal />
    <NotificationContainer />

    <header>
      <MainNav />
      <b-container style="position:relative;">
        <DecorativeGradient
          color="var(--light-blue-1)"
          size="600"
          style="transform: translateY(-70%); left:30px;"
        />
        <DecorativeGradient
          class="d-none d-xl-block"
          color="var(--light-orange-1)"
          size="380"
          style="transform: translateY(-70%); right:30px;"
        />
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
import SignupModal from '@/components/modal/SignupModal.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    MainFooter,
    MainNav,
    SignupModal,
    NotificationContainer
  }
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  padding-bottom: 336px;
  position: relative;
}

header{
  background-color: var(--light-gray-1);
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
