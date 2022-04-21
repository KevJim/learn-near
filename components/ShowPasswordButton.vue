<template>
  <b-button
    variant="light"
    class="show-pass-btn p-1"
    :title="seePassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
    :class="validStatus == false ? 'is-invalid' : ''"
    @click="showPassword()"
  >
    <BaseIcon
      v-if="seePassword"
      icon-name="eye-slash-icon"
      width="22"
      height="16.8"
    >
      <EyeSlashIcon />
    </BaseIcon>
    <BaseIcon
      v-else
      width="22"
      height="16.8"
      icon-name="eye-icon"
    >
      <EyeIcon />
    </BaseIcon>
  </b-button>
</template>

<script>
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
export default {
  name: 'ShowPasswordButton',
  components: {
    EyeIcon,
    EyeSlashIcon
  },
  props: {
    validStatus: {
      type: Boolean,
      default: null
    }
  },
  data () {
    return {
      seePassword: false
    }
  },
  methods: {
    showPassword () {
      this.seePassword = !this.seePassword
      this.$emit('showPass')
    }
  }
}
</script>

<style>
.show-pass-btn{
  background-color: transparent !important;
  color:#5f8afa!important;
}
.show-pass-btn.btn-light{
  background-color: transparent !important;
  border: 0;
}
.custom-input-group .input-group-append > .input-group-text{
  background-color: transparent !important;
  border: 0 !important;
}
.btn-light:focus{
  box-shadow: none;
}
</style>
