export default ($axios) => ({
  /* Getting reviews */
  get(categoryId, page = 1, count = 4, tag = undefined) {
    return $axios.$get('/api/reviews', {
      params: { categoryId, page, count, tag },
    })
  },

  /* Getting post by slug */
  getReviewBySlug(slug) {
    return $axios.$get('/api/reviews/item', { params: { slug } })
  },
})
