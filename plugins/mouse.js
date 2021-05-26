export default ({ store }) => {
  document.addEventListener('mousemove', (event) =>
    store.commit('mouse/setMouseParams', event)
  )
}
