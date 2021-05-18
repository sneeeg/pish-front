export default ({ app, $axios, store, $constants }) => {
  // Get sessid
  store.commit('default/setSessid', window.sessid ?? '')

  // Axios interceptors init
  $axios.interceptors.request.use((config) => {
    config.baseURL = `${window.location.origin}/`

    if (config.params) {
      Object.keys(config.params).forEach((key) => {
        if (config.params[key] === undefined) delete config.params[key]
      })
    }

    if (config.method === 'post' || config.tokenRequired)
      config.headers['X-Bitrix-Csrf-Token'] = store.state.default.sessid

    return config
  })

  $axios.interceptors.response.use((response) => {
    if (response.data.errors || response.data.errors.length) {
      const sessidError = response.data.errors.find(
        (error) => error.code === $constants.CSRF_ERROR_CODE
      )

      if (sessidError) {
        store.commit('default/setSessid', sessidError.customData.csrf)
        return Promise.reject($constants.CSRF_ERROR_CODE)
      }
    }

    return response
  })

  // Get app configuration
  return store.dispatch('default/getConfig', app.i18n.locale)
}
