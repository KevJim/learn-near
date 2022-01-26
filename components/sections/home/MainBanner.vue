<template>
  <section
    id="main-banner"
    class="container"
  >
    <b-row>
      <b-col
        cols="12"
        lg="6"
        class="title pt-5"
      >
        <h1>Formación profesional en Tecnología NEAR</h1>
        <p>Aprende con profesionales una de las tecnologías mas potentes del mercado de las criptomonedas.</p>
      </b-col>
      <b-col>
        <img
          src="~/assets/images/video-banner.webp"
          alt="Video Image"
          width="516px"
          height="290px"
          class="img-fluid"
        >
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  name: 'MainBanner'
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
