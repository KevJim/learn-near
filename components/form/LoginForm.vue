<template>
  <div>
    <form v-if="!showRecoverPasswordForm" class="mt-2" @submit.prevent>
      <div class="form-group">
        <div class="input-group custom-input-group mb-3" :class="emailInputCs">
          <div class="input-group-prepend">
            <span id="email-login" class="input-group-text">
              <BaseIcon class="" icon-name="email-icon" width="22" height="16.8">
                <EmailIcon />
              </BaseIcon>
            </span>
          </div>
          <input
            v-model="form.email"
            type="email"
            class="form-control custom-input"
            placeholder="Email"
            aria-describedby="email-login"
            @keyup="validateEmail()"
          >
        </div>
        <div class="input-group custom-input-group mb-3" :class="passwordInputCs">
          <div class="input-group-prepend">
            <span id="password-login" class="input-group-text">
              <BaseIcon class="" icon-name="password-icon" width="22" height="16.8">
                <PasswordIcon />
              </BaseIcon>
            </span>
          </div>
          <input
            v-model="form.password"
            :type="showPass ? 'text' : 'password'"
            class="form-control custom-input"
            placeholder="Contraseña"
            aria-describedby="password-login"
          >
          <div class="input-group-append">
            <span id="show-password-login" class="input-group-text p-0">
              <ShowPasswordButton
                @showPass="showPassword"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="custom-control terms-checkbox mt-4">
        <a href="#" role="button" class="link-btn form-link text-right" @click="showRecoverPasswordForm = true">
          Olvidé mi contraseña
        </a>
      </div>
      <div class="button-tabs mt-4">
        <button type="button" class="button-tab left cancel" @click="hideModal">
          Cancelar
        </button>
        <button class="button-tab right done" @click="doLogin">
          Iniciar Sesion
        </button>
      </div>
    </form>
    <form v-else id="recoverPassword" class="mt-2" @submit.prevent>
      <div class="form-group">
        <div class="input-group custom-input-group mb-3" :class="emailInputCs">
          <div class="input-group-prepend">
            <span id="email-login" class="input-group-text">
              <BaseIcon class="" icon-name="email-icon" width="22" height="16.8">
                <EmailIcon />
              </BaseIcon>
            </span>
          </div>
          <input
            v-model="form.email"
            type="email"
            class="form-control custom-input"
            placeholder="Email"
            aria-describedby="email-login"
            @keyup="validateEmail()"
          >
        </div>
      </div>
      <div class="custom-control terms-checkbox mt-4">
        <a href="#" role="button" class="link-btn form-link text-right invisible">
          Olvidé mi contraseña
        </a>
      </div>
      <div class="button-tabs mt-4">
        <button type="button" class="button-tab left cancel" @click="showRecoverPasswordForm = false">
          Regresar
        </button>
        <button class="button-tab right done" @click="sendChangePasswordEmail">
          Enviar solicitud
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import EmailIcon from '@/components/icons/EmailIcon.vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'
export default {
  name: 'FormLogin',
  components: { EmailIcon, PasswordIcon },
  data () {
    return {
      form: {
        email: '',
        password: '',
        errorMsgs: []
      },
      emailInputCs: '',
      passwordInputCs: '',
      showRecoverPasswordForm: false,
      showPass: false
    }
  },
  methods: {
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'signup-modal')
    },
    doLogin () {
      if (this.isValidForm()) {
        this.$store.dispatch('user/login',
          {
            email: this.form.email,
            pwd: this.form.password
          })
          .then(() => {
          }).catch()
      } else {
        const errorNotification = {
          type: 'error',
          title: 'Se encontraron errores en el formulario',
          list: this.errorMsgs,
          timeout: true
        }
        console.log(errorNotification)
        this.$store.dispatch('notification/add', errorNotification)
      }
    },
    isValidForm () {
      this.errorMsgs = []
      let isValid = true
      if (this.form.email === '') {
        this.errorMsgs.push('El campo Email es requerido')
        isValid = false
      } else if (!this.validEmail(this.form.email)) {
        this.errorMsgs.push('Formato incorrecto del campo email')
        isValid = false
      }
      if (this.form.password === '') {
        this.errorMsgs.push('El campo Contraseña es requerido')
        isValid = false
        this.passwordInputCs = 'error'
      }
      return isValid
    },
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validateEmail () {
      if (!this.validEmail(this.form.email)) { this.emailInputCs = 'error' } else { this.emailInputCs = '' }
    },
    sendChangePasswordEmail () {
      this.$store.dispatch('user/requestChangePassword', this.form.email)
        .then(() => {
          this.showRecoverPasswordForm = false
        }).catch()
    },
    showPassword () {
      this.showPass = !this.showPass
    }
  }

}
</script>

<style scoped>
.form-link{
  font-size: 12px;
  color: #88898b;
}
.form-control:focus{
   box-shadow: none !important;
}
</style>
