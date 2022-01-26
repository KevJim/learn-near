<template>
  <div id="watch-course">
    <CourseVideo />
    <CourseContent />
  </div>
</template>

<script>
import CourseVideo from '@/components/sections/courses/watch/CourseVideo.vue'
import CourseContent from '@/components/sections/courses/watch/CourseContent.vue'
export default {
  name: 'WatchCourseID',
  components: {
    CourseVideo,
    CourseContent
  }
}
</script>

<style scoped>
</style>
