export default {
  async asyncData({ store, $api, error }) {
    try {
      const pageName = store.state.default.routing.currentPageName.split('-')[0]

      const apiMethod = $api.pages[pageName]

      if (!apiMethod) return { page: {} }

      const page = await apiMethod().then(({ data }) => data)

      if (!page) {
        throw new Error('Page not found')
      }

      return { page }
    } catch (e) {
      error({ statusCode: 404, message: e })
    }
  },
}
