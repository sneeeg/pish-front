export default ($axios) => ({
  /* Getting search results */
  getResults(request) {
    return $axios.$get('/api/search', { params: { request } })
  },
})
