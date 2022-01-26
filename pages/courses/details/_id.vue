<template>
  <div id="course-details-id">
    <section id="preview-section">
      <b-container>
        <b-row>
          <b-col>
            <img
              src="~/assets/images/right-gradient.webp"
              alt="Gradient Image"
              width="600px"
              height="256px"
              class="img-fluid"
            >
          </b-col>
          <b-col class="d-none d-xl-block">
            <img
              src="~/assets/images/left-gradient.webp"
              alt="Gradient Image"
              width="380px"
              height="178px"
            >
          </b-col>
        </b-row>
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
              <b-button class="d-flex justify-content-between align-items-center px-4 mb-4 mb-sm-0">
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
    <section id="details-section" class="container">
      <b-row>
        <b-col class="content-col mb-5 mb-lg-0" cols="12" lg="6">
          <b-card>
            <span class="font-weight-bold">Contenido</span>
            <div class="tablist mt-4" role="tablist">
              <b-card
                v-for="(moduleItem, index) in modules"
                :key="index"
                no-body
                class="mb-4"
              >
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    v-b-toggle="'accordion-' + index"
                    block
                    class="tab-btn d-flex justify-content-between align-items-center"
                  >
                    {{ moduleItem.name }}
                    <BaseIcon
                      height="20"
                      width="20"
                    >
                      <DownArrowIcon />
                    </BaseIcon>
                  </b-button>
                </b-card-header>
                <b-collapse :id="'accordion-' + index" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <ul class="p-0 lessons-list">
                      <li
                        v-for="(lesson, indx) in moduleItem.lessons"
                        :key="indx"
                        class="d-flex justify-content-between mb-2 py-2 px-1"
                      >
                        <span>
                          <BaseIcon
                            height="18"
                            width="18"
                            class="mr-2"
                          >
                            <PlayIcon />
                          </BaseIcon>
                          {{ lesson.name }}
                        </span>
                        <span>{{ lesson.time }}</span>
                      </li>
                    </ul>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-card>
        </b-col>
        <b-col class="details-col">
          <b-card class="professor-card" no-body>
            <b-card-header class="d-flex">
              <b-avatar variant="info" src="https://placekitten.com/300/300" size="74px" />
              <div class="ml-3">
                <p>Tutor del curso</p>
                <p>Abril Urias</p>
                <p>Arquitecto Mobile en Banco de Crédito BCP</p>
              </div>
            </b-card-header>
            <b-card-body class="pt-0">
              Google Developer Expert(Google Assistant) Me gusta dar todo de mí al encontrar retos nuevos de la vida diaria, buscando la mejora continua de mis aptitudes, estudiando y ganando conocimiento para mi crecimiento.
            </b-card-body>
          </b-card>
          <div class="tablist mt-2" role="tablist">
            <b-card
              v-for="detail in courseDetails"
              :key="detail.id"
              no-body
              class="mb-2"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  v-b-toggle="'accordion-' + detail.id"
                  block
                  class="tab-btn d-flex justify-content-between align-items-center"
                >
                  {{ detail.name }}
                  <BaseIcon
                    height="20"
                    width="20"
                  >
                    <DownArrowIcon />
                  </BaseIcon>
                </b-button>
              </b-card-header>
              <b-collapse :id="'accordion-' + detail.id" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <p>Texto</p>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import DiplomaIcon from '@/components/icons/DiplomaIcon.vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import PlayCourseIcon from '@/components/icons/PlayCourseIcon.vue'

export default {
  name: 'CourseDetailsID',
  components: {
    DiplomaIcon,
    DownArrowIcon,
    StarIcon,
    PlayIcon,
    PlayCourseIcon
  },
  data () {
    return {
      modules: [
        {
          name: 'Module 1',
          lessons: [
            {
              name: 'Lesson 1',
              time: '00:00'
            },
            {
              name: 'Lesson 2',
              time: '00:00'
            },
            {
              name: 'Lesson 3',
              time: '00:00'
            }
          ]
        },
        {
          name: 'Module 2',
          lessons: [
            {
              name: 'Lesson 1',
              time: '00:00'
            },
            {
              name: 'Lesson 2',
              time: '00:00'
            },
            {
              name: 'Lesson 3',
              time: '00:00'
            }
          ]
        },
        {
          name: 'Module 3',
          lessons: [
            {
              name: 'Lesson 1',
              time: '00:00'
            },
            {
              name: 'Lesson 2',
              time: '00:00'
            },
            {
              name: 'Lesson 3',
              time: '00:00'
            }
          ]
        }
      ],
      courseDetails: [
        {
          id: '01',
          name: 'Descripción del curso'
        },
        {
          id: '02',
          name: 'Lo que aprenderas'
        },
        {
          id: '03',
          name: 'Conocimientos previos'
        }
      ]
    }
  }
}
</script>

<style scoped>
#course-details-id {
  margin-bottom: 40px;
}

#preview-section {
  background: linear-gradient(to bottom, #FFFFFF, #fefefe 68%, #f5f5f5);
}

#preview-section .info-row {
  position: relative;
  top: -80px;
}

#preview-section .info-row .top h1 {
  font-size: 1.75rem;
  font-weight: 800;
}

#preview-section .info-row .top div {
  font-size: 1rem;
  font-weight: 800;
}

#preview-section .info-row .middle {
  margin: 24px 0;
}

#preview-section .info-row .middle p {
  font-size: 1rem;
  margin-bottom: 8px;
}

#preview-section .info-row .middle p span {
  font-weight: 800;
}

#preview-section .info-row .bottom button {
  color: #5f8afa;
  background-color: var(--secondary-color);
  border-radius: 24px;
  border: solid 2px #5f8afa;
  font-weight: 800;
  height: 48px;
  text-transform: uppercase;
  width: 178px;
}

#preview-section .info-row .bottom p {
  font-weight: 800;
}

#details-section {
  color: #4b4b6b;
  font-size: 1.1rem;
  margin-top: 80px;
}

#details-section .tab-btn {
  color: #4b4b6b;
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.accordion > .card:not(:last-of-type) {
  border-bottom: 1;
}

.card-header {
  background-color: var(--secondary-color);
  margin-bottom: 0;
  border-bottom: 0;
}

.lessons-list li {
  border-radius: 4px;
  font-size: .9rem;
}

.lessons-list li:hover {
  background-color: rgba(75, 75, 107, 0.06);
  color: #5f8afa;
  cursor: pointer;
}

.details-col .tablist .card-header {
  height: 66px;
  display: flex;
}

.details-col .tablist .card-header button {
  font-weight: 600;
}

.details-col .professor-card .card-header p {
  color: #262626;
  font-weight: 800;
  margin-bottom: 0;
}

.details-col .professor-card .card-header p:nth-child(1) {
  color: #5f8afa;
  font-size: .75rem;
}

.details-col .professor-card .card-header p:nth-child(2) {
  font-size: 1.25rem;
}

.details-col .professor-card .card-header p:nth-child(3) {
  font-size: .84rem;
}

.details-col .professor-card .card-body {
  color: #3f4246;
  font-size: 1rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  #preview-section {
    max-height: 780px;
  }

  #preview-section .info-row {
    top: -140px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  #preview-section {
    height: 50%;
  }

  #preview-section .info-row .middle {
    margin: 40px 0;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  #preview-section {
    max-height: 480px;
  }
}
</style>
