export default ($axios) => ({
  get(name) {
    return $axios.$get(`/api/v2/pages/${name}`)
  },
})
