export class UserService {
  constructor ($axios, store) {
    this.$axios = $axios
    this.$store = store
  }

  async update (user) {
    const response = await this.updateUser(user)
    return response.data
  }

  async updateUserPicture (form, userId) {
    const response = await this.updateUserPictureCall(form, userId)
    return response.data
  }

  async updateUserPictureCall (form, userId) {
    try {
      const authToken = this.$store.state.user.authToken ?? null
      console.log(form)
      const data = await this.$axios.post('students/' + userId,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + authToken
          }
        })
      return data
    } catch (e) {
      console.log('FAILURE!!' + e)
      return e
    }
  }

  updateUser (user) {
    const userId = user.id
    const authToken = this.$store.state.user.authToken ?? null

    return this.$axios.put('students/' + userId, user, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  }
}
