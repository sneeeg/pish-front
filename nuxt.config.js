/* Imports */
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
    // CSS files

    // SCSS files
    '~/assets/scss/common.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/injections.js',
    '~/plugins/server.js',
    '~/plugins/config.js',
    '~/plugins/responsive.js',
    '~/plugins/scroll.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

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
  ],

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
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },

  loading: false,
}
