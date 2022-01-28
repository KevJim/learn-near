<template>
  <nuxt-link
    :to="{ name: 'courses-details-id', params: { id: courseInfo.uri }}"
    class="course-card d-flex flex-column mx-auto"
  >
    <img :src="require(`~/assets/images/${courseInfo.imgSrc}`)" alt="" class="img-fluid">
    <p>
      {{ courseInfo.name }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    courseInfo: {
      type: Object,
      default: () => {}
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
  max-height: 148px;
  max-width: 100%;
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
