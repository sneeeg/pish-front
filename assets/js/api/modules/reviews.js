export default ($axios) => ({
  /* Getting reviews */
  get() {
    return $axios.$get('/api/reviews')
  },
})
