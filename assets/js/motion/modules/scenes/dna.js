import gsap from 'gsap'
import * as THREE from 'three'
import { isMobileOnly } from 'mobile-device-detect'
// import * as dat from 'dat.gui'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'

/**
 * The stage warms up the models
 */
export default class Dna extends AbstractScene {
  /* Static */

  // static debug = new dat.GUI() // DEBUG

  container // Container node

  lights = {
    spotLight: null,
    ambient: null,
    directional: null,
  }

  group
  model

  origins = {
    speedIndex: 25,
  }

  speedIndex = {
    value: this.origins.speedIndex,
  }

  /**
   * ConstructorParameters
   * @param context {Object} - Motion context
   */
  // eslint-disable-next-line no-useless-constructor
  constructor(context) {
    super(context)
  }

  /* Public */

  /**
   * Init scene
   * @param container {Element} - container
   */
  init(container) {
    this.container = container

    this.createWorld()

    // // Add specific params to three scene
    // this.scene.background = new THREE.Color(COLOR_GREY)

    // Add specific params to renderer
    this.renderer.outputEncoding = THREE.sRGBEncoding // Renderer encoding

    this.camera.position.z = 5

    /* Lights */

    this.#addSpotLight()
    this.#addAmbientLight()
    this.#addDirectionalLight()

    /* Group */

    this.group = new THREE.Group()

    this.group.position.set(-3, 0, !isMobileOnly ? -0.5 : -1)
    this.group.rotation.z = 0.56

    !isMobileOnly && (this.group.rotation.x = -0.1)
    this.group.position.x = !isMobileOnly ? -Math.PI * 0.6 : 0.6

    this.#addModel()

    // this.#createDebugPanel() // Debug

    this.scene.add(this.group)

    this.render()
  }

  render = () => {
    this.renderWorld()

    const speed = this.speedIndex.value * 0.0001

    this.dna.rotation.y = this.context.nuxt.store.state.scroll.up
      ? this.dna.rotation.y - speed
      : this.dna.rotation.y + speed
  }

  scrollHandler = () => {
    const tl = gsap.timeline()
    tl.to(this.speedIndex, { value: 50 })
    tl.to(this.speedIndex, { value: this.origins.speedIndex, duration: 2 })
  }

  start() {
    this.startMainEventsHandling()
    gsap.ticker.add(this.render)

    window.addEventListener('scroll', this.scrollHandler)
  }

  freeze() {
    this.stopMainEventsHandling()
    gsap.ticker.remove(this.render)

    window.removeEventListener('scroll', this.scrollHandler)
  }

  destroy() {
    this.freeze()
    this.destroyWorld()
  }

  /* Private */

  /* Lights */

  #addSpotLight() {
    this.lights.spotLight = new THREE.SpotLight(0xffffff, 0.68)
    this.lights.spotLight.position.set(1980, 1286, -360)

    this.scene.add(this.lights.spotLight)
  }

  #addAmbientLight() {
    this.lights.ambient = new THREE.AmbientLight(0x222222, 1.15)

    this.scene.add(this.lights.ambient)
  }

  #addDirectionalLight() {
    this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.5)
    this.lights.directional.position.set(-360, -967, 159)

    this.scene.add(this.lights.directional)
  }

  /* Models */

  #addModel() {
    this.dna = this.context.models.dna

    this.group.add(this.dna)
  }

  /* Debug */

  // #createDebugPanel() {
  //   /* SpotLight */
  //
  //   // Dna.debug.add(this.lights.spotLight, 'visible')
  //
  //   // Dna.debug.add(this.lights.spotLight.position, 'x', -2000, 2000, 0.01)
  //   // Dna.debug.add(this.lights.spotLight.position, 'y', -2000, 2000, 0.01)
  //   // Dna.debug.add(this.lights.spotLight.position, 'z', -2000, 2000, 0.01)
  //   //
  //   // Dna.debug.add(this.lights.spotLight, 'intensity', 0, 3, 0.01)
  //
  //   /* DirectionalLight */
  //
  //   Dna.debug.add(this.lights.directional.position, 'x', -2000, 2000, 0.01)
  //   Dna.debug.add(this.lights.directional.position, 'y', -2000, 2000, 0.01)
  //   Dna.debug.add(this.lights.directional.position, 'z', -2000, 2000, 0.01)
  //
  //   Dna.debug.add(this.lights.directional, 'intensity', 0, 3, 0.01)
  //
  //   /* Group */
  //   // Dna.debug.add(this.group.position, 'x', -3, 3, 0.01, 'groupPosX')
  //   // Dna.debug.add(this.group.position, 'y', -3, 3, 0.01, 'groupPosY')
  //   // Dna.debug.add(this.group.position, 'z', -3, 3, 0.01, 'groupPosZ')
  //   //
  //   // Dna.debug.add(this.group.rotation, 'x', -3, 3, 0.01, 'groupRotX')
  //   // Dna.debug.add(this.group.rotation, 'y', -3, 3, 0.01, 'groupRotY')
  //   // Dna.debug.add(this.group.rotation, 'z', -3, 3, 0.01, 'groupRotZ')
  // }
}
