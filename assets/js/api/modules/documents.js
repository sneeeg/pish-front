export default ($axios) => ({
  getDocumentPageByName(name) {
    return $axios.$get('/api/documents', { params: { name } })
  },
})
