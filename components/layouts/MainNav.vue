<template>
  <b-navbar
    toggleable="lg"
  >
    <b-container>
      <b-navbar-brand to="/">
        <img
          src="~/assets/images/logo.png"
          alt="NEAR DOJO Logo"
          height="30px"
          width="170px"
        >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto align-items-center">
          <b-nav-item to="/" link-classes="custom-nav">
            Inicio
          </b-nav-item>
          <b-nav-item :to="{ name: 'courses' }" link-classes="custom-nav">
            Cursos
          </b-nav-item>
          <b-nav-item to="/" link-classes="custom-nav">
            Contacto
          </b-nav-item>
          <b-nav-item to="/" link-classes="custom-nav">
            Blog
          </b-nav-item>
          <b-nav-item class="nav-item--desactivate-hover">
            <div v-if="isUserLoggedIn">
              <UserDropdown />
            </div>
            <b-button
              v-if="!isUserLoggedIn"
              pill
              class="text-nowrap"
              variant="primary"
              @click="showSignupModal"
            >
              Iniciar sessión
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'MainNav',
  computed: {
    isUserLoggedIn () {
      return this.$store.state.user.isUserLoggedIn
    }
  },
  methods: {
    showSignupModal () {
      this.$root.$emit('bv::show::modal', 'signup-modal')
    }
  }
}
</script>

<style scoped>
.nav-item {
  margin: 12px 0;
}
.nav-item--desactivate-hover:hover{
 color: #000;
}

.custom-nav {
  color: var(--dark-gray-5) !important;
  font-size: 1.1rem !important;
  font-family: "Manrope" !important;
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
