export default {
  async asyncData({ route, $api }) {
    let pageName = route.path.split('/')[1]
    if (pageName === '') {
      pageName = 'main'
    }
    const page = await $api.pages[pageName]().then(({ data }) => data)

    return { page }
  },
}
