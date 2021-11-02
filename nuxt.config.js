/* eslint-disable nuxt/no-cjs-in-config */

/* Imports */
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const head = require('./nuxt-config/head')

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head,

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
    '~/plugins/charts.js',
    '~/plugins/vuetify.js',
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
        detectBrowserLanguage: false,
        baseUrl: 'https://priority2030.ru',
      },
    ],
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/dayjs',
    'vue-scrollto/nuxt',
    '@nuxtjs/yandex-metrika',
    'portal-vue/nuxt',
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
    extend(config, ctx) {
      config.plugins.push(new VuetifyLoaderPlugin())
    },
  },

  loading: false,
}
