<template>
  <div class="card-carousel">
    <slot name="title">
      <h3>Cursos</h3>
    </slot>
    <b-row>
      <b-col
        v-for="(course, index) in courses"
        :key="index"
        cols="12"
        sm="6"
        xl="3"
        class="mb-4"
      >
        <CourseCard
          :course-info="course"
        />
      </b-col>
      <b-col cols="12">
        <b-button class="custom-btn">
          {{ btnMessage }}
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'CardCarrousel',
  props: {
    courses: {
      type: Array,
      default: () => []
    },
    btnMessage: {
      type: String,
      default: 'Mostrar todo'
    }
  }
}
</script>

<style scoped>
.card-carousel {
  padding: 40px 0;
}
.col-12 .custom-btn {
  margin-top: 18px;
}
</style>
