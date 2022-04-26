<template>
  <div class="app-wrapper">
    <SignupModal />
    <NotificationContainer />

    <header>
      <MainNav />
      <b-container class="decorative-gradients position-absolute overflow-hidden">
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

    <div
      v-show="showBackdrop"
      class="custom-backdrop"
      @click="hideBackdrop"
    />

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
  },
  data () {
    return {
      showBackdrop: false
    }
  },
  emitToggleNavbar () {
    this.navbarOpen = !this.navbarOpen
    this.$emit('toggleNavbar', this.navbarOpen)
  },
  watch: {
    showBackdrop (val) {
      if (val === true) { document.body.className = 'noScroll-y' } else { document.body.className = '' }
    }
  },
  methods: {
    setBackdrop (val) {
      this.showBackdrop = val
    },
    hideBackdrop () {
      document.getElementById('nav-collapse-btn').click()
    }
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
  z-index: 10100;
}

.decorative-gradients{
  z-index: -1;
  left: 50%;
  transform: translateX(-50%);
  height: 300px;
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

.custom-backdrop {
  position: fixed;
  top: 66px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.6;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
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
