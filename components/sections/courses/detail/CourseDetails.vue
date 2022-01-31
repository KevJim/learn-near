<template>
  <section id="details-section" class="container">
    <b-row>
      <b-col class="left-col mb-5 mb-lg-0" cols="12" lg="6">
        <b-card>
          <span class="font-weight-bold card-title">Contenido</span>
          <CourseModules
            v-if="!loading"
          />
          <template v-else>
            <b-skeleton height="40px" class="mt-2" />
            <b-skeleton height="40px" class="my-2" />
            <b-skeleton height="40px" />
          </template>
        </b-card>
      </b-col>
      <b-col class="right-col">
        <b-card no-body class="p-2">
          <ProfessorCard
            :professor="professor"
            :loading="loading"
          />
        </b-card>
        <div
          v-if="!loading"
          class="tablist mt-2"
          role="tablist"
        >
          <b-card
            v-for="detail in courseDetails"
            :key="detail.id"
            no-body
            class="mb-2"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <button
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
              </button>
            </b-card-header>
            <b-collapse :id="'accordion-' + detail.id" accordion="details" role="tabpanel">
              <b-card-body>
                <div v-html="detail.text" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <template v-else>
          <b-skeleton height="62px" class="mt-2" />
          <b-skeleton height="62px" class="my-2" />
          <b-skeleton height="62px" />
        </template>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
export default {
  name: 'CourseDetails',
  components: {
    DownArrowIcon
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    courseDetails () {
      return this.$store.getters['course/getCourseDetails']
    },
    professor () {
      const courseStore = this.$store.state.course.course
      if (courseStore) {
        return courseStore.detail.professorA
      }
      return {}
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
  border: none;
  font-size: 1.05rem;
  height: 100%;
  width: 100%;
  padding: 10px;
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
