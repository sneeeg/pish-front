export default ($axios) => ({
  /* Get categories */
  getCategories() {
    return $axios.$get('/api/faq', {
      params: { categoryId: -1, count: 9999 },
    })
  },

  /* Send form */
  sendForm(data) {
    return $axios.$post('/api/sendQuestion', data)
  },
})
