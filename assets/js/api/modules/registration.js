export default ($axios) => ({
  /* Send form */
  sendForm(data) {
    return $axios.$post('/api/registration', data)
  },

  /* Search university */
  searchUniversity() {
    return $axios.$get('/api/university')
  },
})
