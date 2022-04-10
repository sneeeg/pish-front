const baseBath =
  process.env.NODE_ENV === 'production' ? 'https://lk.priority2030.ru' : ''

export default ($axios) => ({
  getMemberBySlug(type, slug) {
    return $axios.$get(`${baseBath}/api/v0/priority/${type}/${slug}`)
  },

  getList(type) {
    return $axios.$get(`${baseBath}/api/v0/priority/expert/list`, {
      params: { type },
    })
  },
})
