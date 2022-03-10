import axios from 'axios'
import store from '@/store/index'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_INTERNAL_API_BASE_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async update (user) {
    const response = await updateUser(user)
    return response.data
  },
  async updateUserPicture (form, userId) {
    const response = await updateUserPicture(form, userId)
    return response.data
  },
  /**
   *
   * @param {*} cProgress - check progress of courses
   * @param {*} cFavorite - check if is favorite for current user
   * @param {*} cPurchase -check if courses was purchased
   * @param {*} selection - 1 all (default), 2 favorites
   */
  getCourses (selection = 1, cProgress = false, cFavorite = false, cPurchase = false) {
    const uid = store.state.user.user.id ?? null
    const req = {
      selection,
      checkProgress: cProgress,
      checkFavorite: cFavorite,
      checkPurchase: cPurchase
    }
    const uri = `students/${uid}/courses/`
    const authToken = store.state.user.authToken ?? null
    return apiClient.post(uri, req, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  },
  addFavorite (courseId) {
    const uri = 'courses/favorites/'
    const authToken = store.state.user.authToken ?? null
    return apiClient.post(uri, courseId, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  },
  deleteFavorite (courseId) {
    const uri = 'courses/favorites/'
    const authToken = store.state.user.authToken ?? null
    return apiClient.delete(uri, {
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      data: courseId
    })
  },
  getTotals () {
    const uid = store.state.user.user.id ?? null
    const authToken = store.state.user.authToken ?? null
    return apiClient.get(`students/${uid}/totals`, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  },
  lessonViewed (lessonId) {
    const uid = store.state.user.user.id ?? null
    const req = {
      lessonId,
      completed: true
    }
    const authToken = store.state.user.authToken ?? null
    return apiClient.post(`students/${uid}/lessons`, req, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  },
  getCertificates () {
    const authToken = store.state.user.authToken ?? null
    return apiClient.get('students/certificates', {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  },
  getCertificate (id) {
    return apiClient.get(`students/certificates/${id}`)
  },
  getSubscription () {
    const authToken = store.state.user.authToken ?? null
    return apiClient.get('students/subscriptions', {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  }
}

async function updateUserPicture (form, userId) {
  try {
    const authToken = store.state.user.authToken ?? null
    const data = await apiClient.post('students/' + userId,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + authToken
        }
      })
    // console.log(data.data);
    return data
  } catch (e) {
    console.log('FAILURE!!')
    return e
  }
}
function updateUser (user) {
  const userId = user.id
  const authToken = store.state.user.authToken ?? null
  return apiClient.put('students/' + userId, user, {
    headers: {
      Authorization: 'Bearer ' + authToken
    }
  })
}
