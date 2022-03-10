import Vue from 'vue'

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.eventSetDrag = function () {
      el.setAttribute('data-dragging', 'yes')
    }
    el.eventClearDrag = function () {
      el.removeAttribute('data-dragging')
    }
    el.eventOnClick = function (event) {
      const dragging = el.getAttribute('data-dragging')
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el === event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.addEventListener('touchstart', el.eventClearDrag, { passive: true })
    document.addEventListener('touchmove', el.eventSetDrag, { passive: true })
    document.addEventListener('click', el.eventOnClick, { passive: true })
    document.addEventListener('touchend', el.eventOnClick, { passive: true })
  },
  unbind (el) {
    document.removeEventListener('touchstart', el.eventClearDrag)
    document.removeEventListener('touchmove', el.eventSetDrag)
    document.removeEventListener('click', el.eventOnClick)
    document.removeEventListener('touchend', el.eventOnClick)
    el.removeAttribute('data-dragging')
  }
})
