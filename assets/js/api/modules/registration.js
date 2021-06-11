export default ($axios) => ({
  /* Send form */
  sendForm(data) {
    return $axios.$post('/api/registration', data)
  },
})
