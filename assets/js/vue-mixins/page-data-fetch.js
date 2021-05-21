export default {
  async asyncData({ store, $api }) {
    const pageName = store.state.default.routing.currentPageName
    const apiMethod = $api.pages[pageName]

    if (!apiMethod) return { page: {} }

    const page = await apiMethod().then(({ data }) => data)

    return { page }
  },
}
