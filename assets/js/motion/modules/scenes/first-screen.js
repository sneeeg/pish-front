import gsap from 'gsap'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import AbstractScene from '~/assets/js/motion/modules/scenes/abstract-scene'
import firstScreenSceneAppear from '~/assets/js/motion/composables/first-screen-scene-appear'

/**
 * Scene on the first screen of the main page
 */
export default class FirstScreen extends AbstractScene {
  /* Static */

  static debug = new dat.GUI() // DEBUG

  static debugColor(colorValue) {
    return parseInt(colorValue.replace('#', '0x'), 16)
  }

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

    this.debugCamera = FirstScreen.debug.addFolder('camera')

    // // Add specific params to three scene
    // this.scene.background = new THREE.Color(COLOR_GREY)

    this.debugLights = FirstScreen.debug.addFolder('lights')

    /* Adding lights */
    this.#addAmbientLight()
    this.#addSpotLight()
    this.#addHemiLight()
    this.#addPointsLight()
    this.#addPoints2Light()

    /* Adding models */
    this.group = new THREE.Group() // Models group

    this.debugMehes = FirstScreen.debug.addFolder('meshes')

    this.#addDavidModel()
    this.#addSatelliteModel()
    this.#addNumbersModel()
    this.#addBooksModel()
    this.#addMoleculeModel()
    this.#addMolecule2Model()

    // /* Group positioning */
    // this.group.position.x = Math.PI * 0.4

    this.scene.add(this.group)

    /* Adding vectors */
    this.#addArrowVector()

    const debugSave = {
      save: () => {
        const data = {
          lights: this.lights,
          meshes: this.models,
        }

        const dataStr =
          'data:text/json;charset=utf-8,' +
          encodeURIComponent(JSON.stringify(data))

        const link = document.querySelector('a')
        link.setAttribute('href', dataStr)
        link.setAttribute('download', 'scene.json')

        link.click()
      },
    }

    FirstScreen.debug.add(debugSave, 'save')

