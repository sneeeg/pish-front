import Vue from 'vue'
import willChange from '~/assets/js/vue-directives/will-change'
import scrollElement from '~/assets/js/vue-directives/scroll-element'

/**
 * Will change directive
 */
Vue.directive('will-change', {
  bind: willChange,
})

/**
 * Scroll element directives
 */
Vue.directive('scroll-element', {
  bind: scrollElement,
})
