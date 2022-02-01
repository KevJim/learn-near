<template>
  <section id="preview-section">
    <b-container>
      <b-row class="info-row">
        <b-col cols="12" lg="5" class="mb-4 text-center">
          <img src="~/assets/images/video-img.png" alt="" height="308px" width="516px" class="img-fluid">
        </b-col>
        <b-col cols="12" lg="7">
          <div class="top">
            <template v-if="!loading">
              <h1>{{ course.detail.name }}</h1>
              <div>
                <BaseIcon>
                  <StarIcon />
                </BaseIcon>
                {{ course.general.review == 0 ? 'Aún no hay suficientes calificaciones' : course.general.review }}
              </div>
              <p>{{ course.general.shortDescription }}</p>
            </template>
            <template v-else>
              <b-skeleton height="40px" />
              <b-skeleton height="12px" width="10%" />
              <b-skeleton height="20px" width="80%" />
              <b-skeleton height="20px" width="60%" />
            </template>
          </div>
          <div class="middle">
            <template v-if="!loading">
              <p><span>Nivel:</span> {{ levelString }}</p>
              <p><span>Lanzamiento:</span> {{ releaseDate }}</p>
              <p><span>Duración:</span> {{ duration }}</p>
            </template>
            <template v-else>
              <b-skeleton height="16px" width="40%" />
              <b-skeleton height="16px" width="32%" />
              <b-skeleton height="16px" width="30%" />
            </template>
          </div>
          <div class="bottom d-flex flex-column align-items-center flex-sm-row justify-content-sm-between">
            <b-button
              :to="{ name: 'courses-watch-uri-lessonid', params: { uri: $route.params.uri } }"
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
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    levelString () {
      return this.$store.getters['course/getLevel']
    },
    releaseDate () {
      return this.$store.getters['course/getReleaseDate']
    },
    duration () {
      return this.$store.getters['course/getDuration']
    },
    course () {
      return this.$store.state.course.course
    }
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
