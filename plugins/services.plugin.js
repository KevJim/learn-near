import { CourseService } from './services/course.service'

export default ({ app: { $axios, store } }, inject) => {
  // pass $axios as a dependency to the constructor
  const course = new CourseService($axios, store)

  // inject the service, making it available in the context, component, store, etc.
  inject('course', course)
}
