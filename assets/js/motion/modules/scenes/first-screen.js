import gsap from 'gsap'
import * as THREE from 'three'
import { isMobileOnly } from 'mobile-device-detect'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'
import firstScreenSceneAppear from '~/assets/js/motion/composables/first-screen-scene-appear'

/**
 * Scene on the first screen of the main page
 */
export default class FirstScreen extends AbstractScene {
  container // Container node

  firstStart = false // First start or after destroy

  group // Models group
  wholeGroup

  /* Models */
  models = {
    david: null, // Davids head
    satellite: null, // Satellite
    numbers: null, // Numbers
    books: null, // Books
    molecule: null, // Molecule
    molecule2: null, // Molecule2
  }

  /* Vectors */
  vectors = {
    arrow: null, // Arrow vector. It is Group
  }

  /* Lights */
  lights = {
    ambient: null,
    directional: null,
    directional2: null,
    point: null,
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

    this.wholeGroup = new THREE.Group()

    // // Add specific params to three scene
    this.scene.background = new THREE.Color(0xffffff)

    /* Adding lights */
    this.#addDirectionalLight()
    this.#addDirectional2Light()
    this.#addAmbientLight()

    /* Adding models */
    this.group = new THREE.Group() // Models group

    this.#addDavidModel()
    this.#addSatelliteModel()
    this.#addNumbersModel()
    this.#addBooksModel()
    this.#addMoleculeModel()
    this.#addMolecule2Model()

    // /* Group positioning */
    // this.group.position.x = Math.PI * 0.4

    this.wholeGroup.add(this.group)

    /* Adding vectors */
    this.#addArrowVector()

    this.wholeGroup.position.set(
      !isMobileOnly ? -Math.PI * 0.19 : -Math.PI * 0.25,
      Math.PI * 0.225,
      0
    )

    this.scene.add(this.wholeGroup)

    this.render()
  }

  render = (time) => {
    // this.#satelliteModelAnimation()
    this.#mouseMotion()
    //
    this.models.satellite.position.y = Math.sin(time * 0.35 - 0.21) * 0.09 + 0.2

    this.models.molecule.rotation.x += 0.005
    this.models.molecule.rotation.z += 0.005
    //
    this.models.molecule2.rotation.x -= 0.001
    this.models.molecule2.rotation.z -= 0.001

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
    this.models.david.geometry.rotateY(Math.PI * 0.25)
    this.destroyWorld()

    this.firstStart = false
    this.mouseTarget = {
      x: 0,
      y: 0,
    }
  }

  /* Private */

  #mouseMotion() {
    this.mouseTarget = {
      x: this.context.nuxt.store.state.mouse.hX * 0.0001,
      y: this.context.nuxt.store.state.mouse.hY * 0.0001,
    }

    this.group.position.y +=
      0.003 * (this.mouseTarget.y - this.group.position.y)

    this.group.position.x +=
      0.003 * (this.mouseTarget.x - this.group.position.x)

    Object.keys(this.models).forEach((key, index) => {
      if (key === 'satellite') return

      const model = this.models[key]

      model.rotation.y +=
        (0.035 / (index + 1)) * (this.mouseTarget.x - model.rotation.y)
      model.rotation.x +=
        (0.035 / (index + 1)) * (this.mouseTarget.y - model.rotation.x)
    })
  }

  /* Lights */
  #addAmbientLight() {
    this.lights.ambient = new THREE.AmbientLight(0x404040)

    this.scene.add(this.lights.ambient)
  }

  #addDirectionalLight() {
    this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.2)
    this.lights.directional.position.set(2, 0, 1)

    this.scene.add(this.lights.directional)
  }

  #addDirectional2Light() {
    this.lights.directional2 = new THREE.DirectionalLight(0xe2e2e2, 0.515)
    this.lights.directional2.position.set(-1, 1, 1)

    this.scene.add(this.lights.directional2)
  }

  /* Models */
  #addDavidModel() {
    this.models.david = this.context.models.david.clone()
    this.models.david.scale.set(0.3, 0.3, 0.3)

    /* Positioning */
    this.models.david.geometry.rotateY(-Math.PI * 0.25)

    this.models.david.position.x = 1.6
    this.models.david.position.y = -0.4
    this.models.david.position.z = -0.15

    // this.models.david.rotation.z = -0.15

    this.group.add(this.models.david)
  }

  #addSatelliteModel() {
    this.models.satellite = this.context.models.satellite.clone()
    this.models.satellite.scale.set(0.3, 0.3, 0.3)

    /* Positioning */
    this.models.satellite.position.x = 1.1
    this.models.satellite.position.y = -0.3
    this.models.satellite.position.z = -0.35

    this.models.satellite.rotation.x = 6.16
    this.models.satellite.rotation.y = -0.8
    this.models.satellite.rotation.z = -1.92

    this.group.add(this.models.satellite)
  }

  #addNumbersModel() {
    this.models.numbers = this.context.models.numbers.clone()
    this.models.numbers.scale.set(0.3, 0.3, 0.3)

    /* Positioning */
    this.models.numbers.position.x = 0.25
    this.models.numbers.position.y = 0
    this.models.numbers.position.z = -0.35

    this.group.add(this.models.numbers)
  }

  #addBooksModel() {
    this.models.books = this.context.models.books.clone()
    this.models.books.scale.set(0.32, 0.32, 0.32)
    //
    /* Positioning */
    this.models.books.position.x = 0.25
    this.models.books.position.y = -1.05

    this.group.add(this.models.books)
  }

  #addMoleculeModel() {
    this.models.molecule = this.context.models.molecule.clone()
    this.models.molecule.scale.set(0.26, 0.26, 0.26)

    /* Positioning */
    this.models.molecule.position.x = 1.15
    this.models.molecule.position.y = -0.9
    this.models.molecule.position.z = 0.2

    this.models.molecule.rotation.x = -10
    this.models.molecule.rotation.y = 0.1
    this.models.molecule.rotation.z = -2.14

    this.group.add(this.models.molecule)
  }

  #addMolecule2Model() {
    this.models.molecule2 = this.context.models.molecule2.clone()
    this.models.molecule2.scale.set(0.35, 0.35, 0.35)

    /* Positioning */
    this.models.molecule2.position.x = 0.8
    this.models.molecule2.position.y = -0.7
    this.models.molecule2.position.z = -0.25

    this.models.molecule2.rotation.x = -1.02
    this.models.molecule2.rotation.y = 2.3
    this.models.molecule2.rotation.z = -0.8

    this.group.add(this.models.molecule2)
  }

  /* Vectors */

  #addArrowVector() {
    this.vectors.arrow = this.context.vectors.arrow.clone()

    /* Positioning */

    this.vectors.arrow.position.x = 0

    this.wholeGroup.add(this.vectors.arrow)
  }
}
