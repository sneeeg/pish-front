export const state = () => ({
  sessid: '',
})

export const mutations = {
  setSessid(state, sessid) {
    state.sessid = sessid
  },
}
