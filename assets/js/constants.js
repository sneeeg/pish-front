const RESIZE_DEBOUNCE = 300
const SCROLL_THROTTLE = 100
const TABLET_WIDTH = 1023
const MOBILE_WIDTH = 767

const CSRF_ERROR_CODE = 'invalid_csrf'

const POST_DATE_FORMAT = 'D MMMM'

const COLORS = [
  '#F32735',
  '#001B71',
  '#7B91D7',
  '#383A3F',
  '#A6101A',
  '#3B57AF',
  '#6C6E75',
  '#B3B2B2',
]

const GET_OPACITY_COLORS = (alpha = 0.5) =>
  COLORS.map(
    (hex) =>
      `${hex}${Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, 0)}`
  )

const PAGES = [
  'main',
  'about',
  'news',
  'participation',
  'registration',
  'documents',
  'contacts',
  'participants',
  'faq',
  'instructions',
  'universities',
  'commission',
  'council',
  'questionnaire',
  'analytics',
]

const PAGE_PATHS_WITH_LOADING = [
  '/analytics/:id/program',
  '/analytics/:id/about',
]

export {
  RESIZE_DEBOUNCE,
  SCROLL_THROTTLE,
  TABLET_WIDTH,
  MOBILE_WIDTH,
  CSRF_ERROR_CODE,
  POST_DATE_FORMAT,
  COLORS,
  PAGES,
  PAGE_PATHS_WITH_LOADING,
  GET_OPACITY_COLORS,
}
