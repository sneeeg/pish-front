import gsap from 'gsap'

/**
 * Disappearance of content when the transition is started
 */
export default () => {
  const app = document.getElementById('app')
  const appPreloader = document.getElementById('app-preloader')
  const elements = app.querySelectorAll(
    '.gsap_header__info, .gsap_header__content, #main, .footer'
  )

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        resolve()
      },
    })

    const gsapVars = [{ opacity: 1 }, { opacity: 0 }, '0']

    tl.set(appPreloader, { clearProps: 'all' })

    elements.forEach((element) => {
      tl.fromTo(element, ...gsapVars)
    })
  })
}
