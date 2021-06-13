/* eslint-disable nuxt/no-cjs-in-config */

/* Imports */

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title:
      'ПРИОРИТЕТ–2030 | Единая программа государственной поддержки университетов Российской Федерации',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'title',
        name: 'title',
        content:
          'ПРИОРИТЕТ–2030 | Единая программа государственной поддержки университетов Российской Федерации',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Единая программа государственной поддержки университетов Россииской Федерации в целях реализации прорывных проектов, направленных на научно-технологическое развитие страны',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://priority2030.ru/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content:
          'ПРИОРИТЕТ–2030 | Единая программа государственной поддержки университетов Российской Федерации',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Единая программа государственной поддержки университетов Россииской Федерации в целях реализации прорывных проектов, направленных на научно-технологическое развитие страны',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://priority2030.ru/fb.jpg',
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: 'https://priority2030.ru/',
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content:
          'ПРИОРИТЕТ–2030 | Единая программа государственной поддержки университетов Российской Федерации',
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content:
          'Единая программа государственной поддержки университетов Россииской Федерации в целях реализации прорывных проектов, направленных на научно-технологическое развитие страны',
      },
      {
        hid: 'twitter:image',
        property: 'og:image',
        content: 'https://priority2030.ru/fb.jpg',
      },
      {
        hid: 'vk:image',
        property: 'og:image',
        content: 'https://priority2030.ru/vk.jpg',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Priority2030',
      },
      {
        name: 'application-name',
        content: 'Priority2030',
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffffff',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#ca182e',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // Node.js modules
    'normalize.css',
    'flickity/css/flickity.css',
    'vue-select/dist/vue-select.css',
    // CSS files

    // SCSS files
    '~/assets/scss/common.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/svg4everybody.js',
    '~/plugins/injections.js',
    '~/plugins/directives.js',
    '~/plugins/server.js',
    '~/plugins/config.js',
    '~/plugins/responsive.js',
    '~/plugins/scroll.js',
    '~/plugins/mouse.js',
    '~/plugins/motion.js',
    '~/plugins/vue-check-view',
    '~/plugins/vue-select',
    '~/plugins/router-processing.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    'nuxt-compress',
  ],

  'nuxt-compress': {
    brotli: {
      threshold: 999999999, // disable Brotli
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ru',
            iso: 'ru',
          },
          {
            code: 'en',
            iso: 'en',
          },
        ],
        defaultLocale: 'ru',
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/dayjs',
    'vue-scrollto/nuxt',
    '@nuxtjs/yandex-metrika',
  ],

  yandexMetrika: {
    id: '80378578',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  },

  dayjs: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
  },

  svgSprite: {
    input: '~/assets/i/sprite/svg',
    output: '~/assets/i/sprite/gen',
  },

  styleResources: {
    scss: ['~/assets/scss/utils/**/*.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },

  loading: false,
}
