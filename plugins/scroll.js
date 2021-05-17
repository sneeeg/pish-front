export default (context) => {
  window.addEventListener('scroll', () =>
    context.store.commit('Scroll/updateScrollParams')
  )
}
