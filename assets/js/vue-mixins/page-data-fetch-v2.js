export default {
  async asyncData({ route, $api, error }) {
    try {
      const pageName = route.name.replace(/__.*/gm, '')

      const page = await $api.pages2.get(pageName).then(({ data }) => data)

      if (!page) {
        throw new Error('Page not found')
      }

      return { page }
    } catch (e) {
      error({ statusCode: 404, message: e })
    }
  },
}
