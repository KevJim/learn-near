import firebase from 'firebase/compat/app'
// Import needed firebase modules
// New comment test repository
import 'firebase/compat/auth'
import axios from 'axios'
// import AnalyticsService from '@/services/AnalyticsService.js'

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const apiClient = axios.create({
  baseURL: 'https://test-ockham.herokuapp.com/',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {

  async register (form) {
    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(form.email, form.pwd)
      // console.log('inside then');
      // console.log(response);
      const user = {}
      const uid = response.user.uid
      user.firebaseUid = uid
      user.email = form.email
      user.signupType = 1
      this.verifyEmail(firebase.auth().currentUser)
      return saveUserOnDB(user).then((response) => {
        return response.data
      }).catch((e) => {
        console.log(e)
        return {
          status: 'Error',
          message: e.data.error[0].userMessage
        }
      })
    } catch (e) {
      // console.log("Something went wrong with user registration", e);
      console.log(e)
      return {
        status: 'Error',
        message: e.message
      }
    }
  },
  async login (form) {
    let req = {}
    try {
      await firebase.auth().signInWithEmailAndPassword(form.email, form.pwd)
      const token = await firebase.auth().currentUser.getIdToken()
      req = { token }
      const res = await login(req, 1)
      if (res.data.status === 'Error') { console.log('holaaaaaa' + res.data) }
      return res.data
    } catch (e) {
      return {
        status: 'Error',
        message: e.message || e.data.error[0].userMessage
      }
    }
  },
  async googleAuth () {
    try {
      const result = await firebase.auth().signInWithPopup(googleAuthProvider)
      const user = {}
      const uid = result.user.uid
      user.firebaseUid = uid
      user.fullname = result.additionalUserInfo.profile.name
      user.email = result.additionalUserInfo.profile.email
      user.profileImgSrc = result.additionalUserInfo.profile.picture
      user.signupType = 2
      // this.verifyEmail(firebase.auth().currentUser);
      if (result.additionalUserInfo.isNewUser) {
        // try to save user on db
        return saveUserOnDB(user).then((response) => {
          return response.data
        }).catch((e) => {
          console.log(e)
          return {
            status: 'Error',
            message: e.data.error[0].userMessage
          }
        })
      } else {
        return firebase.auth().currentUser.getIdToken()
          .then(async (idToken) => {
            const req = {
              token: idToken
            }
            try {
              const response = await login(req, 2)
              return response.data
            } catch (e) {
              return {
                status: 'Error',
                message: e.data.error[0].userMessage
              }
            }
          }).catch((e) => {
            return {
              status: 'Error',
              message: e.message
            }
          })
      }
    } catch (e) {
      return {
        status: 'Error',
        message: e.message
      }
    }
  },
  verifyEmail (user) {
    // var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Email was sent')
      }).catch(function (error) {
        // An error happened.
        console.log('An error happened while trying to send email' + error.message)
      })
    }
  },
  logout () {
    return firebase.auth().signOut()
  },
  getFirebaseUser () {
    return firebase.auth().currentUser
  },

  async sendChangePasswordEmail (email) {
    const auth = firebase.auth()
    try {
      return await auth.sendPasswordResetEmail(email)
    } catch (error) {
      return error
    }
  }

}

// Internal DB
function login (req, type) {
  registerLoginEvent(type)
  return apiClient.post('login/getToken/', req)
}
function saveUserOnDB (user) {
  // try {
  //   AnalyticsService.registerEvent('sign_up',
  //     {
  //       method: user.signupType === 1 ? 'Email' : 'Google'
  //     })
  // } catch (error) {
  //   console.log(error)
  // }
  return apiClient.post('students/add/', user)
}
function registerLoginEvent (type) {
  // try {
  //   AnalyticsService.registerEvent('login',
  //     {
  //       method: type === 1 ? 'Email' : 'Google'
  //     })
  // } catch (error) {
  //   console.log(error)
  // }
}
