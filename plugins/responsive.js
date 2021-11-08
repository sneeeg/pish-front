export default (context) => {
  context.store.commit('responsive/updateWindowParams')

  window.addEventListener('resize', () => {
    context.store.commit('responsive/updateWindowParams')
  })
}
