import CourseService from '@/services/CourseService'
import UserService from '@/services/UserService'
// import router from '@/router'
export const namespaced = true

export const state = {
  course: null,
  currentLesson: null,
  nextLesson: null,
  prevLesson: null,
  lastLesson: null,
  playerConfig: null, // keep config
  lessonInfoToModal: null
}

export const mutations = {
  SET_COURSE (state, course) {
    state.course = course
  },
  SET_LESSON (state, lesson) {
    state.currentLesson = lesson
  },
  SET_NEXT_LESSON (state, lesson) {
    state.nextLesson = lesson
  },
  SET_PREV_LESSON (state, lesson) {
    state.prevLesson = lesson
  },
  SET_LAST_LESSON (state, lesson) {
    state.lastLesson = lesson
  },
  SET_VIEWED_LESSON (state, lessonId) {
    const modules = state.course.modules
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i]
      const lesson = module.lessons.find(l => l.lessonId === lessonId)
      if (lesson) {
        lesson.completed = true
        break
      }
    }
  },
  SET_PROGRESS (state, progress) {
    state.course.detail.progressPercentage = progress
  },
  RESET_STATE (state) {
    state.course = null
    state.currentLesson = null
    state.prevLesson = null
    state.nextLesson = null
    state.lastLesson = null
    state.playerConfig = null
  },
  SET_LESSON_INFO (state, lesson) {
    state.lessonInfoToModal = lesson
  }
}

export const actions = {
  setCourse ({ commit }, courseUri) {
    return new Promise((resolve, reject) => {
      CourseService.getAllCourse(courseUri.courseUri)
        .then((res) => {
        // console.log(res);
          if (res.status === 200 && res.data.status === 'Ok') {
            const course = res.data.data
            commit('SET_COURSE', course)
            resolve(true)
          }
        }).catch((e) => {
          console.log('Error at getCourses', e)
          // reject(false)
        })
    })
  },
  setCurrentLesson ({ getters, commit }, lesson) {
    commit('SET_LESSON', lesson.lesson)
    const nextAndPrevLessons = getters.getNextAndPrevLessons
    if (nextAndPrevLessons !== null) {
      commit('SET_NEXT_LESSON', nextAndPrevLessons.next)
      commit('SET_PREV_LESSON', nextAndPrevLessons.prev)
      commit('SET_LAST_LESSON', nextAndPrevLessons.last)
    }
  },
  setViewedLesson ({ commit }, lessonId) {
    UserService.lessonViewed(lessonId.lessonId).then((res) => {
      // set course lesson as viewed
      if (res.status === 200) {
        commit('SET_PROGRESS', res.data.data.progressPercentage)
      }
      // console.log(res);
      commit('SET_VIEWED_LESSON', lessonId.lessonId)
    })
  },
  resetState ({ commit }) {
    commit('RESET_STATE')
  },
  goToNextLesson ({ state }, course) {
    const nextLesson = state.nextLesson
    goToLesson(course.courseUri, nextLesson)
  },
  goToPrevLesson ({ state }, course) {
    const prevLesson = state.prevLesson
    goToLesson(course.courseUri, prevLesson)
  },
  setLessonInfoToModal ({ commit }, lesson) {
    commit('SET_LESSON_INFO', lesson.lesson)
  }
}

export const getters = {
  getNextAndPrevLessons: (state) => {
    const allLessons = []
    let nextAndPrev = null
    if (state.currentLesson) {
      const modules = state.course.modules
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i]
        module.lessons.forEach((lesson) => {
          allLessons.push(lesson)
        })
      }
      nextAndPrev = {
        next: allLessons.find(l => l.order === state.currentLesson.order + 1),
        prev: allLessons.find(l => l.order === state.currentLesson.order - 1),
        last: allLessons.find(l => l.order === allLessons.length)
      }
    }
    return nextAndPrev
  },
  getLessonAfterLastCompleted: (state) => {
    let next = null
    const allLessons = []
    const modules = state.course.modules
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i]
      module.lessons.forEach((lesson) => {
        allLessons.push(lesson)
      })
    }
    // var next = allLessons.find(l => l.order == 1)
    const lessonsReversed = allLessons.reverse()
    // console.log(lessonsReversed);
    const lastCompleted = lessonsReversed.find(l => l.completed === true)
    if (lastCompleted !== undefined && lastCompleted.order < allLessons.length) {
      next = allLessons.find(l => l.order === lastCompleted.order + 1)
    }

    return next
  },
  getCourseUri: (state) => {
    return state.course.general.uri
  }
}

function goToLesson (courseUri, lesson) {
  // if (lesson !== null) {
  //   router.replace(
  //     {
  //       name: 'WatchLesson',
  //       params: {
  //         courseId: courseUri,
  //         lessonId: lesson.lessonUri
  //       }
  //     })
  // }
}
