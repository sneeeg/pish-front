export default ($axios) => ({
  /* Getting posts */
  get(categoryId, page = 1, count = 4, tag = undefined) {
    return $axios.$get('/api/posts', {
      params: { categoryId, page, count, tag },
    })
  },

  /* Getting post by slug */
  getPostBySlug(slug) {
    return $axios.$get('/api/posts/item', { params: { slug } })
  },

  /* Getting university posts  */
  getUniversityPosts(categoryId, page = 1, count = 4, tag = undefined) {
    return $axios.$get('/api/university', {
      params: { categoryId, page, count, tag },
    })
  },

  /* Getting university post by slug */
  getUniversityPostBySlug(slug) {
    return $axios.$get('/api/university/item', { params: { slug } })
  },
})
