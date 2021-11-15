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
    return process.env.NODE_ENV === 'production'
      ? $axios.$get(`https://lk.priority2030.ru/api/v0/priority/${id}/info`, {
          mode: 'cors',
        })
      : $axios.$get('/api/organization', { params: { id } })
  },

  /* Get university indicators by id */
  getIndicatorsById(id) {
    if (process.env.NODE_ENV === 'development') {
      return $axios.$get('/api/indicators', { params: { id } })
    }

    return $axios.$get(
      `https://lk.priority2030.ru/api/v0/priority/${id}/indicators`,
      {
        mode: 'cors',
      }
    )
  },
})
