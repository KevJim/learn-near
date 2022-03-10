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
// console.log(store.state.user);
export default {
  getCoursesHome () {
    return apiClient.get('courses/home/')
  },
  /**
   * If authToken is valid, validates and set if isBought and isFavorite
   * @param req = {
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          category: this.categorySelected ? this.categorySelected.code : null,
          level: this.levelSelected ? this.levelSelected.code : null,
          type: this.typeSelected ? this.typeSelected.code : null,
          search: this.searchValue,
        }
  **/
  getCourses (req) {
    const authToken = store.state.user.authToken ?? null
    if (authToken != null) {
      return apiClient.post('courses/', req,
        {
          headers: {
            Authorization: 'Bearer ' + authToken
          }
        })
    } else {
      return apiClient.post('courses/', req)
    }
  },

  /*
  these functions are not used
  getCourse(uri){
    const authToken = store.state.user.authToken ?? null;
    if(authToken != null){
      return apiClient.get('courses/' + uri, {
        headers:{
          'Authorization': 'Bearer '+ authToken
        },
      });
    }else{
      return apiClient.get('courses/' + uri);
    }
  },
  getCourseDetail(courseUri){
    const authToken = store.state.user.authToken ?? null;
    const uri = `courses/${courseUri}/details`;
    if(authToken != null){
      return apiClient.get(uri, {
        headers:{
          'Authorization': 'Bearer '+ authToken
        },
      });
    }else{
      return apiClient.get(uri);
    }
  },
  getCourseModules(courseId){
    const authToken = store.state.user.authToken ?? null;
    const uri = `courses/${courseId}/modules`;
    if(authToken != null){
      return apiClient.get(uri, {
        headers:{
          'Authorization': 'Bearer '+ authToken
        },
      });
    }else{
      return apiClient.get(uri);
    }
  }, */

  getAllCourse (uri) {
    const authToken = store.state.user.authToken ?? null
    if (authToken != null) {
      return apiClient.get('courses/full/' + uri, {
        headers: {
          Authorization: 'Bearer ' + authToken
        }
      })
    } else {
      return apiClient.get('courses/full/' + uri)
    }
  },
  getCategories () {
    return apiClient.get('categories')
  },
  getCategoryCarousels () {
    return apiClient.get('courses/carousels')
  },
  setCourseRating (courseUri, rating) {
    const authToken = store.state.user.authToken ?? null
    return apiClient.post(`courses/${courseUri}/scores`, rating, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
  }

}
