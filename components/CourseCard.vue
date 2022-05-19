<template>
  <nuxt-link
    :to="{ name: 'courses-details-uri', params: { uri: cardContent.uri }}"
    class="course-card d-flex flex-column mx-auto"
    :class="{ 'course-card--box-shadow rounded p-4' : showPercentage }"
  >
    <!-- :src="getImgSrc(cardContent.image)" -->
    <img
      src="~/assets/images/course-1.png"
      :alt="`course content, ${cardContent.name}`"
      height="150"
      width="256"
      class="img-fluid"
    >
    <p class="course-card__name">
      {{ cardContent.name }}
    </p>
    
    <div v-if="showCertificateButtons">
      <b-button v-if="cardContent.haveCertificate" class="primary-btn">
        Obtener certificado
      </b-button>
      <b-button v-if="!cardContent.haveCertificate" class="primary-btn">
        Ver certificado
      </b-button>
    </div>

    <div v-if="showPercentage">
      <p>Tu progreso</p>
      <b-progress
        :max="100"
        class="course-progress"
      >
        <b-progress-bar
          :value="cardContent.progressPercentage"
          :label="cardContent.progressPercentage > 20 ? (cardContent.progressPercentage + ' %') : ''"
        />
        <div>
          <div class="course-card__indicator position-absolute" />
        </div>
      </b-progress>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CourseCard',
  props: {
    cardContent: {
      type: Object,
      default: () => {}
    },
    showPercentage: {
      type: Boolean,
      default: false
    },
    showCertificateButtons: {
      type: Boolean,
      default: false
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
a:hover {
  text-decoration: none;
}
img {
  height: 148px;
  width: 264px;
}

.course-card {
  max-width: 264px;
  color: var(--dark-gray-1);
  background-color: var(--light-gray-1);
}

.course-card--box-shadow{
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.15);
  max-width: 312px;
}

.course-card__name {
  color: var(--dark-gray-5);
  font-size: 1rem;
  font-weight: 800;
  margin-top: 10px;
  margin-bottom: 0;
  min-height: 48px;
  text-align: center;
}

.course-card__indicator{
  --half-of-progress-bar: 6px;
  
  height: 20px;
  width: 20px;
  transform: translate(-50%, calc(-50% + var(--half-of-progress-bar)));
  background: var(--light-blue-1);
}

.course-progress{
  height: 12px;
}

.course-progress{
  height: 12px;
}

.course-progress .progress-bar{
  font-size: 12px;
  background-color: var(--light-blue-1) !important;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .course-card__name {
    text-align: left;
  }
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .course-card__name {
    max-width: 262px;
  }
}
</style>
