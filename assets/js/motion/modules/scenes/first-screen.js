import gsap from 'gsap'
import * as THREE from 'three'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'
import firstScreenSceneAppear from '~/assets/js/motion/composables/first-screen-scene-appear'

/**
 * Scene on the first screen of the main page
 */
export default class FirstScreen extends AbstractScene {
  container // Container node

  firstStart = false // First start or after destroy

  group // Models group

  /* Models */
  models = {
    david: null, // Davids head
    satellite: null, // Satellite
    numbers: null, // Numbers
    books: null, // Books
    molecule: null, // Molecule
  }

  /* Origins */
  origins = {
    satellite: {
      minY: Math.PI * 0.25,
      maxY: Math.PI * 0.35,
      status: false,
    },
  }

  /* Vectors */
  vectors = {
    arrow: null, // Arrow vector. It is Group
  }

  /* Lights */
  lights = {
    ambient: null,
    spotLight: null,
  }

  /* Mouse target */
  mouseTarget = {
    x: 0,
    y: 0,
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
   * @param container {HTMLElement} - container
   */
  init(container) {
    this.container = container

    this.createWorld()

    // // Add specific params to three scene
    // this.scene.background = new THREE.Color(COLOR_GREY)

    /* Adding lights */
    this.#addAmbientLight()
    this.#addSpotLight()

    /* Adding models */
    this.group = new THREE.Group() // Models group

    this.#addDavidModel()
    this.#addSatelliteModel()
    this.#addNumbersModel()
    this.#addBooksModel()
    this.#addMoleculeModel()

    /* Group positioning */
    this.group.position.x = Math.PI * 0.4

    this.scene.add(this.group)

    /* Adding vectors */
    this.#addArrowVector()

    this.render()
  }

  render = () => {
    this.#satelliteModelAnimation()
    this.#mouseMotion()

    this.renderWorld()
  }

  start() {
    this.startMainEventsHandling()
    gsap.ticker.add(this.render)

    if (!this.firstStart) {
      this.firstStart = true

      firstScreenSceneAppear(this.models, this.vectors)
    }
  }

  freeze() {
    this.stopMainEventsHandling()
    gsap.ticker.remove(this.render)
  }

  destroy() {
    this.freeze()
    this.models.david.geometry.rotateY(Math.PI * 0.5)
    this.destroyWorld()

    this.firstStart = false
    this.mouseTarget = {
      x: 0,
      y: 0,
    }
  }

  /* Private */

  /* Animation */
  #satelliteModelAnimation() {
    /* Satellite */
    const position = this.models.satellite.position
    const origins = this.origins.satellite

    if (position.y >= origins.maxY) {
      origins.status = false
    } else if (position.y <= origins.minY) {
      origins.status = true
    }

    position.y = origins.status ? position.y + 0.0005 : position.y - 0.0005
  }

  #mouseMotion() {
    this.mouseTarget = {
      x: this.context.nuxt.store.state.mouse.hX * 0.0003,
      y: this.context.nuxt.store.state.mouse.hY * 0.0003,
    }

    Object.keys(this.models).forEach((key, index) => {
      const model = this.models[key]

      model.rotation.y +=
        (0.05 / (index + 1)) * (this.mouseTarget.x - model.rotation.y)
      model.rotation.x +=
        (0.05 / (index + 1)) * (this.mouseTarget.y - model.rotation.x)
    })
  }

  /* Lights */
  #addAmbientLight() {
    this.lights.ambient = new THREE.AmbientLight(0x787878, 1.5)

    this.scene.add(this.lights.ambient)
  }

  #addSpotLight() {
    this.lights.spotLight = new THREE.SpotLight(0xffffff, 0.6)
    this.lights.spotLight.position.set(0, 0, 100)

    this.scene.add(this.lights.spotLight)
  }

  /* Models */
  #addDavidModel() {
    this.models.david = this.context.models.david.clone()
    this.models.david.scale.set(0.4, 0.4, 0.4)

    /* Positioning */
    this.models.david.geometry.rotateY(-Math.PI * 0.5)

    this.models.david.position.x = Math.PI * 0.55
    this.models.david.position.y = -Math.PI * 0.15
    this.models.david.position.z = 0.1

    // this.models.david.rotation.z = -0.15

    this.group.add(this.models.david)
  }

  #addSatelliteModel() {
    this.models.satellite = this.context.models.satellite.clone()
    this.models.satellite.scale.set(0.5, 0.5, 0.5)

    /* Positioning */
    this.models.satellite.position.x = Math.PI * 0.25
    this.models.satellite.position.y = Math.PI * 0.3
    this.models.satellite.position.z = -0.35

    this.group.add(this.models.satellite)
  }

  #addNumbersModel() {
    this.models.numbers = this.context.models.numbers.clone()
    this.models.numbers.scale.set(0.5, 0.5, 0.5)

    /* Positioning */
    this.models.numbers.position.x = -Math.PI * 0.25
    this.models.numbers.position.y = Math.PI * 0.15
    this.models.numbers.position.z = 0.2

    this.group.add(this.models.numbers)
  }

  #addBooksModel() {
    this.models.books = this.context.models.books.clone()
    this.models.books.scale.set(0.5, 0.5, 0.5)

    /* Positioning */
    this.models.books.position.x = -Math.PI * 0.4
    this.models.books.position.y = -Math.PI * 0.3

    this.group.add(this.models.books)
  }

  #addMoleculeModel() {
    this.models.molecule = this.context.models.molecule.clone()
    this.models.molecule.scale.set(0.4, 0.4, 0.4)

    /* Positioning */
    this.models.molecule.position.y = -Math.PI * 0.2

    this.models.molecule.rotation.z = -Math.PI * 0.1

    this.group.add(this.models.molecule)
  }

  /* Vectors */

  #addArrowVector() {
    this.vectors.arrow = this.context.vectors.arrow.clone()

    /* Positioning */

    this.vectors.arrow.position.x = Math.PI * 0.5

    this.scene.add(this.vectors.arrow)
  }
}
