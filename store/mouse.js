export const state = () => ({
  x: 0,
  y: 0,
  hX: 0,
  hY: 0,
})

export const mutations = {
  setMouseParams(state, { event, centerX, centerY }) {
    state.x = event.clientX
    state.y = event.clientY

    state.hX = event.clientX - centerX
    state.hY = event.clientY - centerY
  },
}

export const actions = {
  updateMouseParams({ commit, rootState }, event) {
    const centerX = rootState.responsive.window.centerX
    const centerY = rootState.responsive.window.centerY

    commit('setMouseParams', { event, centerX, centerY })
  },
}
