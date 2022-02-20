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

const YANDEX_FORMS = {
  module: 'https://yastatic.net/s3/frontend/forms/_/embed.js',

  items: [
    {
      src: 'https://forms.yandex.ru/cloud/61f237c18140b677042b3ca1/?iframe=1',
      name: 'ya-form-61f237c18140b677042b3ca1',
      title: 'Анкета обратной связи для участников',
      slug: 'feedback-participants',
    },
    {
      src: 'https://forms.yandex.ru/cloud/61f24c73d5d1807c8980cb01/?iframe=1',
      name: 'ya-form-61f24c73d5d1807c8980cb01',
      title: 'Анкета обратной связи для экспертов',
      slug: 'feedback-experts',
    },
    {
      src: 'https://forms.yandex.ru/cloud/620dda5d6bdda40f11173f0c/?iframe=1',
      name: 'ya-form-620dda5d6bdda40f11173f0c',
      title: 'Анкета обратной связи для участников стратегической сессии',
      slug: 'feedback-project-participants',
    },
    {
      src: 'https://forms.yandex.ru/u/620fe3529c18c667fe0adeb8/?iframe=1',
      name: 'ya-form-620fe3529c18c667fe0adeb8',
      title:
        'Анкета обратной связи для участников аналитической сессии «Поступление в вуз онлайн»: сквозной аудит»',
      slug: 'feedback-session',
    },
  ],
}

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
  YANDEX_FORMS,
}
