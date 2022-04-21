<template>
  <div
    class="gradient"
    :style="`
    background:radial-gradient(circle,${color} 0%, rgba(0, 0, 0, 0) 60%);height:${size}px;width:${size}px;`"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.gradient {
  position: absolute;
  z-index: -1;
}
</style>
