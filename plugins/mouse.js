export default ({ store }) => {
  document.addEventListener('mousemove', (event) =>
    store.dispatch('mouse/updateMouseParams', event)
  )
}
