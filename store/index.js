import CurrencyService from '@/services/CurrencyService'

// import CreatePersistedState from 'vuex-persistedstate'
// const persistent = new CreatePersistedState({
//   paths: ['user', 'shoppingCart', 'course', 'tutorial']
// })
// plugins: [persistent],

export const state = () => ({
  // review
  isLoading: false,
  defaultCurrency: 'USD',
  currencyOptions: [
    {
      id: 'USD',
      imgSrc: 'https://cdn.ockham.education/img/site/USD.svg',
      content: 'USD',
      selected: true
    }
  ],
  /*
      {
        id: 'MXN',
        imgSrc: '/img/icons/currency/MXN.svg',
        selected: true,
        content: 'MXN',
      },
      {
        id: 'USD',
        imgSrc: '/img/icons/currency/USD.svg',
        selected: false,
        content: 'USD',
      },
      {
        id: 'ARS',
        imgSrc: '/img/icons/currency/ARS.svg',
        selected: false,
        content: 'ARS',
      },
      {
        id: 'CLP',
        imgSrc: '/img/icons/currency/CLP.svg',
        selected: false,
        content: 'CLP',
      },
      {
        id: 'COP',
        imgSrc: '/img/icons/currency/COP.svg',
        selected: false,
        content: 'COP',
      },
      {
        id: 'PEN',
        imgSrc: '/img/icons/currency/PEN.svg',
        selected: false,
        content: 'PEN',
      },
    ], */

  navSearchValue: '',
  logoResources: {
    horizontalSrc: `${process.env.VUE_APP_CDN_BASE_URL}site/logo-horizontal.svg`,
    horizontalWhiteSrc: `${process.env.VUE_APP_CDN_BASE_URL}site/logo-horizontal-white.svg`,
    onlyIconSrc: `${process.env.VUE_APP_CDN_BASE_URL}site/logo-short.svg`,
    alt: 'Ockham Education',
    socialMedia: `${process.env.VUE_APP_CDN_BASE_URL}site/social-network-flyer.png`
  }
})

export const mutations = { // SYNC
  SET_CURRENCY_OPTS (state, opts) {
    state.currencyOptions = []
    opts.forEach((opt) => {
      if (opt.active) {
        const obj = {
          id: opt.key,
          imgSrc: opt.flag,
          content: opt.key,
          selected: opt.key === state.defaultCurrency
        }
        state.currencyOptions.push(obj)
      }
    })
  },
  CHANGE_CURRENCY_SELECTED (state, id) {
    state.currencyOptions.forEach((opt) => {
      opt.selected = false
      if (opt.id === id) { opt.selected = true }
    })
  },
  UPDATE_NAV_SEARCH (state, val) {
    state.navSearchValue = val
  },
  LOADING (state) {
    state.isLoading = true
  },
  STOP_LOADING (state) {
    state.isLoading = false
  }
}
export const actions = { // ASYNC
  // REVIEW
  setCurrencyOptions ({ commit }) {
    CurrencyService.getCurrencyOptions().then((res) => {
      if (res.status === 'Ok') {
        commit('SET_CURRENCY_OPTS', res.data)
      }
    })
  },
  updateCurrencyOptions ({ commit }, currencySelectedId) {
    commit('CHANGE_CURRENCY_SELECTED', currencySelectedId)
  },
  updateNavSearchValue ({ commit }, val) {
    commit('UPDATE_NAV_SEARCH', val)
  },
  activateLoading ({ commit }) {
    commit('LOADING')
  },
  deactivateLoading ({ commit }) {
    commit('STOP_LOADING')
  },
  disableCurrencyTutorial ({ commit }) {
    commit('DISABLE_CURRENCY_TUTORIAL')
  }
}
export const getters = {
  currencySelected: (state) => {
    if (state.currencyOptions.length > 0) { return state.currencyOptions.find(opt => opt.selected) }
  },
  currencyNotSelected: (state) => {
    return state.currencyOptions.filter(opt => !opt.selected)
  }
}
