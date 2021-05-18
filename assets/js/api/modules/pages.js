export default ($axios) => ({
  /* Getting main page */
  main() {
    return $axios.$get('/api/pages/main')
  },

  /* Getting about page */
  about() {
    return $axios.$get('/api/pages/about')
  },

  /* Getting news page */
  news() {
    return $axios.$get('/api/pages/news')
  },

  /* Getting participation page */
  participation() {
    return $axios.$get('/api/pages/participation')
  },
})
