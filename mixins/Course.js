export const FetchCourse = {
  methods: {
    async fetchCourse () {
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
    setCourse (course) {
      this.$store.dispatch('course/setCourse', { courseData: course })
      this.isLoading = false
    }
  }
}
