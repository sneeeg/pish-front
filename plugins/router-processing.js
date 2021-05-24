import appContentDisappear from '~/assets/js/composables/animations/app-content-disappear'

export default ({ app, store, $motion }) => {
  app.router.beforeEach((to, from, next) => {
    store.commit('default/changeRoutingState', { to, from })

    const hasHistory = store.state.default.routing.hasHistory

    if (store.state.menu.isActive) {
      store.dispatch('menu/close')
    }

    if (hasHistory) {
      appContentDisappear()
        .then(() => {
          return (
            $motion?.changePreset(
              store.state.default.routing.currentPageName
            ) || Promise.resolve()
          )
        })
        .then(() => {
          next()
        })
    } else {
      next()
    }

    next()
  })
}
