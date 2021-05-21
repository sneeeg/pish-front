export default ($axios) => ({
  /* Getting reviews */
  get() {
    return $axios.$get('/api/reviews')
  },

  /* Getting post by slug */
  getReviewBySlug(slug) {
    return $axios.$get('/api/reviews/item', { params: { slug } })
  },
})
