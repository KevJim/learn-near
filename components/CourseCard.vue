<template>
  <nuxt-link
    :to="{ name: 'courses-details-id', params: { id: cardContent.uri }}"
    class="course-card d-flex flex-column mx-auto"
  >
    <!-- :src="getImgSrc(cardContent.image)" -->
    <img
      src="~/assets/images/course-1.png"
      :alt="`course content, ${cardContent.name}`"
      height="150"
      width="256"
      class="img-fluid"
    >
    <p>
      {{ cardContent.name }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    cardContent: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getImgSrc (imgSrc) {
      return this.$config.cdnBaseURL + imgSrc
    }
  }
}
</script>

<style scoped>
.course-card {
  max-width: 264px;
}

a:hover {
  text-decoration: none;
}

img {
  height: 148px;
  max-width: 256px;
}

p {
  color: var(--dark-gray-5);
  font-size: 1rem;
  font-weight: 800;
  margin-top: 10px;
  margin-bottom: 0;
  min-height: 48px;
  text-align: center;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  p {
    text-align: left;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  p {
    max-width: 262px;
  }
}
</style>
