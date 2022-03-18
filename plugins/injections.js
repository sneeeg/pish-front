/* Constants */
import * as constants from '~/assets/js/constants'

/* Composables */
import deleteLastBrs from '~/assets/js/composables/delete-last-brs'
import removeEmptyNodes from '~/assets/js/composables/remove-empty-nodes'

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
import hexToRgb from '~/assets/js/utils/hex-to-rgb'
import getFileFormat from '~/assets/js/utils/get-file-format'
import wrapTable from '~/assets/js/utils/wrap-table'

/* API */
import api from '~/assets/js/api/index'
import getRandomInteger from '~/assets/js/utils/get-random-integer'

export default ({ $axios }, inject) => {
  inject('constants', constants)
  inject('composables', {
    deleteLastBrs,
    removeEmptyNodes,
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
    getRandomInteger,
    hexToRgb,
    getFileFormat,
    wrapTable,
  })
  inject('api', api($axios))
}
