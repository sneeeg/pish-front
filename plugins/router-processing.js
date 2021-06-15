import appContentDisappear from '~/assets/js/composables/animations/app-content-disappear'

export default ({ app, store, $motion }) => {
  app.router.beforeEach((to, from, next) => {
    if (store.state.menu.isActive) {
      store.dispatch('menu/close')
    }

    if (!to.name) {
      next()
      return
    }

    store.commit('default/changeRoutingState', { to, from })

    const hasHistory = store.state.default.routing.hasHistory

    if (hasHistory || store.state.default.onErrorPage) {
      store.commit('default/changeErrorPageState', false)

      appContentDisappear()
        .then(() => {
          const toLocale = to.name.slice(-2, to.name.length)
          const fromLocale = from.name.slice(-2, from.name.length)

          const localeSwitch =
            toLocale !== fromLocale
              ? store.dispatch('default/getConfig', toLocale)
              : Promise.resolve()

          const motionSwitch =
            $motion?.changePreset(
              store.state.default.routing.currentPageName
            ) || Promise.resolve()

          return Promise.all([localeSwitch, motionSwitch])
        })
        .then(() => {
          next()
        })
    } else {
      next()
    }
  })
}
