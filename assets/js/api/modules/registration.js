export default ($axios) => ({
  /* Send form */
  sendForm(data) {
    return $axios.$post('/api/registration', data)
  },

  /* Search university */
  searchUniversity(searchRequest) {
    return $axios.$get('/api/university', {
      params: { request: searchRequest },
    })
  },
})
