import CurrencyService from '@/services/CurrencyService.js'
import AnalyticsService from '@/services/AnalyticsService.js'
export const namespaced = true

export const state = {
  cartItems: [],
  isAgift: false
}

export const mutations = {
  PUSH (state, item) {
    state.cartItems.push({
      ...item,
      // we add coupon capacity here
      coupon: {
        id: '',
        discount: 0,
        isValid: false,
        message: '',
        messageType: ''
      }
    })
    try {
      AnalyticsService.registerEvent('add_to_cart',
        {
          event_category: state.isAgift === true ? 'gift' : 'own',
          items: [
            {
              id: item.courseUri,
              name: item.name
            }
          ],
          value: item.price.dlsPrice
        })
    } catch (error) {
      console.log(error)
    }
  },
  DELETE (state, item) {
    state.cartItems = state.cartItems.filter(
      cartItem => cartItem.id !== item.id
    )
    if (state.cartItems.length === 0) { state.isAgift = false }
  },
  DELETE_BY_ID (state, itemId) {
    state.cartItems = state.cartItems.filter(
      cartItem => cartItem.courseId !== itemId
    )
    if (state.cartItems.length === 0) { state.isAgift = false }
  },
  DELETE_ALL (state) {
    state.cartItems = []
    state.isAgift = false
  },
  SET_INVALID_COUPON (state, courseId) {
    state.cartItems.forEach((item) => {
      if (item.courseId === courseId) {
        // eslint-disable-next-line no-unused-expressions
        item.coupon.id = ''
        item.coupon.discount = 0
        item.coupon.isValid = false
        item.coupon.message = ''
        item.coupon.messageType = ''
      }
    })

    /*
    var cartItem = state.cartItems.find(
      item => item.courseId === courseId
    )
    console.log(cartItem);
    cartItem.coupon.isValid = false; */
  },
  SET_AS_GIFT (state) {
    state.isAgift = true
  }
}

export const actions = {
  addItem ({ commit, dispatch, state }, item) {
    const itemIndex = state.cartItems.findIndex(cartItem => cartItem.courseId === item.courseId)
    if (itemIndex === -1) {
      if (item.isAgift === true) { commit('SET_AS_GIFT') }

      commit('PUSH', item)

      const notification = {
        type: 'success',
        title: 'Se agrego un curso al carrito',
        // message: 'Recibirás un correo para confirmar tu cuenta',
        timeout: true
      }
      dispatch('notification/add', notification, { root: true })
    } else {
      const notification = {
        type: 'warning',
        title: 'Ya existe este curso en el carrito',
        // message: 'Recibirás un correo para confirmar tu cuenta',
        timeout: true
      }
      dispatch('notification/add', notification, { root: true })
    }
  },
  removeItem ({ commit }, item) {
    commit('DELETE', item)
  },
  removeItemById ({ commit }, itemId) {
    commit('DELETE_BY_ID', itemId)
  },
  deleteAllItems ({ commit }) {
    commit('DELETE_ALL')
  },
  setCouponAsInvalid ({ commit }, courseId) {
    commit('SET_INVALID_COUPON', courseId)
  }
}

export const getters = {
  totalCartItems: (state) => {
    return state.cartItems.length
  },
  totals: state => (currencyId) => {
    let subtotal = 0
    let total = 0
    let totalWithCoupons = 0
    state.cartItems.forEach((item) => {
    /* checking course config first */
      if (isCourseFree(item.config) === true) { total += 0 } else { // is free but dates does not match
        const price = CurrencyService.getPrice(currencyId, item.price)
        const discountPercentage = item.price.discountPercentage
        subtotal += price
        let discountPrice = price
        if (discountPercentage > 0) {
          discountPrice = (price - (discountPercentage * 0.01 * price))
          total += discountPrice
        } else { total += price }

        if (item.coupon.isValid) { totalWithCoupons += (discountPrice - (item.coupon.discount * 0.01 * discountPrice)) } else { totalWithCoupons += discountPrice }
      }
    })
    return {
      subtotal,
      total,
      totalWithCoupons
    }
  }
  /* itemPrice: (state, rootGetters) => (courseId) => {
    const currency = rootGetters['currencySelected'];
    const course = state.cartItems.find(item => item.courseId === courseId);
    return CurrencyService.getPrice(currency.id, course.price);
  } */
}

function isCourseFree (courseConf) {
  if (courseConf != null && courseConf.isFree === true) {
    const today = new Date()
    const dtStart = courseConf.freeDtStart === null
      ? null
      : new Date(courseConf.freeDtStart)
    const dtEnd = courseConf.freeDtEnd === null
      ? null
      : new Date(courseConf.freeDtEnd)
    if ((dtStart === null ||
        today >= dtStart) &&
      (dtEnd === null ||
        today < dtEnd)
    ) { return true }
  }
  return false
}
