<template>
  <div id="nav" class="main-nav">
    <b-container fluid="md">
      <b-navbar toggleable="md" type="light" class="side-navbar row flex-nowrap">
        <b-navbar-brand
          to="/"
          class="mr-4 d-none d-sm-block"
        >
          <img
            :src="require('@/assets/images/logo.png')"
            width="170px"
            height="30px"
          >
        </b-navbar-brand>
        <b-navbar-brand
          to="/"
          class="mr-4 d-block d-sm-none"
        >
          <img
            :src="require('@/assets/images/logo-tiny.png')"
            width="30px"
            height="30px"
          >
        </b-navbar-brand>
        <div class="ml-auto d-flex d-md-none">
          <div v-if="isUserLoggedIn">
            <UserDropdown />
          </div>
          <b-button
            v-if="!isUserLoggedIn"
            pill

            class="text-nowrap primary-btn nav-button"
            @click="showSignupModal"
          >
            Iniciar sesión
          </b-button>
        </div>
        <b-collapse id="nav-collapse" class="nav-header" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="mt-3 mt-md-0 " to="/" link-classes="custom-nav d-flex align-items-center">
              <BaseIcon class="d-md-none mr-4 ml-2">
                <HomeIcon />
              </BaseIcon>
              Inicio
            </b-nav-item>
            <b-nav-item class="mt-3 mt-md-0 ml-md-4" :to="{ name: 'courses-level-level' }" link-classes="custom-nav d-flex align-items-center">
              <BaseIcon class="d-md-none mr-4 ml-2">
                <BookIcon />
              </BaseIcon>
              Cursos
            </b-nav-item>
            <b-nav-item class="mt-3 mt-md-0 ml-md-4" :to="{ name:'contact' }" link-classes="custom-nav d-flex align-items-center">
              <BaseIcon class="d-md-none mr-4 ml-2">
                <MessageIcon />
              </BaseIcon>
              Contacto
            </b-nav-item>
            <b-nav-item class="mt-3 mt-md-0 ml-md-4" to="/" link-classes="custom-nav d-flex align-items-center">
              <BaseIcon class="d-md-none mr-4 ml-2">
                <BlogIcon />
              </BaseIcon>
              Blog
            </b-nav-item>
            <div class="d-md-flex d-none ml-md-4">
              <div v-if="isUserLoggedIn">
                <UserDropdown />
              </div>
              <b-button
                v-if="!isUserLoggedIn"
                pill

                class="text-nowrap primary-btn nav-button"
                @click="showSignupModal"
              >
                Iniciar sesión
              </b-button>
            </div>
          </b-navbar-nav>
        </b-collapse>
        <b-navbar-toggle
          id="nav-collapse-btn"
          target="nav-collapse"
          class="ml-4"
          @click="emitToggleNavbar"
        />
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
import HomeIcon from '@/components/icons/HomeIcon.vue'
import BookIcon from '@/components/icons/BookIcon.vue'
import MessageIcon from '@/components/icons/MessageIcon.vue'
import BlogIcon from '@/components/icons/BlogIcon.vue'
export default {
  components: { HomeIcon, BookIcon, MessageIcon, BlogIcon },
  data () {
    return {
      navbarOpen: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.state.user.isUserLoggedIn
    }
  },
  methods: {
    emitToggleNavbar () {
      this.navbarOpen = !this.navbarOpen
      this.$emit('toggleNavbar', this.navbarOpen)
    },
    showSignupModal () {
      this.$root.$emit('bv::show::modal', 'signup-modal')
    }
  }
}
</script>
<style scoped>
/* Main Nav */
.nav-header{
  height: inherit;
}
.main-nav{
  background-color: var(--light-gray-1);
  color: var(--dark-gray-1);
}

.custom-nav {
  color: var(--dark-gray-5) !important;
  font-size: 1.1rem !important;
  font-family: "Manrope" !important;
}
.side-navbar{
  justify-content: flex-start;
  height: 66px;
}
#nav-collapse {
  width: 100%;
  z-index: 19999999999;
  position: fixed;
  display: block;
  height: 100%;
  overflow-y: auto;
  right: -100%;
  top: 66px;
  transition: transform 350ms linear !important;
  background-color: var(--light-gray-1);
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
}
#nav-collapse.collapsing{
  position: fixed !important;
  height: 100% !important;
}
#nav-collapse.collapse.show {
  display: block !important;
  transform: translateX(-100%);
  height: 100%;
  height: -webkit-fill-available;
}
#nav-collapse .navbar-nav{
  padding-left: 1rem;
  padding-right: 1rem;
}
.search-area.mobile{
  padding: 1.2rem 1rem;
  background-color: var(--dark-gray-1);
}

@media (min-width: 576px) {
  #nav-collapse{
    width: 280px;
    right: -280px;
  }
  #nav-collapse.collapse.show{
    transform: translateX(-280px);
  }
}

@media (min-width: 768px) {
  #nav-collapse {
    position: relative;
    top: 0;
    left: 0;
    overflow-y: visible;
    height: inherit;
    padding: 0;
    z-index: 19;
  }
  .nav-header .navbar-nav{
    justify-content: space-between;
    align-items: center;
  }
  .navbar-nav .nav-li{
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20%;
    margin-bottom: 0;
    justify-content: center;
  }
  .nav-li a {
    width: auto;
    text-align: center;
  }
  .list-item{
    text-align: left;
  }
  #nav-collapse .navbar-nav{
    padding-left: 0;
    padding-right: 0;
  }

}
</style>
