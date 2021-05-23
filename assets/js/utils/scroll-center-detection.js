import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'

export default (e, onDone = () => false) => {
  const { element } = e.target

  if (element.dataset.scrollDone !== undefined || e.percentInView < 0.15) return

  element.setAttribute('data-scroll-done', '')
  scrollAnimation(element)

  onDone()
}
