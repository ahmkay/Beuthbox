
module.exports = {

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3333/dashboard',
    // apiUrl: process.env.API_URL || 'http://localhost:8888',
    // frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080'
    apiUrl: process.env.API_URL || 'http://beuthbox.beuth-hochschule.de/api',
    frontendUrl: process.env.FRONTEND_URL || 'http://beuthbox.beuth-hochschule.de'
  },
  /*http://beuthbox.beuth-hochschule.de/api
  ** Headers of the page
  */
  head: {
    title: 'Beuthbox Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Dashboard für die Beuthbox' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/dashboard/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  router: {
    middleware: 'check-auth',
    base: '/dashboard/'
  },
  plugins: [
    '~/plugins/vuetify.js',
    '~plugins/filters.js',
    { src: '~/plugins/clipboard', ssr: false }
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /* 
  ** Customize the progress bar color
  */
  loading: { color: '#00a5a5' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'axios'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/,
    //       options : {
    //         fix : true
    //     }
    //     })
    //   }
    // }
  }
}