    this.render()
  }

  render = () => {
    // this.#satelliteModelAnimation()
    // this.#mouseMotion()
    //
    // this.models.molecule.rotation.x += 0.01
    // this.models.molecule.rotation.z += 0.01
    //
    // this.models.molecule2.rotation.x -= 0.0025
    // this.models.molecule2.rotation.z -= 0.0025

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
    // this.mouseTarget = {
    //   x: this.context.nuxt.store.state.mouse.hX * 0.0003,
    //   y: this.context.nuxt.store.state.mouse.hY * 0.0003,
    // }
    //
    // Object.keys(this.models).forEach((key, index) => {
    //   const model = this.models[key]
    //   let kX = 0
    //   let kY = 0
    //   let rotDisabled = false
    //   let posDisabled = false
    //
    //   switch (key) {
    //     case 'david':
    //       kX = 0.09
    //       kY = -0.02
    //       break
    //
    //     case 'numbers':
    //       kX = -0.006
    //       kY = 0.005
    //       break
    //
    //     case 'satellite':
    //       kX = 0.03
    //       kY = 0.03
    //
    //       // posDisabled = true
    //       break
    //
    //     case 'books':
    //       kX = -0.015
    //       kY = -0.0125
    //
    //       posDisabled = true
    //       break
    //     case 'molecule':
    //       kX = -0.005
    //       kY = -0.003
    //
    //       rotDisabled = true
    //       break
    //
    //     case 'molecule2':
    //       rotDisabled = true
    //       break
    //   }
    //   if (!posDisabled) {
    //     model.position.y +=
    //       (0.05 / (key === 'numbers' ? 5 : index + 1)) *
    //         (this.mouseTarget.y - model.position.y) +
    //       kY
    //     model.position.x +=
    //       (0.05 / (key === 'numbers' ? 5 : index + 1)) *
    //         (this.mouseTarget.x - model.position.x) +
    //       kX
    //   }
    //
    //   if (rotDisabled) return
    //
    //   model.rotation.y +=
    //     (0.035 / (index + 1)) * (this.mouseTarget.x - model.rotation.y)
    //   model.rotation.x +=
    //     (0.035 / (index + 1)) * (this.mouseTarget.y - model.rotation.x)
    // })
  }

  /* Lights */

  #addHemiLight() {
    this.lights.hemi = new THREE.HemisphereLight(0x242424, 0x353431, 0.6)

    this.scene.add(this.lights.hemi)

    this.debugHemi = this.debugLights.addFolder('Hemi')
    this.debugHemi.add(this.lights.hemi, 'visible')
    this.debugHemi.add(this.lights.hemi, 'intensity', 0, 6, 0.1)

    this.hemiDebug = {
      color: '#242424',
      groundColor: '#353431',
    }

    this.debugHemi.addColor(this.hemiDebug, 'color').onChange((value) => {
      this.lights.hemi.color = new THREE.Color(FirstScreen.debugColor(value))
    })

    this.debugHemi.addColor(this.hemiDebug, 'groundColor').onChange((value) => {
      this.lights.hemi.groundColor = new THREE.Color(
        FirstScreen.debugColor(value)
      )
    })
  }

  #addPointsLight() {
    this.lights.points = new THREE.PointLight(0xffffff, 0.2, -10)
    this.lights.points.position.set(2000, 2000, 723)

    this.scene.add(this.lights.points)

    this.debugPoints = this.debugLights.addFolder('Point')
    this.debugPoints.add(this.lights.points, 'visible')
    this.debugPoints.add(this.lights.points, 'intensity', 0, 6, 0.1)

    this.debugPoints.add(this.lights.points, 'distance', 0, 100, 0.1)

    this.debugPoints.add(this.lights.points.position, 'x', -2000, 2000, 10)
    this.debugPoints.add(this.lights.points.position, 'y', -2000, 2000, 10)
    this.debugPoints.add(this.lights.points.position, 'z', -2000, 2000, 10)

    this.pointsDebug = {
      color: '#ffffff',
    }

    this.debugPoints.addColor(this.pointsDebug, 'color').onChange((value) => {
      this.lights.points.color = new THREE.Color(FirstScreen.debugColor(value))
    })
  }

  #addPoints2Light() {
    this.lights.points2 = new THREE.PointLight(0x7b73f2, 0.22, -36)
    this.lights.points2.position.set(-2000, -1750, -1050)

    this.scene.add(this.lights.points2)

    this.debugPoints2 = this.debugLights.addFolder('Point2')
    this.debugPoints2.add(this.lights.points2, 'visible')
    this.debugPoints2.add(this.lights.points2, 'intensity', 0, 6, 0.1)

    this.debugPoints2.add(this.lights.points2, 'distance', 0, 100, 0.1)

    this.debugPoints2.add(this.lights.points2.position, 'x', -2000, 2000, 10)
    this.debugPoints2.add(this.lights.points2.position, 'y', -2000, 2000, 10)
    this.debugPoints2.add(this.lights.points2.position, 'z', -2000, 2000, 10)

    this.pointsDebug2 = {
      color: '#7b73f2',
    }

    this.debugPoints2.addColor(this.pointsDebug2, 'color').onChange((value) => {
      this.lights.points2.color = new THREE.Color(FirstScreen.debugColor(value))
    })
  }

  #addAmbientLight() {
    this.lights.ambient = new THREE.AmbientLight(0x000000, 1)

    this.scene.add(this.lights.ambient)

    this.debugAmbient = this.debugLights.addFolder('Ambient')
    this.debugAmbient.add(this.lights.ambient, 'visible')
    this.debugAmbient.add(this.lights.ambient, 'intensity', 0, 6, 0.1)

    this.ambientDebug = {
      color: '#000000',
    }

    this.debugAmbient.addColor(this.ambientDebug, 'color').onChange((value) => {
      this.lights.ambient.color = new THREE.Color(FirstScreen.debugColor(value))
    })
  }

  #addSpotLight() {
    this.lights.spotLight = new THREE.SpotLight(0xffffff, 0.56)
    this.lights.spotLight.position.set(-585, -880, 1020)

    this.scene.add(this.lights.spotLight)

    this.debugSpotlight = this.debugLights.addFolder('SpotLight')
    this.debugSpotlight.add(this.lights.spotLight, 'visible')
    this.debugSpotlight.add(this.lights.spotLight, 'intensity', 0, 6, 0.1)
    this.debugSpotlight.add(this.lights.spotLight, 'distance', -6, 6, 0.1)

    this.debugSpotlight.add(this.lights.spotLight, 'distance', 0, 100, 0.1)
    this.debugSpotlight.add(this.lights.spotLight, 'angle', 0, 1.5, 0.01)
    this.debugSpotlight.add(this.lights.spotLight, 'penumbra', 0, 1, 0.01)
    this.debugSpotlight.add(this.lights.spotLight, 'decay', 0, 100, 0.1)

    this.debugSpotlight.add(
      this.lights.spotLight.position,
      'x',
      -2000,
      2000,
      10
    )
    this.debugSpotlight.add(
      this.lights.spotLight.position,
      'y',
      -2000,
      2000,
      10
    )
    this.debugSpotlight.add(
      this.lights.spotLight.position,
      'z',
      -2000,
      2000,
      10
    )

    this.spotLightDebug = {
      color: '#ffffff',
    }

    this.debugSpotlight
      .addColor(this.spotLightDebug, 'color')
      .onChange((value) => {
        this.lights.spotLight.color = new THREE.Color(
          FirstScreen.debugColor(value)
        )
      })
  }

  /* Models */
  #addDavidModel() {
    this.models.david = this.context.models.david.clone()
    this.models.david.scale.set(0.45, 0.45, 0.45)
    //
    // /* Positioning */
    // this.models.david.geometry.rotateY(-Math.PI * 0.5)
    //
    // this.models.david.position.x = Math.PI * 0.55
    // this.models.david.position.y = -Math.PI * 0.15
    // this.models.david.position.z = 0.1
    //
    // // this.models.david.rotation.z = -0.15

    this.group.add(this.models.david)

    this.debugDavid = this.debugMehes.addFolder('David')

    this.debugDavid.add(this.models.david.position, 'x', -10, 10, 0.01)
    this.debugDavid.add(this.models.david.position, 'y', -10, 10, 0.01)
    this.debugDavid.add(this.models.david.position, 'z', -10, 10, 0.01)

    this.debugDavid.add(this.models.david.rotation, 'x', -10, 10, 0.01)
    this.debugDavid.add(this.models.david.rotation, 'y', -10, 10, 0.01)
    this.debugDavid.add(this.models.david.rotation, 'z', -10, 10, 0.01)

    this.davidScale = 0.45

    this.debugDavid
      .add(this, 'davidScale', 0, 5, 0.01)
      .onChange((val) => this.models.david.scale.set(val, val, val))
  }

  #addSatelliteModel() {
    this.models.satellite = this.context.models.satellite.clone()
    this.models.satellite.scale.set(0.5, 0.5, 0.5)
    //
    // /* Positioning */
    // this.models.satellite.position.x = Math.PI * 0.25
    // this.models.satellite.position.y = Math.PI * 0.3
    // this.models.satellite.position.z = -0.35

    this.group.add(this.models.satellite)

    this.debugSatellite = this.debugMehes.addFolder('Satellite')

    this.debugSatellite.add(this.models.satellite.position, 'x', -10, 10, 0.01)
    this.debugSatellite.add(this.models.satellite.position, 'y', -10, 10, 0.01)
    this.debugSatellite.add(this.models.satellite.position, 'z', -10, 10, 0.01)

    this.debugSatellite.add(this.models.satellite.rotation, 'x', -10, 10, 0.01)
    this.debugSatellite.add(this.models.satellite.rotation, 'y', -10, 10, 0.01)
    this.debugSatellite.add(this.models.satellite.rotation, 'z', -10, 10, 0.01)

    this.satelliteScale = 0.5

    this.debugSatellite
      .add(this, 'satelliteScale', 0, 5, 0.01)
      .onChange((val) => this.models.satellite.scale.set(val, val, val))
  }

  #addNumbersModel() {
    this.models.numbers = this.context.models.numbers.clone()
    this.models.numbers.scale.set(0.35, 0.35, 0.35)

    // /* Positioning */
    // this.models.numbers.position.x = -Math.PI * 0.25
    // this.models.numbers.position.y = Math.PI * 0.15
    // this.models.numbers.position.z = 0.2

    this.group.add(this.models.numbers)

    this.debugNumbers = this.debugMehes.addFolder('Numbers')

    this.debugNumbers.add(this.models.numbers.position, 'x', -10, 10, 0.01)
    this.debugNumbers.add(this.models.numbers.position, 'y', -10, 10, 0.01)
    this.debugNumbers.add(this.models.numbers.position, 'z', -10, 10, 0.01)

    this.debugNumbers.add(this.models.numbers.rotation, 'x', -10, 10, 0.01)
    this.debugNumbers.add(this.models.numbers.rotation, 'y', -10, 10, 0.01)
    this.debugNumbers.add(this.models.numbers.rotation, 'z', -10, 10, 0.01)

    this.numbersScale = 0.35

    this.debugNumbers
      .add(this, 'numbersScale', 0, 5, 0.01)
      .onChange((val) => this.models.numbers.scale.set(val, val, val))
  }

  #addBooksModel() {
    this.models.books = this.context.models.books.clone()
    this.models.books.scale.set(0.5, 0.5, 0.5)
    //
    // /* Positioning */
    // this.models.books.position.x = -Math.PI * 0.4
    // this.models.books.position.y = -Math.PI * 0.3

    this.group.add(this.models.books)

    this.debugBooks = this.debugMehes.addFolder('Books')

    this.debugBooks.add(this.models.books.position, 'x', -10, 10, 0.01)
    this.debugBooks.add(this.models.books.position, 'y', -10, 10, 0.01)
    this.debugBooks.add(this.models.books.position, 'z', -10, 10, 0.01)

    this.debugBooks.add(this.models.books.rotation, 'x', -10, 10, 0.01)
    this.debugBooks.add(this.models.books.rotation, 'y', -10, 10, 0.01)
    this.debugBooks.add(this.models.books.rotation, 'z', -10, 10, 0.01)

    this.booksScale = 0.5

    this.debugBooks
      .add(this, 'booksScale', 0, 5, 0.01)
      .onChange((val) => this.models.books.scale.set(val, val, val))
  }

  #addMoleculeModel() {
    this.models.molecule = this.context.models.molecule.clone()
    this.models.molecule.scale.set(0.3, 0.3, 0.3)
    //
    // /* Positioning */
    // this.models.molecule.position.y = -Math.PI * 0.2
    //
    // this.models.molecule.rotation.z = -Math.PI * 0.75

    this.debugMolecule = this.debugMehes.addFolder('Molecule')

    this.debugMolecule.add(this.models.molecule.position, 'x', -10, 10, 0.01)
    this.debugMolecule.add(this.models.molecule.position, 'y', -10, 10, 0.01)
    this.debugMolecule.add(this.models.molecule.position, 'z', -10, 10, 0.01)

    this.debugMolecule.add(this.models.molecule.rotation, 'x', -10, 10, 0.01)
    this.debugMolecule.add(this.models.molecule.rotation, 'y', -10, 10, 0.01)
    this.debugMolecule.add(this.models.molecule.rotation, 'z', -10, 10, 0.01)

    this.moleculeScale = 0.3

    this.debugMolecule
      .add(this, 'moleculeScale', 0, 5, 0.01)
      .onChange((val) => this.models.molecule.scale.set(val, val, val))

    this.group.add(this.models.molecule)
  }

  #addMolecule2Model() {
    this.models.molecule2 = this.context.models.molecule2.clone()
    this.models.molecule2.scale.set(0.4, 0.4, 0.4)

    this.debugMolecule2 = this.debugMehes.addFolder('Molecule2')

    this.debugMolecule2.add(this.models.molecule2.position, 'x', -10, 10, 0.01)
    this.debugMolecule2.add(this.models.molecule2.position, 'y', -10, 10, 0.01)
    this.debugMolecule.add(this.models.molecule2.position, 'z', -10, 10, 0.01)

    this.debugMolecule2.add(this.models.molecule2.rotation, 'x', -10, 10, 0.01)
    this.debugMolecule2.add(this.models.molecule2.rotation, 'y', -10, 10, 0.01)
    this.debugMolecule2.add(this.models.molecule2.rotation, 'z', -10, 10, 0.01)

    this.moleculeScale2 = 0.4

    this.debugMolecule2
      .add(this, 'moleculeScale2', 0, 5, 0.01)
      .onChange((val) => this.models.molecule2.scale.set(val, val, val))

    this.scene.add(this.models.molecule2)
  }

  /* Vectors */

  #addArrowVector() {
    this.vectors.arrow = this.context.vectors.arrow.clone()

    /* Positioning */

    // this.vectors.arrow.position.x = Math.PI * 0.5

    this.debugArrow = this.debugMehes.addFolder('Arrow')

    this.debugArrow.add(this.vectors.arrow.position, 'x', -10, 10, 0.01)
    this.debugArrow.add(this.vectors.arrow.position, 'y', -10, 10, 0.01)
    this.debugArrow.add(this.vectors.arrow.position, 'z', -10, 10, 0.01)

    this.debugArrow.add(this.vectors.arrow.rotation, 'x', -10, 10, 0.01)
    this.debugArrow.add(this.vectors.arrow.rotation, 'y', -10, 10, 0.01)
    this.debugArrow.add(this.vectors.arrow.rotation, 'z', -10, 10, 0.01)

    this.arrowScale = 0.008

    this.debugArrow
      .add(this, 'arrowScale', 0, 0.02, 0.0001)
      .onChange((val) =>
        this.vectors.arrow.children[0].scale.set(val, val, val)
      )

    this.scene.add(this.vectors.arrow)
  }
}
