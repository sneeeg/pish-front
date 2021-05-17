export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    next()
  })
}
