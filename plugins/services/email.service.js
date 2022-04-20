
export class EmailService {
  constructor ($axios) {
    this.$axios = $axios
  }

  sendEmail (req) {
    return this.$axios.post('email', req)
  }
}
