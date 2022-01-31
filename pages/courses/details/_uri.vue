<template>
  <div id="course-details">
    <CoursePreview
      :loading="isLoading"
    />
    <CourseDetails
      :loading="isLoading"
    />
  </div>
</template>

<script>
import CoursePreview from '@/components/sections/courses/detail/CoursePreview.vue'
import CourseDetails from '@/components/sections/courses/detail/CourseDetails.vue'
import { FetchCourse } from '@/mixins/Course.js'
export default {
  name: 'CourseDetailsURI',
  components: {
    CoursePreview,
    CourseDetails
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
#course-details {
  margin-bottom: 40px;
}
</style>
