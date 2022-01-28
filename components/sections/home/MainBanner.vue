<template>
  <section
    id="main-banner"
    class="container"
  >
    <client-only>
      <carousel
        :items="carouselConfig.items"
        :nav="carouselConfig.nav"
      >
        <!-- v-for="(slider, index) in slides" :key="index" -->
        <b-row>
          <b-col
            cols="12"
            lg="6"
            class="title pt-5"
          >
            <h1>Formación profesional en Tecnología NEAR<!-- {{ slider.content.title }} --></h1>
            <p>Aprende con profesionales una de las tecnologías mas potentes del mercado de las criptomonedas.<!-- {{ slider.content.description }} --></p>
          </b-col>
          <b-col>
            <img
              src="~/assets/images/video-banner.webp"
              alt="Video"
              width="516px"
              height="290px"
              class="img-fluid"
            >
            <!-- <b-skeleton-img v-else /> v-if="slides.length >= 0" getImgSrc(slider.imgSrc) `slider content, ${slider.content.title}`-->
          </b-col>
        </b-row>
      </carousel>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'MainBanner',
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      carouselConfig: {
        items: 1,
        nav: false
      }
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
.row:last-child {
  margin: 120px 0;
}

.title h1 {
  color: var(--dark-gray-5);
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 26px;
}

.title p {
  font-size: .9rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .title h1 {
    font-size: 3rem;
  }

  .title p {
    font-size: 1rem;
  }
}
</style>
