export default {
  async asyncData({ route, $api }) {
    const pageName = route.path.split('/')[1]
    const page = await $api.pages[pageName]().then(({ data }) => data)

    return { page }
  },
}
