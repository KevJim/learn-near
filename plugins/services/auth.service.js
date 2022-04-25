import firebase from 'firebase/compat/app'
import 'firebase/auth'
export class AuthService {
  constructor ($axios, $fire) {
    this.$axios = $axios
    this.$fire = $fire
  }

  async register (form) {
    try {
      const response = await this.$fire.auth.createUserWithEmailAndPassword(form.email, form.pwd)
      const user = {}
      const uid = response.user.uid
      user.firebaseUid = uid
      user.fullname = form.name
      user.email = form.email
      user.signupType = 1
      console.log(user)
      this.verifyEmail(this.$fire.auth.currentUser)
      return this.saveUserOnDB(user).then((response) => {
        return response.data
      }).catch((e) => {
        return {
          status: 'Error',
          message: e.data.error[0].userMessage
        }
      })
    } catch (e) {
    // console.log("Something went wrong with user registration", e)
      return {
        status: 'Error',
        message: e.message
      }
    }
  }

  async login (form) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(form.email, form.pwd)
      const user = await this.$fire.auth.currentUser
      //console.log(user.uid)
      const req = {}
      req.token = user.uid
      try {
        const res = await this.loginDB(req)
        return res.data
      } catch (e) {
        return {
          status: 'Error',
          message: e.data.error[0].userMessage
        }
      }
    } catch (e1) {
      return {
        status: 'Error',
        message: e1.message
      }
    }
  }

  async googleAuth () {
    try {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
      const result = await this.$fire.auth.signInWithPopup(googleAuthProvider)
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
        return this.saveUserOnDB(user).then((response) => {
          return response.data
        }).catch((e) => {
          return {
            status: 'Error',
            message: e.data.error[0].userMessage
          }
        })
      } else {
        return this.$fire.auth.currentUser.getIdToken().then(async (idToken) => {
          const req = {
            token: idToken
          }
          try {
            const response = await this.loginDB(req)
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
  }

  logout () {
    return this.$fire.auth.signOut()
  }

  async sendChangePasswordEmail (email) {
    const auth = this.$fire.auth
    try {
      return await auth.sendPasswordResetEmail(email)
    } catch (error) {
      return error
    }
  }

  verifyEmail (user) {
    if (!user.emailVerified) {
      user.sendEmailVerification().then(function () {
        // Email sent.
        // console.log('Email was sent')
      }).catch(function (error) {
        return error
        // An error happened.
        // console.log('An error happened while trying to send email' + error.message)
      })
    }
  }

  saveUserOnDB (user) {
    /* try {
      AnalyticsService.registerEvent('sign_up',
        {
          method: user.signupType === 1 ? 'Email' : 'Google'
        })
    } catch (error) {
      console.log(error)
    } */
    return this.$axios.post('students/add/', user)
  }

  loginDB (req) {
    // registerLoginEvent(type)
    return this.$axios.post('login/getToken/', req)
  }

  googleProvider () {
    const googleAuthProvider = new this.$fire.auth.GoogleAuthProvider()
    return googleAuthProvider
  }
}
