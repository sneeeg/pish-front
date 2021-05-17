/* Constants */
import * as constants from '~/assets/js/constants'

/* Composables */

/* Utils */
import delay from '~/assets/js/utils/delay'
import cloneObject from '~/assets/js/utils/clone-object'
import containLetter from '~/assets/js/utils/contain-letter'
import createUid from '~/assets/js/utils/create-Uid'
import fillEmptyArray from '~/assets/js/utils/fill-empty-array'
import isInViewport from '~/assets/js/utils/is-in-viewport'
import isObjectEmpty from '~/assets/js/utils/is-object-empty'

/* API */
import config from '~/assets/js/api/config'

export default (context, inject) => {
  inject('constants', constants)
  inject('composables', {})
  inject('utils', {
    delay,
    cloneObject,
    containLetter,
    createUID: createUid,
    fillEmptyArray,
    isInViewport,
    isObjectEmpty,
  })
  inject('api', {
    config,
  })
}
