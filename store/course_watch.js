export const state = () => ({
  currentLesson: null,
  nextLesson: null,
  prevLesson: null,
  lastLesson: null,
  playerConfig: null // keep config
})

export const mutations = {
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
    state.currentLesson = null
    state.prevLesson = null
    state.nextLesson = null
    state.lastLesson = null
    state.playerConfig = null
  }
}

export const actions = {
  setCurrentLesson2 ({ rootState, commit }, lesson) {
    const setLesson = getLessonFromModules(rootState, lesson.lesson)
    commit('SET_LESSON', setLesson)
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
    this.$course.lessonViewed(lessonId.lessonId).then((res) => {
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
  }
}

function goToLesson (courseUri, lesson) {
  if (lesson !== null) {
    this.$router.replace(
      {
        name: 'WatchLesson',
        params: {
          courseId: courseUri,
          lessonId: lesson.lessonUri
        }
      })
  }
}

function getLessonFromModules (root, lessonUri) {
  const modules = root.course.course.modules
  for (let i = 0; i < modules.length; i++) {
    const module = modules[i]
    const lesson = module.lessons.find(l => l.lessonUri === lessonUri)
    if (lesson) {
      return lesson
    }
  }
}
