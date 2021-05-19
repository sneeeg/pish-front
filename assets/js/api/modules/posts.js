export default ($axios) => ({
  /* Getting posts */
  get(categoryId, page = 1, count = 4) {
    return $axios.$get('/api/posts', { params: { categoryId, page, count } })
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
