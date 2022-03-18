<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title
      :id="iconName"
      lang="es"
    >
      {{ iconName }}
    </title>
    <g
      :fill="iconColor"
      :opacity="iconOpacity"
    >
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 26
    },
    height: {
      type: [Number, String],
      default: 26
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    iconOpacity: {
      type: Number,
      default: 1
    }
  }
}
</script>
