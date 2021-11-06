import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import '~/assets/scss/common/vuetify.scss'

Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify()

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
