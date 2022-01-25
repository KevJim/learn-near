<template>
  <section
    id="home-courses"
    class="container text-center text-sm-right"
  >
    <b-button class="custom-btn">
      Listado de cursos
    </b-button>
    <hr>
    <CourseCarousel :courses="recentCourses">
      <template #title>
        <h3>Cursos mas recientes</h3>
      </template>
    </CourseCarousel>
    <CourseCarousel :courses="mostSeen">
      <template #title>
        <h4>Lo mas visto</h4>
      </template>
    </CourseCarousel>
  </section>
</template>

<script>
export default {
  name: 'HomeCourses',
  data () {
    return {
      recentCourses: [
        {
          name: 'Rust desde cero',
          imgSrc: 'course-4.png'
        },
        {
          name: 'Desarrolla tu primer contrato con assembly script',
          imgSrc: 'course-2.png'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png'
        }
      ],
      mostSeen: [
        {
          name: 'Accesar a una Wallet',
          imgSrc: 'course-6.png'
        },
        {
          name: 'Como funciona NEAR',
          imgSrc: 'course-5.png'
        },
        {
          name: 'Desarrolla tu primer contrato con Rust',
          imgSrc: 'course-3.png'
        },
        {
          name: 'Crea una tienda nft',
          imgSrc: 'course-1.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
#home-courses {
  margin-top: 60px;
}

#home-courses > .custom-btn {
  font-size: 1.3rem;
  height: 60px;
  width: 228px;
}

hr {
  border-top-color: #a7a7a7;
  margin-top: 78px;
}

h3, h4 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 30px;
  /* margin: 80px 0; */
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  h3, h4 {
    text-align: left;
  }

}
</style>
