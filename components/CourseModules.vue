<template>
  <div
    id="course-modules"
    class="tablist mt-4"
    role="tablist"
  >
    <b-card
      v-for="(moduleItem, index) in modules"
      :key="index"
      no-body
      class="mb-4"
    >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <button
          v-b-toggle="'accordion-' + index"
          block
          class="tab-btn d-flex justify-content-between align-items-center"
        >
          <p class="m-0 text-left">
            {{ moduleItem.moduleName }}
          </p>
          <BaseIcon
            height="20"
            width="20"
          >
            <DownArrowIcon />
          </BaseIcon>
        </button>
      </b-card-header>
      <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <ul class="p-0 lessons-list">
            <li
              v-for="(lesson, indx) in moduleItem.lessons"
              :key="indx"
              class="mb-2"
            >
              <NuxtLink
                :to="{ name: 'courses-watch-uri-lessonid', params: { uri: $route.params.uri , lessonid: lesson.lessonUri } }"
                class="d-flex justify-content-between py-2 px-1"
              >
                <span>
                  <BaseIcon
                    height="18"
                    width="18"
                    class="mr-2"
                  >
                    <PlayIcon />
                  </BaseIcon>
                  {{ lesson.lessonName }}
                </span>
                <span>{{ lesson.duration }}</span>
              </NuxtLink>
            </li>
          </ul>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
export default {
  name: 'CourseModules',
  components: {
    DownArrowIcon,
    PlayIcon
  },
  computed: {
    modules () {
      const courseStore = this.$store.state.course.course
      if (courseStore) {
        return courseStore.modules
      }
      return ''
    },
    courseUri () {
      const courseStore = this.$store.state.course.course
      if (courseStore) {
        return courseStore.detail.uri
      }
      return ''
    }
  }
}
</script>

<style scoped>
.accordion > .card:not(:last-of-type) {
  border-bottom: 1;
}

.card-header {
  background-color: var(--light-gray-1);
  margin-bottom: 0;
  border-bottom: 0;
}

.tab-btn {
  background-color: var(--light-gray-1) !important;
  border: none;
  color: var(--dark-blue-2) !important;
  font-size: 1.05rem;
  height: 100%;
  width: 100%;
  padding: 10px;
}

.lessons-list {
  list-style-type: none;
}

.lessons-list li a {
  color: var(--dark-blue-2);
  border-radius: 4px;
  font-size: .9rem;
  text-decoration: none;
}

.lessons-list li:hover a {
  background-color: rgba(75, 75, 107, 0.06);
  color: var(--light-blue-1);
  cursor: pointer;
}
</style>
