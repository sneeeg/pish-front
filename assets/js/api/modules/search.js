export default ($axios) => ({
  post(formData) {
    return $axios.$post('/api/search', formData)
  },
})
