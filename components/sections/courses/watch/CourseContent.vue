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
                class="tab"
                :class="currentTab == 1 ? 'selected' : ''"
              >
                <button
                  :disabled="loading"
                  @click="changeCurrentTab(1)"
                >
                  {{ tabsTitle[0] }}
                </button>
              </li>
              <li
                class="tab py-2"
                :class="currentTab == 2 ? 'selected' : ''"
              >
                <button
                  :disabled="loading"
                  @click="changeCurrentTab(2)"
                >
                  {{ tabsTitle[1] }}
                </button>
              </li>
              <li
                class="tab text-center"
                :class="currentTab == 3 ? 'selected' : ''"
              >
                <button
                  :disabled="loading"
                  @click="changeCurrentTab(3)"
                >
                  {{ tabsTitle[2] }}
                </button>
              </li>
              <li
                class="tab"
                :class="currentTab == 4 ? 'selected' : ''"
              >
                <button
                  :disabled="loading"
                  @click="changeCurrentTab(4)"
                >
                  {{ tabsTitle[3] }}
                </button>
              </li>
            </ul>
          </div>
          <div class="content-row p-3 mt-3 py-lg-5 px-lg-4">
            <div class="tab-content">
              <!-- DETAILS TAB -->
              <div v-if="currentTab == 1">
                <div class="details-wrapper d-flex d-flex flex-column flex-md-row justify-content-between">
                  <ProfessorCard
                    :loading="loading"
                    :professor="professor"
                  />
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
                        <template v-if="!loading">
                          {{ levelString }}
                        </template>
                        <b-skeleton v-else width="80px" />
                      </li>
                      <li class="mb-3">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <CalendarIcon />
                        </BaseIcon>
                        <template v-if="!loading">
                          {{ releaseDate }}
                        </template>
                        <b-skeleton v-else width="100px" />
                      </li>
                      <li class="mb-3">
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <ClockIcon />
                        </BaseIcon>
                        <template v-if="!loading">
                          {{ duration }}
                        </template>
                        <b-skeleton v-else width="80px" />
                      </li>
                      <li>
                        <BaseIcon
                          class="mr-2"
                          width="16"
                          height="16"
                        >
                          <RateIcon />
                        </BaseIcon>
                        <template v-if="!loading">
                          {{ course.general.review == 0 ? 'Aún no hay suficientes calificaciones' : course.general.review }}
                        </template>
                        <b-skeleton v-else width="40px" />
                      </li>
                    </ul>
                  </div>
                  <div class="progress-info-box text-center mt-4 mt-md-0 d-flex flex-column justify-content-center align-items-stretch">
                    <div>
                      <p class="progress-text progress-title mb-1">
                        Tu progreso:
                      </p>
                      <p class="progress-text progress-detail mb-2">
                        <template v-if="!loading">
                          {{ progress }}%
                        </template>
                        <b-skeleton v-else width="48px" height="26px" class="mx-auto my-4" />
                      </p>
                    </div>
                    <b-button
                      class="certificate-btn mt-2"
                      :disabled="loading"
                    >
                      Obtener certificado
                    </b-button>
                  </div>
                </div>
                <div class="mt-5">
                  <h2 class="subtitle">
                    Descripción
                  </h2>
                  <p v-if="!loading">
                    {{ course.detail.description }}
                  </p>
                  <template v-else>
                    <b-skeleton width="80%" height="24px" class="" />
                    <b-skeleton width="60%" height="24px" class="mt-2" />
                  </template>
                </div>
              </div>
              <!-- WHAT WILL LEARN TAB -->
              <div
                v-if="currentTab == 2"
                v-html="course.detail.learning"
              />
              <!-- PRIOR KNOWLEDGE TAB -->
              <div
                v-if="currentTab == 3"
                v-html="course.detail.previousKnowledge"
              />
              <!-- RESOURCES TAB -->
              <div
                v-if="currentTab == 4"
              >
                <div>
                  <div
                    v-if="course.detail.isBought"
                  >
                    <b-table
                      striped
                      :items="course.detail.resources"
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
  props: {
    loading: {
      type: Boolean,
      default: true
    }
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
    },
    progress () {
      if (this.course.detail.progressPercentage !== 'undefined') {
        return Math.round(this.course.detail.progressPercentage * 100) / 100
      }
      return 0
    },
    professor () {
      const courseStore = this.$store.state.course.course
      if (courseStore) {
        return courseStore.detail.professorA
      }
      return {}
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
  border-bottom: 8px solid var(--light-gray-3);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: rgba(32, 32, 32, 0.2);
}

.tabs-ul > .tab button {
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 1rem;
  color: rgba(32, 32, 32, 0.2);
}

.tabs-ul > .tab.selected button {
  color: var(--dark-gray-4);
  font-weight: bold;
}

.tabs-ul > .tab.selected {
  border-bottom-color: var(--light-blue-1);
  color: var(--dark-gray-4);
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

.details-list li {
  display: flex;
  align-items: center;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: 800;
}

.progress-detail {
  color: var(--light-blue-1);
}

.certificate-btn {
  height: 42px;
  border-radius: 21px;
  background-color: var(--light-blue-1);
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
  color: var(--dark-gray-1);
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
