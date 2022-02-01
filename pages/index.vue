<template>
  <div id="home">
    <template v-if="!isLoading">
      <MainBanner
        :slides="sliderElements"
      />

      <StudyLevels />

      <HomeCourses
        :carousels="carousels"
      />
    </template>
    <div
      v-else
      class="d-flex justify-content-center align-items-center w-100 mt-5"
    >
      <b-spinner variant="secondary" label="Loading Home" />
      <span class="ml-3 font-weight-bold">Cargando Home...</span>
    </div>
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
      carousels: [{}, {}, {}],
      isLoading: true
    }
  },
  async fetch () {
    await this.$course.getCoursesHome()
      .then((response) => {
        this.sliderElements = response.data.data.sliderElements
        this.carousels = response.data.data.carrousels
        this.isLoading = false
      })
      .catch((error) => {
        console.log('ERROR: ', error)
      })
  }
}
</script>
