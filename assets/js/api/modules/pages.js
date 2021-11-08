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

  /* Getting FAQ page */
  faq() {
    return $axios.$get('/api/pages/faq')
  },

  /* Instructions */
  instructions() {
    return $axios.$get('/api/pages/instructions')
  },

  /* Getting universities page */
  universities() {
    return $axios.$get('/api/pages/universities')
  },

  /* Getting commission */
  commission() {
    return $axios.$get('/api/pages/commission')
  },

  /* Getting council */
  council() {
    return $axios.$get('/api/pages/council')
  },

  /* Getting questionnaire */
  questionnaire() {
    return $axios.$get('/api/pages/questionnaire')
  },

  /* Getting analytics */
  analytics() {
    return $axios.$get('/api/pages/analytics')
  },

  /* Get document page by name */
  getDocumentPageByName(name) {
    return $axios.$get('/api/documents', { params: { name } })
  },
})
