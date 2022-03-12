export default ($axios) => ({
  getBySlug(slug) {
    return $axios.$get('/api/forms/item', {
      params: { slug },
    })
  },
})
