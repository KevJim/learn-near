<template>
  <transition name="fade" mode="out-in">
    <div class="notification-wrapper animated-notification" :class="notificationCs">
      <div class="icon-area d-flex align-items-center justify-content-center">
        <i :class="iconClass" />
      </div>
      <div class="text-area">
        <button type="button" class="close" @click="dismiss()">
          <span aria-hidden="true">&times;</span>
        </button>
        <p class="notification-title mb-0">
          {{ notification.title }}
        </p>
        <p v-if="notification.message" class="notification-message mb-0 mt-1">
          {{ notification.message }}
        </p>
        <ul
          v-for="(noti, index) in notification.list"
          :key="'notification-error-'+index"
          class="notification-list mb-0 mt-1"
        >
          <li> {{ noti }} </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timeout: null,
      notificationCs: ''
    }
  },
  computed: {
    iconClass () {
      let cs = ''
      switch (this.notification.type) {
        case 'success':
          cs = 'fas fa-check'
          break
        case 'error':
          cs = 'fas fa-times'
          break
        case 'warning':
          cs = 'fas fa-exclamation'
          break
      }
      return cs
    }
  },
  mounted () {
    if (this.notification.timeout) { this.timeout = setTimeout(() => this.remove(this.notification), 4000) }
    this.notificationCs = ` ${this.notification.type}`
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  methods: {
    dismiss () {
      this.notificationCs = 'out'
      this.timeout = setTimeout(() => this.remove(this.notification), 400)
    },
    ...mapActions('notification', ['remove'])
  }
}
</script>

<style scoped>
.fade-leave-active {
  transition: opacity .5s
}
.fade-leave-to {
  opacity: 0;
}
.notification-wrapper{
  display: flex;
  background-color: #fff;
  margin-left: 10px;
  margin-right: 10px;
  min-height: 80px;
  box-shadow: 0px 10px 15px -3px rgb(0 0 0 / 10%);
  border-radius: 100px;
  margin-bottom: 1rem;
}
.animated-notification{
  animation: moveOpen 0.5s;
  -webkit-animation: moveOpen 0.5s;
}
@keyframes moveOpen
{
  0% {
    -webkit-transform: translateY(-500px);
  }
  100% {
    -webkit-transform: translateY(0);
  }
}
.animated-notification.out{
  animation: moveClose 0.5s;
  -webkit-animation: moveClose 0.5s;
}
@keyframes moveClose
{
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-500px);
  }
}
.icon-area{
  font-size: 28px;
  color: #fff;
  min-width: 50px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.notification-wrapper.success .icon-area{
  background-color: #AAD055;
}
.notification-wrapper.error .icon-area{
  background-color: #DB5555;
}
.notification-wrapper.warning .icon-area{
  background-color: #FFC860;
}
.text-area{
  flex-grow: 1;
  padding: 1rem 1.5rem;
  position: relative;
}
.notification-title{
  font-weight: bold;
  color: var(--dark-text);
  font-size: 18px;
}
.notification-message{
  color: var(--form-gray-dark);
  font-size: 14px;
}
.notification-list{
  padding-inline-start: 20px;
}
button.close{
  position: absolute;
  right: 1.5rem;
  top: 0.5rem;
}

@media (min-width: 768px){
  .notification-wrapper{
    min-width: 400px;
    max-width: 100%;
  }

@keyframes moveOpen
{
  0% {
    -webkit-transform: translateX(-500px);
  }
  100% {
    -webkit-transform: translateX(0);
  }
}
@keyframes moveClose
{
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-500px);
  }
}
}

</style>
