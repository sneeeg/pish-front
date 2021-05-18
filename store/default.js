export const state = () => ({
  siteId: '',
  sessid: '',
  settings: {},
  lang: {},
  menus: [],
})

export const mutations = {
  setSiteId(state, siteId) {
    state.siteId = siteId
  },
  setSessid(state, sessid) {
    state.sessid = sessid
  },
  setSettings(state, settings) {
    state.settings = settings
  },
  setLang(state, lang) {
    state.lang = lang
  },
  setMenus(state, menus) {
    state.menus = menus
  },
}

export const actions = {
  async getConfig({ state, commit }, locale) {
    commit('setSiteId', window.siteId[locale])
    this.$axios.defaults.headers.common['X-Bitrix-Site-Id'] = state.siteId

    const data = await this.$api.config.get()
    commit('setSettings', data.settings)
    commit('setLang', data.lang)
    commit('setMenus', data.menus)
    console.log(data)
  },
}
