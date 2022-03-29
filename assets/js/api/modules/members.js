export default ($axios) => ({
  getMemberBySlug(type, slug) {
    const baseBath =
      process.env.NODE_ENV === 'production' ? 'https://lk.priority2030.ru' : ''

    return $axios.$get(`${baseBath}/api/v0/priority/${type}/${slug}`)
  },
})
