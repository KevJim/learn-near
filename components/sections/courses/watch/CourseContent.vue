<template>
  <section id="course-content">
    <b-collapse
      id="content-collapse"
      class="content-collapse"
      visible
    >
      <b-container class="pt-4 pt-lg-0">
        <div class="content-wrapper">
          <div class="tabs-row">
            <ul class="tabs-ul d-flex flex-column flex-sm-row justify-content-around align-items-center">
              <li
                class="tab py-2"
                :class="currentTab == 1 ? 'selected' : ''"
                @click="changeCurrentTab(1)"
              >
                {{ tabsTitle[0] }}
              </li>
              <li
                class="tab py-2"
                :class="currentTab == 2 ? 'selected' : ''"
                @click="changeCurrentTab(2)"
              >
                {{ tabsTitle[1] }}
              </li>
              <li
                class="tab py-2 text-center"
                :class="currentTab == 3 ? 'selected' : ''"
                @click="changeCurrentTab(3)"
              >
                {{ tabsTitle[2] }}
              </li>
              <li
                class="tab py-2"
                :class="currentTab == 4 ? 'selected' : ''"
                @click="changeCurrentTab(4)"
              >
                {{ tabsTitle[3] }}
              </li>
            </ul>
          </div>
          <div class="content-row p-3 mt-3 py-lg-5 px-lg-4">
            <div class="tab-content">
              <!-- DETAILS TAB -->
              <div v-if="currentTab == 1">
                <div class="details-wrapper d-flex d-flex flex-column flex-md-row justify-content-between">
                  <ProfessorCard />
                  <div class="course-info-box d-flex justify-content-center mt-4 mt-md-0">
                    <ul class="details-list mb-0 pl-md-3">
                      <li class="mb-3">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <SmallLevelIcon />
                        </BaseIcon>
                        Avanzado
                        <!-- {{ setLevelString }} -->
                      </li>
                      <li class="mb-3">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <CalendarIcon />
                        </BaseIcon>
                        31/10/2022
                        <!-- {{ releaseDate }} -->
                      </li>
                      <li class="mb-3">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <ClockIcon />
                        </BaseIcon>
                        7:00 hrs
                        <!-- {{ duration }} -->
                      </li>
                      <li class="">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <RateIcon />
                        </BaseIcon>
                        4
                        <!-- {{ course.review == 0 ? 'Aún no hay suficientes calificaciones' : course.review }} -->
                      </li>
                    </ul>
                  </div>
                  <div class="progress-info-box text-center mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-stretch">
                    <div>
                      <p class="progress-text progress-title mb-1">
                        Tu progreso:
                      </p>
                      <p class="progress-text progress-detail mb-2">
                        <!-- {{ courseProgress }} -->18.8%
                      </p>
                    </div>
                    <b-button
                      class="certificate-btn mt-2"
                    >
                      Obtener certificado
                    </b-button>
                  </div>
                </div>
                <div class="mt-5">
                  <h2 class="subtitle">
                    Descripción
                  </h2>
                  <p>{{ courseDetail.description }}</p>
                </div>
              </div>
              <!-- WHAT WILL LEARN TAB -->
              <div
                v-if="currentTab == 2"
                v-html="courseDetail.learning"
              />
              <!-- PRIOR KNOWLEDGE TAB -->
              <div
                v-if="currentTab == 3"
                v-html="courseDetail.previousKnowledge"
              />
              <!-- RESOURCES TAB -->
              <div
                v-if="currentTab == 4"
              >
                <div>
                  <div
                    v-if="courseDetail.isBought"
                  >
                    <b-table
                      striped
                      :items="courseDetail.resources"
                      :fields="resourcesTableFields"
                    />
                  </div>
                  <div v-else>
                    <b-alert show variant="warning">
                      Recursos disponibles al comprar el curso.
                    </b-alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </b-collapse>
  </section>
</template>

<script>
import SmallLevelIcon from '@/components/icons/SmallLevelIcon.vue'
import CalendarIcon from '@/components/icons/CalendarIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import RateIcon from '@/components/icons/RateIcon.vue'
export default {
  name: 'CourseContent',
  components: {
    SmallLevelIcon,
    CalendarIcon,
    ClockIcon,
    RateIcon
  },
  data () {
    return {
      currentTab: 1,
      tabsTitle: [
        'Detalles',
        'Que aprenderás',
        'Conocimientos previos',
        'Recursos'
      ],
      courseDetail: {
        description: 'Conoceremos a fondo lo que es Bootstrap y como podemos maqueta un sitio web desde cero con Bootstrap',
        learning: 'Este curso inicia desde cero con Bootstrap, si no sabes nada de html o css este curso también es para ti, pues daremos una leve introducción a html y css para que puedas tomar este curso si es que no sabes nada de nada.',
        previousKnowledge: '<ul>\n<li>Sin conocimientos previos específicos</li>\n<li>Encender la computadora</li>\n<li>Manejo básico de la computadora</li>\n</ul>',
        resources: [],
        isBought: true
      },
      resourcesTableFields: [
        {
          key: 'Nombre',
          sortable: true
        },
        {
          key: 'Link',
          sortable: false
        }
      ]
    }
  },
  methods: {
    changeCurrentTab (currentTab) {
      this.currentTab = currentTab
    }
  }
}
</script>

<style scoped>
/* CONTENT AREA */
#content-collapse {
  padding-top: 40px;
}

.content-wrapper {
  border: solid 1px rgba(32, 32, 32, 0.2);
  border-radius: 4px;
}

.tabs-ul {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.tabs-ul > .tab {
  width: 100%;
  border-bottom: 8px solid #d8dade;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: rgba(32, 32, 32, 0.2);
}

.tabs-ul > .tab:hover {
  cursor: pointer;
}

.tabs-ul > .tab.selected {
  border-bottom-color: #5f8afa;
  color: #3a3b3d;
  font-weight: bold;
}

/* DETAILS TAB */

.details-list {
  list-style: none;
  padding-left: 0;
  /* lg */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: 800;
}

.progress-detail {
  color: #5f8afa;
}

.certificate-btn {
  height: 42px;
  border-radius: 21px;
  background-color: #5f8afa;
  text-transform: uppercase;
  font-size: 14px;
  border: none;
  width: fit-content;
  margin: 0 auto;
  line-height: 1;
}

.certificate-btn .disabled {
  background-color: var(--form-gray);
  pointer-events: none;
}

.tab-content h2.subtitle {
  color: #000000;
  font-size: 1.3rem;
  font-weight: bold;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .tabs-ul > .tab {
    flex-grow: 1;
    height: 90px;
  }
}
</style>
