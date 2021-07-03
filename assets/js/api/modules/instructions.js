export default ($axios) => ({
  /* Getting instructions */
  get(categoryId = undefined, page = 1, count = 99, tag = undefined) {
    return $axios.$get('/api/instructions', {
      params: { categoryId, page, count, tag },
    })
  },
})
