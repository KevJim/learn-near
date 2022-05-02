<template>
  <b-row class="mt-5 mx-xl-2">
    <b-col
      v-for="(course, index) in courses"
      :key="index"
      cols="12"
      sm="6"
      xl="3"
      class="mb-4 my-4"
    >
      <CourseCard
        :card-content="course"
        :show-percentage="true"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'MyCoursesPage',
  data () {
    return {
      // example info
      courses: [
        {
          name: 'Bootstrap desde cero (Live)',
          progressPercentage: 19,
          uri: 'css-primeros-pasos'
        },
        {
          name: 'Bootstrap desde cero (Live)',
          progressPercentage: 25,
          uri: 'css-primeros-pasos'
        },
        {
          name: 'HTML desde cero (Prelaunch)',
          progressPercentage: 50,
          uri: 'css-primeros-pasos'
        },
        {
          name: 'CSS desde cero (Live)',
          progressPercentage: 75,
          uri: 'css-primeros-pasos'
        },
        {
          name: 'Bootstrap desde cero (Live)',
          progressPercentage: 100,
          uri: 'css-primeros-pasos'
        }
      ]
      // example info
    }
  }
}
</script>

<style scoped>

</style>
