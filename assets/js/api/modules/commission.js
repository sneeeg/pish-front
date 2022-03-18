export default ($axios) => ({
  getExpertBySlug(slug) {
    return $axios.$get('/api/commission/expert', { params: { slug } })
  },
})
