export default ($axios) => ({
  /* Getting comments */
  get(categoryId, page = 1, count = 4, tag = undefined) {
    return $axios.$get('/api/comments', {
      params: { categoryId, page, count, tag },
    })
  },

  /* Getting comment by slug */
  getCommentBySlug(slug) {
    return $axios.$get('/api/comments/item', { params: { slug } })
  },
})
