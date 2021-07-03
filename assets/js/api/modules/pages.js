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

  /* Getting registration */
  registration() {
    return $axios.$get('/api/pages/registration')
  },

  /* Getting documents page */
  documents() {
    return $axios.$get('/api/pages/documents')
  },

  /* Getting contacts page */
  contacts() {
    return $axios.$get('/api/pages/contacts')
  },

  /* Getting participants page */
  participants() {
    return $axios.$get('/api/pages/participants')
  },

  /* Instructions */
  instructions() {
    return $axios.$get('/api/pages/instructions')
  },

  /* Getting universities page */
  universities() {
    return $axios.$get('/api/pages/universities')
  },

  /* Get document page by name */
  getDocumentPageByName(name) {
    return $axios.$get('/api/documents', { params: { name } })
  },
})
