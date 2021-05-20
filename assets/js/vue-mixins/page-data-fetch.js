export default {
  async asyncData({ route, $api }) {
    const str = route.name.split('_')[0]
    const pageName = str === 'index' ? 'main' : str
    const page = await $api.pages[pageName]().then(({ data }) => data)

    return { page }
  },
}
