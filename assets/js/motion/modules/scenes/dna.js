import gsap from 'gsap'
import * as THREE from 'three'
import { isMobileOnly } from 'mobile-device-detect'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'

/**
 * The stage warms up the models
 */
export default class Dna extends AbstractScene {
  container // Container node

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

    /* Group */

    this.group = new THREE.Group()

    this.group.rotation.z = 0.45

    !isMobileOnly && (this.group.rotation.x = -0.1)
    this.group.position.x = !isMobileOnly ? -Math.PI * 0.6 : 0.6

    this.#addModel()

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

  start() {
    this.startMainEventsHandling()
    gsap.ticker.add(this.render)
  }

  freeze() {
    this.stopMainEventsHandling()
    gsap.ticker.remove(this.render)
  }

  destroy() {
    this.freeze()
    this.destroyWorld()
  }

  /* Private */

  #addModel() {
    this.dna = this.context.models.dna

    this.group.add(this.dna)
  }
}
