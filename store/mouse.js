export const state = () => ({
  x: 0,
  y: 0,
  hX: 0,
  hY: 0,
})

export const mutations = {
  setMouseParams(state, event) {
    state.x = event.clientX
    state.y = event.clientY

    state.hX = event.clientX - window.innerWidth / 2
    state.hY = event.clientY - window.innerHeight / 2
  },
}

export const actions = {}
