<template>
  <div id="course-details-id">
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
export default {
  name: 'CourseDetailsID',
  components: {
    CoursePreview,
    CourseDetails
  },
  data () {
    return {
      isLoading: true
    }
  },
  async fetch () {
    const courseUri = this.$route.params.uri
    const storedCourse = this.$store.state.course.course
    if (storedCourse && storedCourse.general.uri === courseUri) {
      this.setCourse(storedCourse)
    } else {
      await this.$course.getAllCourse(courseUri)
        .then((response) => {
          this.setCourse(response.data.data)
        })
        .catch((error) => {
          console.log('ERROR: ', error)
        })
    }
  },
  methods: {
    setCourse (course) {
      this.$store.dispatch('course/setCourse', { courseData: course })
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
#course-details-id {
  margin-bottom: 40px;
}
</style>
