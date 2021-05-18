export default ($axios) => ({
  /* Getting posts */
  get(page = 1, count = 4) {
    return $axios.$get('/api/posts', { params: { page, count } })
  },

  /* Getting university categories  */
  getUniversityPosts() {
    return $axios.$get('/api/posts/university')
  },

  /* Getting posts categories  */
  getCategories() {
    return $axios.$get('/api/posts/categories')
  },
})
