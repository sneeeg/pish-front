export default ($axios) => ({
  /* Getting analytics */
  get() {
    return $axios.$get('/api/analytics')
  },

  /* Get university by id */
  getOrganizationById(id) {
    return $axios.$get('/api/organization', { params: { id } })
  },
})
