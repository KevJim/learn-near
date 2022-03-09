import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_INTERNAL_API_BASE_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getCurrencyOptions () {
    const res = await apiClient.get('currencies')
    return res.data
  },
  getPrice (currencyId, coursePrice) {
    let price
    switch (currencyId) {
      case 'ARS':
        price = coursePrice.argPrice
        break
      case 'CLP':
        price = coursePrice.chiPrice
        break
      case 'COP':
        price = coursePrice.colPrice
        break
      case 'USD':
        price = coursePrice.dlsPrice
        break
      case 'MXN':
        price = coursePrice.mxPrice
        break
      case 'PEN':
        price = coursePrice.peruPrice
        break
    }
    return price
  }
}
