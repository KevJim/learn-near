<template>
  <b-modal
    id="signup-modal"
    hide-footer
    hide-header
    centered
    modal-class="modal-in-box"
    size="md"
    :lazy="lazyload"
  >
    <div class="modal-back-area modal-gradient">
      <div class="modal-front-area">
        <header class="d-flex justify-content-center">
          <div class="user-avatar-wrapper">
            <div class="user-avatar">
              <BaseIcon
                class=""
                icon-name="near-icon"
                width="80"
                height="80"
              >
                <LogoWhite />
              </BaseIcon>
            </div>
          </div>
        </header>
        <div class="tabs-wrapper mt-5">
          <div class="tabs d-flex justify-content-center align-items-center">
            <div
              :class="['tab px-4 py-2', activeTab == 1? 'active' : '']"
              @click="signUp"
            >
              Registrarme
            </div>
            <div
              :class="['tab px-4 py-2', activeTab == 2? 'active' : '']"
              @click="signIn"
            >
              Iniciar Sesión
            </div>
          </div>
          <div class="tabs-content">
            <div
              v-if="alert.show"
              class="modal-alert-area"
            >
              <b-alert :variant="alert.variant" show class="py-1 px-2">
                {{ alert.message }}
              </b-alert>
            </div>
            <div
              v-if="activeTab == 1"
              class="tab-content"
            >
              <div class="px-4">
                <button class="connect-with-google" @click="googleSignin">
                  <BaseIcon
                    class="mr-3"
                    icon-name="google-icon"
                    width="20"
                    height="20"
                  >
                    <GoogleIcon />
                  </BaseIcon>
                  Acceder con Google
                </button>
              </div>
              <div class="block-divider mt-3">
                <span>
                  O crea una cuenta
                </span>
              </div>
              <div class="py-4 px-4">
                <RegisterForm @changeCurrentTab="signIn()" />
              </div>
            </div>
            <div
              v-if="activeTab == 2"
              class="tab-content"
            >
              <div class="px-4">
                <button class="connect-with-google" @click="googleSignin">
                  <BaseIcon
                    class="mr-3"
                    icon-name="google-icon"
                    width="20"
                    height="20"
                  >
                    <GoogleIcon />
                  </BaseIcon>
                  Acceder con Google
                </button>
              </div>
              <div class="block-divider mt-3">
                <span>
                  O inicia sesión
                </span>
              </div>
              <div class="py-4 px-4">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import LogoWhite from '@/components/icons/near/LogoWhite.vue'
import LoginForm from '@/components/form/LoginForm.vue'
import RegisterForm from '@/components/form/RegisterForm.vue'

export default {
  components: { GoogleIcon, LogoWhite, LoginForm, RegisterForm },
  data () {
    return {
      lazyload: true,
      activeTab: 2, // 1 register, 2 login
      alert: {
        show: false,
        message: '',
        variant: 'warning'
      }
    }
  },
  created () {
    this.$root.$on('signupShowMessage', msg => this.showMsg(msg))
    this.$root.$on('bv::modal::hide', () => {
      this.onCloseModal()
    })
  },
  methods: {
    signUp () {
      this.activeTab = 1
      // Validar entradas
    },
    signIn () {
      this.activeTab = 2
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'signup-modal')
    },
    googleSignin () {
      this.$store.dispatch('user/googleAuth')
        .then(() => {
          // console.log("Successful Google Login");
          this.hideModal()
        })
    },
    showMsg (msg) {
      this.alert.show = true
      this.alert.message = msg
      // console.log("Message " + msg);
    },
    onCloseModal () {
      this.alert.show = false
    }
  }
}
</script>

<style>
.modal-in-box .modal-content{
  background-color: transparent;
  border: none;
  /*border-color: transparent*/;
}
.modal-in-box .modal-back-area{
  height: 540px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-radius: 20px;
}
.modal-in-box .modal-front-area{
  position: absolute;
  top: 8%;
  left: -10%;
  background-color: #fff;
  height: auto;
  width: 120%;
  border-radius: 20px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
}
.user-avatar-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.user-avatar{
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.16);
  background: var(--light-turquoise-1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  top: -54px;
  position: absolute;
  color: #ffffff;
}
.modal-in-box .tabs-wrapper{
  margin: auto;
  width: 312px;
}
.tab{
  border-bottom: 2px solid var(--light-gray-4);
  cursor: pointer;
  font-size: 16px;

  text-align: center;
}
.tab.active{
  border-bottom: 2px solid var(--light-blue-1);
  color: var(--light-blue-1);
}
.modal-in-box .tabs-content{
  padding: 1.5rem 0rem;
}
.modal-body{
  position: relative;
}
.connect-with-google{
  border-radius: 100px;
  border: 1px solid #DB4437;
  background-color: #DB4437;
  color: #ffffff;
  height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.block-divider {
  width: 100%;
  height: 12px;
  border-bottom: 1px solid #d6d8dc;
  text-align: center;
}
.block-divider>span {
  background-color: #fff;
  padding: 0 20px;
  color: var(--dark-text);
}
.custom-input-group {
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border-radius: 100px;
  border: 1px solid transparent;
}
.custom-input-group.error{
  border: 1px solid #c30;
}
.custom-input-group .input-group-text{
  color: #5f8afa;
}
.custom-input-group .input-group-prepend > .input-group-text{
  background-color: var(--light-bg);
  border: solid 2px transparent;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.custom-input{
  background-color: var(--light-bg) !important;
  border: solid 2px transparent !important;
  border-left: solid 1px #dddddd !important;
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  color: var(--dark-text) !important;
  font-size: 16px !important;
}
.custom-input::-webkit-input-placeholder { /* Edge */
  color: #88898b !important;
  font-size: 14px;
}
.custom-input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #88898b !important;
  font-size: 14px;
}
.custom-input::placeholder {
  color: #88898b !important;
  font-size: 14px;
}
.terms-checkbox{
  text-align: right;
}
.terms-checkbox .custom-control-label{
  font-size: 12px;
  color: #88898b;
}
.terms-checkbox .custom-control-label::before{
  margin-top: -3px !important;
}
.terms-checkbox .custom-control-label >a {
  color: var(--dark-text);
}
.button-tabs{
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  height: 38px;
  border-radius: 100px;
}
.button-tab{
  width: 50%;
  background-color: transparent;
}
.button-tab.left{
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-right: none;
}
.button-tab.right{
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  border-left: none;
}
.button-tab.cancel{
  color: var(--dark-text);
  background-color: var(--light-bg);
  border: 1px solid var(--form-gray);
}
.button-tab.done{
  color: #fff;
  background-color: #5f8afa;
  border: 1px solid var(--accent-orange);
}
.modal-alert-area{
  font-size: 14px;
}
</style>
