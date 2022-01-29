<template>
  <section
    id="main-banner"
    class="container"
  >
    <client-only>
      <carousel
        :items="1"
        :nav="false"
        :dots="false"
        :autoplay="true"
        :autoplay-timeout="5000"
      >
        <b-row v-for="(slider, index) in slides" :key="index">
          <b-col
            cols="12"
            lg="6"
            class="title pt-5"
          >
            <h1>{{ slider.content.title }}</h1>
            <p>{{ slider.content.description }}</p>
          </b-col>
          <b-col>
            <img
              :src="getImgSrc(slider.imgSrc)"
              :alt="`slider content, ${slider.content.title}`"
              width="516px"
              height="290px"
              class="slide-img img-fluid"
            >
          </b-col>
        </b-row>
      </carousel>
      <template #placeholder>
        <b-row>
          <b-col>
            <b-skeleton height="40px" width="80%" class="mt-5" />
            <b-skeleton height="20px" width="60%" class="mt-4" />
          </b-col>
          <b-col>
            <b-skeleton-img />
          </b-col>
        </b-row>
      </template>
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
  methods: {
    getImgSrc (imgSrc) {
      return this.$config.cdnBaseURL + imgSrc
    }
  }
}
</script>

<style scoped>
.row {
  margin: 60px 0;
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

.slide-img {
  max-height: 290px;
  max-width: 516px;
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

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .row {
    margin: 120px 0;
  }
}
</style>
