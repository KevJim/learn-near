export const state = () => ({
  course: null,
  lessonInfoToModal: null
})

export const mutations = {
  SET_COURSE (state, course) {
    state.course = course
  },
  SET_LESSON_INFO (state, lesson) {
    state.lessonInfoToModal = lesson
  }
}

export const actions = {
  setCourse ({ commit }, courseData) {
    commit('SET_COURSE', courseData.courseData)
    /* return new Promise((resolve, reject) => {
      this.$course.getAllCourse(courseUri.courseUri)
        .then((res) => {
        // console.log(res);
          if (res.status === 200 && res.data.status === 'Ok') {
            const course = res.data.data
            commit('SET_COURSE', course)
            resolve(true)
          }
        }).catch((e) => {
          console.log('Error at getCourses', e)
          reject(e)
        })
    }) */
  },
  setLessonInfoToModal ({ commit }, lesson) {
    commit('SET_LESSON_INFO', lesson.lesson)
  }
}

export const getters = {
  getCourseDetails: (state) => {
    if (state.course) {
      const details = []
      const description = {
        id: '01',
        name: 'Descripción del curso',
        text: state.course.detail.description
      }
      const learning = {
        id: '02',
        name: 'Lo que aprenderas',
        text: state.course.detail.learning
      }
      const previousKnowledge = {
        id: '03',
        name: 'Conocimientos previos',
        text: state.course.detail.previousKnowledge
      }
      details.push(description, learning, previousKnowledge)
      return details
    }
    return ''
  },
  getLevel: (state) => {
    if (state.course) {
      if (state.course.general.level === 1) {
        return 'Básico'
      }
      if (state.course.general.level === 2) {
        return 'Intermedio'
      }
      return 'Avanzado'
    }
    return ''
  },
  getReleaseDate: (state) => {
    if (state.course) {
      const dtOpts = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      const defaultFormat = state.course.general.releaseDate.split('T')[0]
      const dtFormat = new Date(defaultFormat.replace(/-/g, '/'))
      return dtFormat.toLocaleDateString('es-MX', dtOpts)
    }
    return ''
  },
  getDuration: (state) => {
    if (state.course) {
      return `${state.course.general.duration} hrs`
    }
    return ''
  }
}
