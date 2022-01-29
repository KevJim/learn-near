<template>
  <div id="home">
    <MainBanner
      :slides="sliderElements"
    />

    <StudyLevels />

    <HomeCourses
      :carousels="carousels"
    />
  </div>
</template>

<script>
import MainBanner from '@/components/sections/home/MainBanner.vue'
import StudyLevels from '@/components/sections/home/StudyLevels.vue'
import HomeCourses from '@/components/sections/home/HomeCourses.vue'
export default {
  name: 'IndexPage',
  components: {
    MainBanner,
    StudyLevels,
    HomeCourses
  },
  data () {
    return {
      sliderElements: [],
      carousels: [{}, {}, {}]
    }
  },
  async fetch () {
    await this.$course.getCoursesHome()
      .then((response) => {
        this.sliderElements = response.data.data.sliderElements
        this.carousels = response.data.data.carrousels
      })
      .catch((error) => {
        console.log('ERROR: ', error)
      })
  }
}
</script>
