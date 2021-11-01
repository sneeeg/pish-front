export default ($axios) => ({
  /* Getting analytics */
  get() {
    return process.env.NODE_ENV === 'production'
      ? $axios.$get('https://lk.priority2030.ru/api/v0/priority/list', {
          mode: 'cors',
        })
      : $axios.$get('/api/analytics')
  },

  /* Get university by id */
  getOrganizationById(id) {
    return $axios.$get('/api/organization', { params: { id } })
  },
})
