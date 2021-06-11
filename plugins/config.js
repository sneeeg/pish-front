const ERROR_CODE = 'invalid_csrf'

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

  $axios.interceptors.response.use(
    (response) => {
      if (response.data.errors && response.data.errors.length) {
        const csrfError = response.data.errors.find(
          (error) => error.code === ERROR_CODE
        )

        if (csrfError) {
          store.commit('default/setSessid', csrfError.customData.csrf)

          response.config.headers['X-Bitrix-Csrf-Token'] =
            store.state.Default.sessid
          return $axios(response.config)
        }
      }

      return response
    },
    (error) => {
      if (error.response.status === 401) {
        const csrfError = error.response.data.errors.find(
          (error) => error.code === ERROR_CODE
        )

        if (csrfError) {
          store.commit('default/setSessid', csrfError.customData.csrf)

          error.config.headers['X-Bitrix-Csrf-Token'] =
            store.state.Default.sessid
          return $axios(error.config)
        }
      }
    }
  )

  // Get app configuration
  return store.dispatch('default/getConfig', app.i18n.locale)
}
