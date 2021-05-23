import gsap from 'gsap'

/**
 * Adds transformation styles
 */
export default (el, binding) => {
  const values = binding.value || 'transform, opacity'
  gsap.set(el, { willChange: values })
}
