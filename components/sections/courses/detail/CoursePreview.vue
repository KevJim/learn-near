<template>
  <section id="preview-section">
    <b-container>
      <b-row class="info-row">
        <b-col cols="12" lg="5" class="mb-4 text-center">
          <img src="~/assets/images/video-img.png" alt="" height="308px" width="516px" class="img-fluid">
        </b-col>
        <b-col cols="12" lg="7">
          <div class="top">
            <h1>Desarrolla tu primer contrato con Rust</h1>
            <div>
              <BaseIcon>
                <StarIcon />
              </BaseIcon>
              4.5
            </div>
            <p>Aprenderemos como trabajar de la forma correcta ante las nuevas medidas sanitarias en nuestro ambiente laboral</p>
          </div>
          <div class="middle">
            <p><span>Nivel:</span> Básico</p>
            <p><span>Lanzamiento:</span> 23/05/2021</p>
            <p><span>Duración:</span> 6:30:00hrs.</p>
          </div>
          <div class="bottom d-flex flex-column align-items-center flex-sm-row justify-content-sm-between">
            <b-button
              :to="{ name: 'courses-watch-id', params: { id: $route.params.id } }"
              class="d-flex justify-content-between align-items-center px-4 mb-4 mb-sm-0"
            >
              Ir al curso
              <BaseIcon
                height="20"
                width="20"
              >
                <PlayCourseIcon />
              </BaseIcon>
            </b-button>
            <p class="m-0">
              <BaseIcon
                height="26"
                width="24"
              >
                <DiplomaIcon />
              </BaseIcon>
              Cuenta con diploma
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import DiplomaIcon from '@/components/icons/DiplomaIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import PlayCourseIcon from '@/components/icons/PlayCourseIcon.vue'
export default {
  name: 'CoursePreview',
  components: {
    DiplomaIcon,
    StarIcon,
    PlayCourseIcon
  }
}
</script>

<style scoped>
#preview-section {
  background: linear-gradient(to bottom, #FFFFFF, #fefefe 68%, #F5F5F5);
  padding: 80px 0;
}

.info-row .top {
  color: var(--dark-blue-2);
}

.info-row .top h1 {
  color: var(--dark-blue-1);
  font-size: 1.75rem;
  font-weight: 800;
}

.info-row .top div {
  font-size: 1rem;
  font-weight: 800;
}

.info-row .middle {
  color: var(--dark-blue-2);
  margin: 24px 0;
}

.info-row .middle p {
  font-size: 1rem;
  margin-bottom: 8px;
}

.info-row .middle p span {
  font-weight: 800;
}

.info-row .bottom a {
  color: var(--light-blue-1);
  background-color: var(--light-gray-1);
  border-radius: 24px;
  border: solid 2px var(--light-blue-1);
  font-weight: 800;
  height: 48px;
  text-transform: uppercase;
  width: 178px;
}

.info-row .bottom p {
  font-weight: 800;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .info-row .middle {
    margin: 40px 0;
  }
}
</style>
