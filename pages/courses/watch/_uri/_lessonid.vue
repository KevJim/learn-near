<template>
  <div id="watch-course">
    <CourseVideo>
      <template #video>
        <VideoPlayer
          :auto-play="true"
          :video-src="videoUrl"
        />
      </template>
    </CourseVideo>
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
  beforeRouteUpdate (to, from, next) {
    this.setCurrentLesson(to.params.lessonid)
    // console.log('TO', to.params)
    next()
  },
  data () {
    return {
      isLoading: true
    }
  },
  async fetch () {
    await this.fetchCourse()
  },
  computed: {
    videoUrl () {
      const lessonStore = this.$store.state.course_watch.currentLesson
      if (lessonStore) {
        return lessonStore.videoUrl
      }
      return this.$store.state.course.course.detail.introductionVideo
    }
  },
  created () {
    const lessonId = this.$route.params.lessonid
    if (lessonId) {
      this.setCurrentLesson(lessonId)
    }
  },
  methods: {
    setCurrentLesson (lessonId) {
      this.$store.dispatch('course_watch/setCurrentLesson2', { lesson: lessonId })
    }
  }
}
</script>

<style scoped>
</style>
