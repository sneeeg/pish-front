export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    store.commit('default/changeRoutingState', { to, from })
    next()
  })
}
