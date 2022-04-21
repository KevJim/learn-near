<template>
  <form class="mt-2" @submit.prevent>
    <div class="form-group">
      <div class="input-group custom-input-group mb-3" :class="nameInputCs">
        <div class="input-group-prepend">
          <span id="name-reg" class="input-group-text">
            <BaseIcon class="" icon-name="user-icon" width="22" height="16.8">
              <UserIcon />
            </BaseIcon>
          </span>
        </div>
        <input
          v-model="form.name"
          type="text"
          class="form-control custom-input"
          placeholder="Nombre"
          aria-describedby="name-reg"
          required
        >
      </div>
      <div class="input-group custom-input-group mb-3" :class="emailInputCs">
        <div class="input-group-prepend">
          <span id="email-reg" class="input-group-text">
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
          aria-describedby="email-reg"
          required
          @keyup="validateEmail()"
        >
      </div>
      <div class="input-group custom-input-group mb-3" :class="passwordInputCs">
        <div class="input-group-prepend">
          <span id="password-reg" class="input-group-text">
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
          aria-describedby="password-reg"
          required
          @keyup="validatePassword()"
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
    <div class="custom-control custom-checkbox terms-checkbox mt-4 visible">
      <input id="terms-checkbox" v-model="form.termsCheckbox" type="checkbox" class="custom-control-input" required>
      <label class="custom-control-label" for="terms-checkbox">
        He leído y acepto los
        <nuxt-link to="terms">
          Términos y Condiciones
        </nuxt-link>
      </label>
    </div>
    <div class="button-tabs mt-4">
      <button type="button" class="button-tab left cancel" @click="hideModal">
        Cancelar
      </button>
      <button class="button-tab right done" @click="recaptcha">
        Registrarme
      </button>
    </div>
  </form>
</template>

<script>
import ShowPasswordButton from '@/components/ShowPasswordButton.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'
import PasswordIcon from '@/components/icons/PasswordIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
export default {
  components: { ShowPasswordButton, EmailIcon, PasswordIcon, UserIcon },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        termsCheckbox: false,
        errorMsgs: []
      },
      nameInputCs: '',
      emailInputCs: '',
      passwordInputCs: '',
      showPass: false
    }
  },
  methods: {
    recaptcha () {
      // (optional) Wait until recaptcha has been loaded.
      // await this.$recaptchaLoaded()
      // const recaptcha = this.$recaptchaInstance;
      // recaptcha.hideBadge();

      // Execute reCAPTCHA with action "login".
      // const token = await this.$recaptcha('login');
      // console.log(token);
      const token = true
      if (token) { this.register() }// Do stuff with the received token.
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'signup-modal')
    },
    register () {
      if (this.isValidForm()) {
        this.doRegister()
      } else {
        const errorNotification = {
          type: 'error',
          title: 'Se encontraron errores en el formulario',
          list: this.errorMsgs,
          timeout: true
        }
        this.$store.dispatch('notification/add', errorNotification)
      }
    },
    doRegister () {
      this.$store.dispatch('user/register',
        {
          name: this.form.name,
          email: this.form.email,
          pwd: this.form.password
        })
        .then(() => {
          this.hideModal()
        }).catch(() => {

        })
    },
    isValidForm () {
      this.errorMsgs = []
      let isValid = true
      if (this.form.name === '') {
        this.errorMsgs.push('El campo nombre es requerido')
        isValid = false
      }
      if (this.form.email === '') {
        this.errorMsgs.push('El campo email es requerido')
        isValid = false
      } else if (!this.validEmail(this.form.email)) {
        this.errorMsgs.push('Formato incorrecto del campo email')
        isValid = false
      }
      if (this.form.password === '' ||
            !this.validPassword(this.form.password)) {
        this.errorMsgs.push('El campo password debe contener al menos 8 caracteres')
        isValid = false
      }
      if (!this.form.termsCheckbox) {
        this.errorMsgs.push('Acepta terminos y condiciones para continuar')
        isValid = false
      }
      return isValid
    },
    validEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validPassword (password) {
      if (password.length >= 8) { return true }
      return false
    },
    validateEmail () {
      if (!this.validEmail(this.form.email)) { this.emailInputCs = 'error' } else { this.emailInputCs = '' }
    },
    validatePassword () {
      if (!this.validPassword(this.form.password)) { this.passwordInputCs = 'error' } else { this.passwordInputCs = '' }
    },
    showPassword () {
      this.showPass = !this.showPass
    }
  }
}
</script>

<style scoped>
.custom-control-label{
  white-space: nowrap;
}
.custom-control-label::after{
  top: 0.1rem;
}
.form-control:focus{
   box-shadow: none !important;
}
</style>
