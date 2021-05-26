import gsap from 'gsap'
import * as THREE from 'three'
// import * as dat from 'dat.gui'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'
import firstScreenSceneAppear from '~/assets/js/motion/composables/first-screen-scene-appear'

/**
 * Scene on the first screen of the main page
 */
export default class FirstScreen extends AbstractScene {
  /* Static */

  // static debug = new dat.GUI() // DEBUG

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
    molecule2: null, // Molecule2
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
    points: null,
    points2: null,
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
    this.#addHemiLight()
    this.#addPointsLight()
    this.#addPoints2Light()

    /* Adding models */
    this.group = new THREE.Group() // Models group

    this.#addDavidModel()
    this.#addSatelliteModel()
    this.#addNumbersModel()
    this.#addBooksModel()
    this.#addMoleculeModel()

    this.models.molecule2 = this.context.models.molecule2.clone()
    this.models.molecule2.scale.set(0.4, 0.4, 0.4)

    this.scene.add(this.models.molecule2)

    /* Group positioning */
    this.group.position.x = Math.PI * 0.4

    this.scene.add(this.group)

    /* Adding vectors */
    this.#addArrowVector()

    this.render()
  }

  render = () => {
    // this.#satelliteModelAnimation()
    this.#mouseMotion()

    this.models.molecule.rotation.x += 0.01
    this.models.molecule.rotation.z += 0.01

    this.models.molecule2.rotation.x -= 0.0025
    this.models.molecule2.rotation.z -= 0.0025

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
  // #satelliteModelAnimation() {
  //   /* Satellite */
  //   const position = this.models.satellite.position
  //   const origins = this.origins.satellite
  //
  //   if (position.y >= origins.maxY) {
  //     origins.status = false
  //   } else if (position.y <= origins.minY) {
  //     origins.status = true
  //   }
  //
  //   position.y = origins.status ? position.y + 0.001 : position.y - 0.001
  // }

  #mouseMotion() {
    this.mouseTarget = {
      x: this.context.nuxt.store.state.mouse.hX * 0.0003,
      y: this.context.nuxt.store.state.mouse.hY * 0.0003,
    }

    Object.keys(this.models).forEach((key, index) => {
      const model = this.models[key]
      let kX = 0
      let kY = 0
      let rotDisabled = false
      let posDisabled = false

      switch (key) {
        case 'david':
          kX = 0.09
          kY = -0.02
          break

        case 'numbers':
          kX = -0.006
          kY = 0.005
          break

        case 'satellite':
          kX = 0.03
          kY = 0.03

          // posDisabled = true
          break

        case 'books':
          kX = -0.015
          kY = -0.0125

          posDisabled = true
          break
        case 'molecule':
          kX = -0.005
          kY = -0.003

          rotDisabled = true
          break

        case 'molecule2':
          rotDisabled = true
          break
      }
      if (!posDisabled) {
        model.position.y +=
          (0.05 / (key === 'numbers' ? 5 : index + 1)) *
            (this.mouseTarget.y - model.position.y) +
          kY
        model.position.x +=
          (0.05 / (key === 'numbers' ? 5 : index + 1)) *
            (this.mouseTarget.x - model.position.x) +
          kX
      }

      if (rotDisabled) return

      model.rotation.y +=
        (0.035 / (index + 1)) * (this.mouseTarget.x - model.rotation.y)
      model.rotation.x +=
        (0.035 / (index + 1)) * (this.mouseTarget.y - model.rotation.x)
    })
  }

  /* Lights */

  #addHemiLight() {
    this.lights.hemi = new THREE.HemisphereLight(0x242424, 0x353431, 0.6)

    this.scene.add(this.lights.hemi)
  }

  #addPointsLight() {
    this.lights.points = new THREE.PointLight(0xffffff, 0.2, -90)
    this.lights.points.position.set(2000, 2000, 723)

    this.scene.add(this.lights.points)

    // FirstScreen.debug.add(this.lights.points.position, 'x', -2000, 2000, 1)
    // FirstScreen.debug.add(this.lights.points.position, 'y', -2000, 2000, 1)
    // FirstScreen.debug.add(this.lights.points.position, 'z', -2000, 2000, 1)
    //
    // FirstScreen.debug.add(this.lights.points, 'intensity', 0, 3, 0.01)
    // FirstScreen.debug.add(this.lights.points, 'decay', 0, 3, 0.01)
    //
    // FirstScreen.debug.add(this.lights.points, 'distance', -500, 500, 1)
  }

  #addPoints2Light() {
    this.lights.points2 = new THREE.PointLight(0x7b73f2, 0.22, -36)
    this.lights.points2.position.set(-2000, -1750, -1050)

    this.scene.add(this.lights.points2)

    // FirstScreen.debug.add(this.lights.points2.position, 'x', -2000, 2000, 1)
    // FirstScreen.debug.add(this.lights.points2.position, 'y', -2000, 2000, 1)
    // FirstScreen.debug.add(this.lights.points2.position, 'z', -2000, 2000, 1)
    //
    // FirstScreen.debug.add(this.lights.points2, 'intensity', 0, 3, 0.01)
    //
    // FirstScreen.debug.add(this.lights.points2, 'distance', -500, 500, 1)
  }

  #addAmbientLight() {
    // this.lights.ambient = new THREE.AmbientLight(0x000000, 1)
    //
    // this.scene.add(this.lights.ambient)
  }

  #addSpotLight() {
    this.lights.spotLight = new THREE.SpotLight(0xffffff, 0.56)
    this.lights.spotLight.position.set(-585, -880, 1020)

    this.scene.add(this.lights.spotLight)

    // FirstScreen.debug.add(this.lights.spotLight, 'visible')
    //
    // FirstScreen.debug.add(this.lights.spotLight, 'angle', -5, 5, 0.01)
    //
    // FirstScreen.debug.add(
    //   this.lights.spotLight.position,
    //   'x',
    //   -4000,
    //   2000,
    //   0.01
    // )
    // FirstScreen.debug.add(
    //   this.lights.spotLight.position,
    //   'y',
    //   -2000,
    //   2000,
    //   0.01
    // )
    // FirstScreen.debug.add(
    //   this.lights.spotLight.position,
    //   'z',
    //   -2000,
    //   2000,
    //   0.01
    // )
    //
    // FirstScreen.debug.add(this.lights.spotLight, 'intensity', 0, 3, 0.01)
  }

  /* Models */
  #addDavidModel() {
    this.models.david = this.context.models.david.clone()
    this.models.david.scale.set(0.45, 0.45, 0.45)

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
    this.models.numbers.scale.set(0.35, 0.35, 0.35)

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
    this.models.molecule.scale.set(0.3, 0.3, 0.3)

    /* Positioning */
    this.models.molecule.position.y = -Math.PI * 0.2

    this.models.molecule.rotation.z = -Math.PI * 0.75

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
