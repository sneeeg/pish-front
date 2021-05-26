export const state = () => ({
  siteId: '',
  sessid: '',
  settings: {},
  lang: {},
  menus: [],
  routing: {
    currentPageName: '',
    hasHistory: false,
  },
  popup: {
    isShow: false,
    title: '',
    text: '',
    href: '',
  },
  onErrorPage: false,
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
  changeRoutingState(state, { to, from }) {
    state.routing.currentPageName = this.$utils.getPageNameByRoute(to.name)

    state.routing.hasHistory = !!from.name
  },
  changePopupState(
    state,
    { isShow = false, title = '', text = '', href = '' }
  ) {
    state.popup.title = title
    state.popup.text = text
    state.popup.href = href

    state.popup.isShow = isShow
  },
  changeErrorPageState(state, value) {
    state.onErrorPage = value
  },
}

export const actions = {
  getConfig({ state, commit }, locale) {
    commit('setSiteId', window.siteId[locale])
    this.$axios.defaults.headers.common['X-Bitrix-Site-Id'] = state.siteId
    this.$dayjs.locale(locale)

    return this.$api.config.get().then(({ data }) => {
      commit('setSettings', data.settings)
      commit('setLang', data.lang)
      commit('setMenus', data.menus)
    })
  },
}
