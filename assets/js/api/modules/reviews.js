export default ($axios) => ({
  /* Getting reviews */
  get(categoryId, page = 1, count = 4) {
    return $axios.$get('/api/reviews', { params: { categoryId, page, count } })
  },

  /* Getting post by slug */
  getReviewBySlug(slug) {
    return $axios.$get('/api/reviews/item', { params: { slug } })
  },
})
