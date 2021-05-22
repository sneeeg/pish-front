export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    store.commit('default/changeRoutingState', { to, from })

    if (store.state.menu.isActive) {
      store.dispatch('menu/close')
    }

    next()
  })
}
