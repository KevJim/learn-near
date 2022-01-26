<template>
  <section id="details-section" class="container">
    <b-row>
      <b-col class="left-col mb-5 mb-lg-0" cols="12" lg="6">
        <b-card>
          <span class="font-weight-bold card-title">Contenido</span>
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
      <b-col class="right-col">
        <b-card no-body class="p-2">
          <ProfessorCard />
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
            <b-collapse :id="'accordion-' + detail.id" visible accordion="details" role="tabpanel">
              <b-card-body>
                <p>Texto</p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
export default {
  name: 'CourseDetails',
  components: {
    DownArrowIcon,
    PlayIcon
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
#details-section {
  margin-top: 80px;
}

.accordion > .card:not(:last-of-type) {
  border-bottom: 1;
}

.card-header {
  background-color: var(--light-gray-1);
  margin-bottom: 0;
  border-bottom: 0;
}

.tab-btn {
  background-color: var(--light-gray-1);
  border-color: var(--light-gray-1);
  font-size: 1.05rem;
}

/* LEFT COL */
.left-col {
  color: var(--dark-blue-2);
}

.card-title {
  color: var(--dark-blue-1);
  font-size: 1.05rem;
}

.left-col .tab-btn {
  color: var(--dark-blue-2);
}

.lessons-list li {
  border-radius: 4px;
  font-size: .9rem;
}

.lessons-list li:hover {
  background-color: rgba(75, 75, 107, 0.06);
  color: var(--light-blue-1);
  cursor: pointer;
}

/* RIGHT COL */
.right-col .tablist .card-header {
  height: 66px;
  display: flex;
}

.right-col .tablist .card-header button {
  color: var(--dark-gray-5);
  font-weight: 600;
}
</style>
