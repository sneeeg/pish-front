export default {
  async asyncData({ store, $api }) {
    const pageName = store.state.default.routing.currentPageName.split('-')[0]

    const apiMethod = $api.pages[pageName]

    if (!apiMethod) return { page: {} }

    const page = await apiMethod().then(({ data }) => data)

    console.log(page)

    return { page }
  },
}
