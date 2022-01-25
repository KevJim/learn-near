<template>
  <div id="home">
    <MainBanner />

    <StudyLevels />

    <HomeCourses />
  </div>
</template>

<script>
import MainBanner from '@/components/sections/MainBanner.vue'
import StudyLevels from '@/components/sections/StudyLevels.vue'
import HomeCourses from '@/components/sections/HomeCourses.vue'
export default {
  name: 'IndexPage',
  components: {
    MainBanner,
    StudyLevels,
    HomeCourses
  }
}
</script>
