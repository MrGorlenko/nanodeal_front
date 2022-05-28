require('dotenv').config()

const config = {
  'api-protocol': process.env.BACKEND_PROTOCOL,
  'api-path': process.env.BACKEND_API,
  'api-port': process.env.BACKEND_PORT,
}

Object.assign(config, {
  'api-path': `${config['api-protocol']}://${config['api-path']}:${config['api-port']}`,
})

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  head: {
    title: 'nanodeal',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.scss'],

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },

  env: {
    'api-path': config['api-path'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-js-modal.js',
    '~/plugins/vue-agile',
    { src: '~plugins/vue-carousel', ssr: true },
    { src: '~/plugins/persistedState.client.js' },
    { src: '~/plugins/google-maps', ssr: true },
    { src: '~/plugins/vue-countdown', ssr: true },
    // { src: '~/plugins/vue-datepicker', ssr: false },
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: config['api-path'],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'vue-screen/nuxt',
    'cookie-universal-nuxt',
  ],

  // ssr
  ssr: false,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[local]__[hash:base64:4]',
        },
      },
    },
    transpile: [
      'vue-upload-drop-images',
      'vue-agile',
      /^vue2-google-maps($|\/)/,
    ],
    /* eslint-disable-next-line */
    extend(config, {}) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
