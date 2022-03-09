import AuthService from '@/services/AuthService.js'
import UserService from '@/services/UserService.js'
export const namespaced = true

export const state = () => ({
  isUserLoggedIn: false,
  user: {},
  authToken: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user.detail
    state.authToken = user.token
    state.isUserLoggedIn = true
  },
  UNSET_USER (state) {
    state.user = {}
    state.isUserLoggedIn = false
    state.authToken = null
  },
  SET_TOKEN (state, token) {
    state.authToken = token
  },
  UPDATE_USER_DATA (state, userData) {
    state.user = userData
  }
}
export const actions = {
  register ({ commit, dispatch }, user) {
    dispatch('activateLoading', null, { root: true })
    return AuthService.register(user)
      .then((response) => {
        dispatch('deactivateLoading', null, { root: true })
        if (response.status === 'Ok') {
          const obj = {
            detail: response.data,
            token: response.token
          }
          commit('SET_USER', obj)
          const notification = {
            type: 'success',
            title: 'Registro e Inicio de sesión exitosos!',
            message: 'Recibirás un correo para confirmar tu cuenta',
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return true
        } else {
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error',
            message: response.message,
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return false
        }
      }).catch(() => {
        dispatch('deactivateLoading', null, { root: true })
      })
  },
  login ({ commit, dispatch }, user) {
    dispatch('activateLoading', null, { root: true })
    return AuthService.login(user)
      .then((response) => {
        dispatch('deactivateLoading', null, { root: true })
        if (response.status === 'Ok') {
          const obj = {
            detail: response.data,
            token: response.token
          }
          commit('SET_USER', obj)
          const notification = {
            type: 'success',
            title: 'Inicio de sesión exitoso!',
            message: 'Cargando datos de usuario..',
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return true
        } else {
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error al iniciar sesión',
            message: response.message,
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return false
        }
      }).catch((e) => {
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'error',
          title: 'Ocurrió un error al intentar iniciar sesión!',
          message: e.message,
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
        return false
      })
  },
  googleAuth ({ commit, dispatch }) {
    dispatch('activateLoading', null, { root: true })
    return AuthService.googleAuth()
      .then((response) => {
      // console.log(response);
        dispatch('deactivateLoading', null, { root: true })
        if (response.status === 'Ok') {
          const obj = {
            detail: response.data,
            token: response.token
          }
          commit('SET_USER', obj)
          const notification = {
            type: 'success',
            title: 'Inicio de sesión con Google exitoso!',
            message: 'Cargando datos de usuario..',
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return true
        } else {
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error',
            message: response.error[0].title,
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return false
        }
      }).catch((e) => {
      // console.log('GoogleAuth Error. ' + e.message);
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'error',
          title: 'Oops! Ocurrió un error al iniciar sesión con Google',
          message: e.message,
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  logout ({ dispatch }) {
    AuthService.logout().then(() => {
      const notification = {
        type: 'success',
        title: 'Cerraste sesión exitosamente',
        message: 'Vuelve pronto!',
        timeout: true
      }
      dispatch('shoppingCart/deleteAllItems', null, { root: true })
      dispatch('course/resetState', null, { root: true }) // se tiene que agregar forzosamente el null porque se espera como segundo parametro del dispatch el parametro que recibe el action.
      dispatch('notification/add', notification, { root: true })
    })
  },
  update ({ dispatch, commit }, user) {
    dispatch('activateLoading', null, { root: true })
    UserService.update(user)
      .then((response) => {
        dispatch('deactivateLoading', null, { root: true })
        if (response.status === 'Ok') {
          commit('UPDATE_USER_DATA', response.data)
          const notification = {
            type: 'success',
            title: 'Tu perfil se actualizó exitosamente!',
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return true
        } else {
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error al actualizar tus datos',
            message: response.message,
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return false
        }
      }).catch(() => {
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'error',
          title: 'Ocurrió un error al actualizar tus datos',
          message: 'Intenta nuevamente',
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
        return false
      })
  },
  updatePicture ({ commit, dispatch, state }, form) {
    dispatch('activateLoading', null, { root: true })
    UserService.updateUserPicture(form, state.user.id)
      .then((response) => {
        dispatch('deactivateLoading', null, { root: true })
        if (response.status === 'Ok') {
          commit('UPDATE_USER_DATA', response.data)
          const notification = {
            type: 'success',
            title: 'Tu perfil se actualizó exitosamente!',
            message: 'Has actualizado tu foto de perfil',
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return true
        } else {
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error al actualizar tu imagen de perfil',
            message: response.message,
            timeout: true
          }
          dispatch('notification/add', notification, { root: true })
          return false
        }
      }).catch(() => {
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'error',
          title: 'Ocurrió un error al actualizar tus datos',
          message: 'Intenta nuevamente',
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
        return false
      })
  },
  requestChangePassword ({ dispatch }, email) {
    dispatch('activateLoading', null, { root: true })
    AuthService.sendChangePasswordEmail(email)
      .then(() => {
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'success',
          title: 'Te hemos enviado un correo!',
          message: 'En el correo encontraras un enlace para reestablecer tu contraseña',
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch((e) => {
        dispatch('deactivateLoading', null, { root: true })
        const notification = {
          type: 'error',
          title: 'Ocurrió un error al enviarte correo',
          message: e.message,
          timeout: true
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchUser ({ commit }, user) {
    if (!user) {
      commit('UNSET_USER')
    }
  }
}
export const getters = {
}
