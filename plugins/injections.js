/* Constants */
import * as constants from '~/assets/js/constants'

/* Composables */
import deleteLastBrs from '~/assets/js/composables/delete-last-brs'

/* Utils */
import delay from '~/assets/js/utils/delay'
import cloneObject from '~/assets/js/utils/clone-object'
import containLetter from '~/assets/js/utils/contain-letter'
import createUid from '~/assets/js/utils/create-Uid'
import fillEmptyArray from '~/assets/js/utils/fill-empty-array'
import isInViewport from '~/assets/js/utils/is-in-viewport'
import isObjectEmpty from '~/assets/js/utils/is-object-empty'
import getUniqueArrayOfObjects from '~/assets/js/utils/get-unique-array-of-objects'
import getPageNameByRoute from '~/assets/js/utils/get-page-name-by-route'
import scrollCenterDetection from '~/assets/js/utils/scroll-center-detection'
import formatBytes from '~/assets/js/utils/format-bytes'

/* API */
import api from '~/assets/js/api/index'

export default ({ $axios }, inject) => {
  inject('constants', constants)
  inject('composables', {
    deleteLastBrs,
  })
  inject('utils', {
    delay,
    cloneObject,
    containLetter,
    createUID: createUid,
    fillEmptyArray,
    isInViewport,
    isObjectEmpty,
    getUniqueArrayOfObjects,
    getPageNameByRoute,
    scrollCenterDetection,
    formatBytes,
  })
  inject('api', api($axios))
}
