import gsap from 'gsap'

/**
 * Adds data att and styles
 */
export default (el, binding) => {
  const direction = binding.value || 'bottom'
  gsap.set(el, {
    willChange: 'opacity, transform',
    opacity: 0,
    y: direction === 'bottom' ? 50 : false,
    x: direction === 'left' ? -25 : direction === 'right' ? 25 : false,
  })

  el.setAttribute('data-scroll-element', '')
}
