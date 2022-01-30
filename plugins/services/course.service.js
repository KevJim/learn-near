export class CourseService {
  constructor ($axios, store) {
    this.$axios = $axios
    this.$store = store
  }

  getCoursesHome () {
    return this.$axios.get('courses/home/')
  }

  getAllCourse (uri) {
    /* const authToken = this.$store.state.user.authToken ?? null */
    /* if (authToken != null) { */
      return this.$axios.get('courses/full/' + uri)
    /* } else {
      return this.$axios.get('courses/full/' + uri)
    } */
  }
/* 

  getCourses (req) {
    const authToken = this.$store.state.user.authToken ?? null
    if (authToken != null) {
      return this.$axios.post('courses/', req, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
    } else {
      return this.$axios.post('courses/', req)
    }
  }

  getCategories () {
    return this.$axios.get('categories')
  } */
/*

  getCourse (uri) {
    const authToken = store.state.user.authToken ?? null
    if (authToken != null) {
      return apiClient.get('courses/' + uri, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
    } else {
      return apiClient.get('courses/' + uri)
    }
  }

  getCourseDetail (courseUri) {
    const authToken = store.state.user.authToken ?? null
    const uri = `courses/${courseUri}/details`
    if (authToken != null) {
      return apiClient.get(uri, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
    } else {
      return apiClient.get(uri)
    }
  }

  getCourseModules (courseId) {
    const authToken = store.state.user.authToken ?? null
    const uri = `courses/${courseId}/modules`
    if (authToken != null) {
      return apiClient.get(uri, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
    } else {
      return apiClient.get(uri)
    }
  }

  getCategoryCarousels () {
    return apiClient.get('courses/carousels')
  }

  setCourseRating (courseUri, rating) {
    const authToken = store.state.user.authToken ?? null
    return apiClient.post(`courses/${courseUri}/scores`, rating, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  } */
}
