import gsap from 'gsap'

/* Static */
const SELECTOR = '[data-scroll-element]'

/**
 * Scroll animation
 * @param element {Element} - Parent element
 * @param delay {Number} - Delay in seconds
 */
export default (element, delay = 0) => {
  const items = element.querySelectorAll(SELECTOR)

  const tl = gsap.timeline({ delay })

  items.forEach((item) => {
    tl.to(
      item,
      {
        opacity: 1,
        x: 0,
        y: 0,
        ease: 'power2.out',
        duration: 1,
        onComplete: () => {
          gsap.set(item, { clearProps: 'willChange,opacity' })
        },
      },
      '<0.3'
    )
  })
}
