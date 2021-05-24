import gsap from 'gsap'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'

/**
 * The stage warms up the models
 */
export default class Warming extends AbstractScene {
  container // Container node

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
   * @param container {HTMLElement} - container
   */
  init(container) {
    this.container = container

    this.createWorld()

    // Add specific class to renderer DOM
    this.renderer.domElement.classList.add('_warming')

    this.#addModelsToScene()
  }

  render = () => {
    this.renderWorld()
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
    this.#removeModelsFromScene()
    this.destroyWorld()
  }

  /* Private */

  #addModelsToScene() {
    Object.keys(this.context.models).forEach((key) =>
      this.scene.add(this.context.models[key])
    )
  }

  #removeModelsFromScene() {
    Object.keys(this.context.models).forEach((key) =>
      this.scene.remove(this.context.models[key])
    )
  }
}
