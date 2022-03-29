export default ($axios) => ({
  getMemberBySlug(type, slug) {
    return $axios.$get(`/api/v0/priority/${type}/${slug}`)
  },
})
