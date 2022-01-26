<template>
  <div id="course-details-id">
    <CoursePreview />
    <CourseDetails />
  </div>
</template>

<script>
import CoursePreview from '@/components/sections/courses/detail/CoursePreview.vue'
import CourseDetails from '@/components/sections/courses/detail/CourseDetails.vue'
export default {
  name: 'CourseDetailsID',
  components: {
    CoursePreview,
    CourseDetails
  }
}
</script>

<style scoped>
#course-details-id {
  margin-bottom: 40px;
}
</style>
