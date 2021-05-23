import gsap from 'gsap'

/**
 * Appearance of content when the transition is completed and the application is loaded
 */
export default () => {
  const app = document.getElementById('app')
  const appPreloader = document.getElementById('app-preloader')
  const appHeaderInfo = app.querySelector('.gsap_header__info')
  const appHeaderContent = app.querySelector('.gsap_header__content')
  const appMain = document.getElementById('main')
  const appFooter = app.querySelector('.footer')

  const tl = gsap.timeline({ delay: 0.25 })

  tl.set(appMain, { opacity: 1 })
  tl.set(appPreloader, { display: 'none' })
  tl.fromTo(
    appHeaderInfo,
    { opacity: 0, y: '-100%' },
    { opacity: 1, y: 0, duration: 1 }
  )
  tl.fromTo(
    appHeaderContent,
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    '>-.75'
  )
  tl.fromTo(
    appFooter,
    { opacity: 0, y: '100%' },
    { opacity: 1, y: 0, duration: 1 },
    '>-.55'
  )
}
