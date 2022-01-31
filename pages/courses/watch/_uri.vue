<template>
  <div id="watch-course">
    <CourseVideo />
    <CourseContent :loading="isLoading" />
  </div>
</template>

<script>
import CourseVideo from '@/components/sections/courses/watch/CourseVideo.vue'
import CourseContent from '@/components/sections/courses/watch/CourseContent.vue'
import { FetchCourse } from '@/mixins/Course.js'
export default {
  name: 'WatchCourseURI',
  components: {
    CourseVideo,
    CourseContent
  },
  mixins: [
    FetchCourse
  ],
  data () {
    return {
      isLoading: true
    }
  },
  async fetch () {
    await this.fetchCourse()
  }
}
</script>

<style scoped>
</style>
