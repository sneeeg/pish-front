import gsap from 'gsap'

export default (models, vectors) => {
  const tl = gsap.timeline({ delay: 0.5 })

  tl.addLabel('main')

  tl.fromTo(
    vectors.arrow.position,
    { y: -0.5 },
    { y: 0, duration: 1, ease: 'power2.out' },
    'main'
  )

  tl.fromTo(
    vectors.arrow.children[0].material,
    { opacity: 0 },
    { opacity: 1, duration: 1 },
    'main'
  )

  Object.keys(models).forEach((key, index) => {
    const scale = models[key].scale
    tl.fromTo(
      models[key].scale,
      { x: 0, y: 0, z: 0 },
      {
        x: scale.x,
        y: scale.y,
        z: scale.z,
        ease: 'back.out(2.1)',
        duration: 0.75,
      },
      `main+=${0.35 + index / 7}`
    )

    tl.fromTo(
      models[key].rotation,
      { x: -1 },
      {
        x: 0,
        ease: 'back.out(2.1)',
        duration: 0.5,
      },
      `main+=${0.35 + index / 7}`
    )
  })
}
