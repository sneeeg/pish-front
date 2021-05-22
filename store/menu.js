export const state = () => ({
  isActive: false,
})

export const mutations = {
  setIsActive(state, isActive) {
    state.isActive = isActive
    document.body.classList.toggle('_menu-active', isActive)
  },
}

export const actions = {
  toggle({ state, commit, dispatch }) {
    commit('setIsActive', !state.isActive)

    if (state.isActive) {
      dispatch('scroll/lock', 'menu', { root: true })
    } else {
      dispatch('scroll/unlock', 'menu', { root: true })
    }
  },
  close({ commit, dispatch }) {
    commit('setIsActive', false)
    dispatch('scroll/unlock', 'menu', { root: true })
  },
}
