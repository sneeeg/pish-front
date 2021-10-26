export default ($axios) => ({
  /* Getting analytics */
  get() {
    return $axios.$get('/api/analytics')
  },
})
