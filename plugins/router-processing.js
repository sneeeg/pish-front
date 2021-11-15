import appContentDisappear from '~/assets/js/composables/animations/app-content-disappear'

export default ({ app, store, $motion, $utils, $constants }) => {
  app.router.beforeEach((to, from, next) => {
    // Activate page loading
    const toMatchedPath = $utils.getPageNameByRoute(to?.matched[0]?.path || '')
    const fromMatchedPath = $utils.getPageNameByRoute(
      from?.matched[0]?.path || ''
    )

    if (
      toMatchedPath &&
      toMatchedPath !== fromMatchedPath &&
      $constants.PAGE_PATHS_WITH_LOADING.includes(toMatchedPath)
    ) {
      store.dispatch('default/togglePageLoading', true)
    }

    if (store.state.menu.isActive) {
      store.dispatch('menu/close')
    }

    if (!to.name) {
      next()
      return
    }

    store.commit('default/changeRoutingState', { to, from })

    const hasHistory =
      store.state.default.routing.hasHistory && document.getElementById('app')

    if (hasHistory || store.state.default.onErrorPage) {
      store.commit('default/changeErrorPageState', false)

      appContentDisappear()
        .then(() => {
          const toLocale = to.name.slice(-2, to.name.length)
          const fromLocale = from?.name?.slice(-2, from.name.length) || toLocale

          const toNames = to.name.split('___')[0].split('-')
          if (
            toLocale !== fromLocale &&
            toNames[0] === 'news' &&
            toNames[toNames.length - 1] === 'post'
          ) {
            const redirectName =
              toNames.slice(0, -1).join('-') + `___${toLocale}`

            app.router.replace({ name: redirectName })
          }

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

  app.router.afterEach((to) => {
    // Deactivate page loading
    store.dispatch('default/togglePageLoading', false)
  })
}
