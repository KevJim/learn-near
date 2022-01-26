<template>
  <div id="home">
    <MainBanner />

    <StudyLevels />

    <HomeCourses />
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
  }
}
</script>
