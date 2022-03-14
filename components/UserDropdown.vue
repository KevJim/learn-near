<template>
  <CustomDropdown
    :main-class="'user-dropdown'"
    :button-class="'user-menu-btn'"
  >
    <template #button-content>
      <b-avatar v-if="user != {}" :src="user.profileImgSrc" :text="avatarText" size="40px" />
      <BaseIcon
        class="ml-1"
        icon-name=""
        width="16"
        height="16"
        icon-color="#eba100"
      >
        <ChevronDownIcon />
      </BaseIcon>
    </template>
    <template #dropdown-content>
      <div class="user-intro">
        <b-avatar :src="user.profileImgSrc" :text="avatarText" size="60px" />
        <div class="info">
          <p>{{ user.fullname }}</p>
          <small>{{ user.email }}</small>
        </div>
      </div>
      <hr role="separator" aria-orientation="horizontal" class="dropdown-divider my-2">
      <ul>
        <!-- <li class="dropdown-option">
          <a @click="showUserProfileModal">
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <UserIcon />
            </BaseIcon>
            Mi Perfil
            <b-badge v-if="updateProfilePending" class="ml-4">Actualiza tus datos!</b-badge>
          </a>
        </li> -->
        <!-- <li class="dropdown-option">
          <nuxt-link
            :to="{name: 'MyCourses'}"
          >
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <CoursesIcon />
            </BaseIcon>
            Mis Cursos
          </nuxt-link>
        </li>
        <li class="dropdown-option">
          <nuxt-link
            :to="{name: 'MyFavorites'}"
          >
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <LikeIcon />
            </BaseIcon>
            Mis Favoritos
          </nuxt-link>
        </li>
        <li class="dropdown-option">
          <nuxt-link
            :to="{name: 'MyCertificates'}"
          >
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <CertificateIcon />
            </BaseIcon>
            Mis Certificados
          </nuxt-link>
        </li>
        <li class="dropdown-option">
          <nuxt-link
            :to="{name: 'MySubscription'}"
          >
            <BaseIcon
              class="mr-3"
              icon-name="course-icon"
              width="16"
              height="16"
            >
              <CoursesIcon />
            </BaseIcon>
            Mi Suscripción
          </nuxt-link>
        </li>
        <b-dropdown-divider class="my-2" />
        <li class="dropdown-option">
          <nuxt-link :to="{name: 'Contact'}">
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <HelpIcon />
            </BaseIcon>
            Ayuda
          </nuxt-link>
        </li> -->
        <li class="dropdown-option">
          <button @click="logout()">
            <BaseIcon
              class="mr-3"
              icon-name="cart-icon"
              width="16"
              height="16"
            >
              <CloseCircleIcon />
            </BaseIcon>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </template>
  </CustomDropdown>
</template>

<script>
import CustomDropdown from '@/components/CustomDropdown.vue'
import CloseCircleIcon from '@/components/icons/CloseCircleIcon.vue'
// import LikeIcon from '@/components/icons/LikeIcon.vue'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon'
// import UserIcon from '@/components/icons/UserIcon'
// import CoursesIcon from '@/components/icons/CoursesIcon'
// import CertificateIcon from '@/components/icons/CertificateIcon'
// import HelpIcon from '@/components/icons/HelpIcon'

export default {
  components: {
    CustomDropdown,
    // LikeIcon,
    CloseCircleIcon,
    ChevronDownIcon
    // UserIcon
    // CoursesIcon,
    // CertificateIcon,
    // HelpIcon
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    avatarText () {
      let userName = this.$store.state.user.user.fullname
      if (userName == null) {
        userName = this.$store.state.user.user.email
      }
      const matches = userName.match(/\b(\w)/g)
      const str = matches.join('')
      return str.substring(0, 2)
    },
    updateProfilePending () {
      const userName = this.$store.state.user.user.fullname
      if (userName == null) {
        return true
      }
      return false
    }
  },
  methods: {
    showUserProfileModal () {
      this.$root.$emit('bv::show::modal', 'user-profile-modal')
    },
    logout () {
      return this.$store.dispatch('user/logout').then(() => {
        if (this.$route.name !== 'Home') { this.$router.push({ name: 'index' }) }
      })
    }
  }
}
</script>

<style>

.user-dropdown > .user-menu-btn{
  border: none;
  background: none;
}
.b-avatar .b-avatar-text{
  color: var(--accent-orange) !important;
}
.user-menu-btn > .b-avatar,
.user-intro > .b-avatar{
  background-color: transparent;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.16);
}
.user-menu-btn:focus{
  outline: none;
}
.user-menu-btn{
  height: 40px;
}
.user-dropdown .user-intro{
  display: flex;
  align-items: center;
  padding: 20px 22px 10px 22px;
}
.user-dropdown .user-intro > .b-avatar{
  margin-right: 1rem;
}
.user-dropdown .user-intro .info > p{
  margin-bottom: 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 0.86;
  text-align: left;
  color: var(--dark-text);
}
.user-dropdown .user-intro .info > small{
  font-size: 12px;
  line-height: 1;
  text-align: left;
  color: var(--accent-orange);
}
</style>
