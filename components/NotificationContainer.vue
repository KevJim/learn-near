<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationBar from '@/components/NotificationBar.vue'
export default {
  components: {
    NotificationBar
  },
  data () {
    return {
      /* notifications: [
        {
          title: 'Notificacion de prueba',
          message: 'obando uno 2 3,  prueba prueba prueba.',
          type: 'success'
        }
      ] */
    }
  },
  computed: mapState('notification', ['notifications'])
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 2147483649;
  width: 100%;
}
@media (min-width: 768px){
  .notification-container {
    left: 4rem;
    max-width: 500px;
  }
}

</style>
