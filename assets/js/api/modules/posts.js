export default ($axios) => ({
  /* Getting posts */
  get(categoryId, page = 1, count = 4) {
    return $axios.$get('/api/posts', { params: { categoryId, page, count } })
  },

  /* Getting post by slug */
  getPostBySlug(slug) {
    return $axios.$get('/api/posts/item', { params: { slug } })
  },

  /* Getting university posts  */
  getUniversityPosts() {
    return $axios.$get('/api/posts/university')
  },

  /* Getting university post by slug */
  getUniversityPostBySlug(slug) {
    return $axios.$get('/api/posts/university/item', { params: { slug } })
  },
})
