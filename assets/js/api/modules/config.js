export default ($axios) => ({
  /* Getting app configuration */
  get() {
    return $axios.$get('/api/config')
  },
})
