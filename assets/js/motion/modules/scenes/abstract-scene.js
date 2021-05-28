import * as THREE from 'three'
import { COLOR_GREY } from '~/assets/js/motion/utils/constants'

/**
 * Abstract class for scenes
 */
export default class AbstractScene {
  /* Dev controls */
  controls = null
  axesHelper = null

  context // Motion context

  canvas // DOM canvas

  /* THREE fields */
  scene
  camera
  renderer

  /* Responsive */
  sizes = { width: 0, height: 0 }

  container // Node container for canvas

  /**
   * ConstructorParameters
   * @param context {Object} - Motion context
   */
  constructor(context) {
    this.context = context
  }

  /* Public */

  createWorld() {
    /* Scene */
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(COLOR_GREY)

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      1,
      1000
    )
    this.camera.position.z = 3 // Camera z
    this.scene.add(this.camera)

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.context.nuxt.store.state.responsive.device.isMobile,
    })

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.setRendererPixelRatio()

    // this.renderer.outputEncoding = THREE.sRGBEncoding // Renderer encoding

    /* Adding renderer to DOM */
    this.renderer.domElement.classList.add('motion-canvas')
    this.container.appendChild(this.renderer.domElement)
  }

  renderWorld() {
    this.controls?.update()
    this.renderer.render(this.scene, this.camera)
  }

  destroyWorld() {
    this.container.removeChild(this.renderer.domElement)

    this.renderer = null
    this.camera = null
    this.controls = null
    this.scene = null
  }

  resizeHandler = () => {
    this.sizes.width = this.container.offsetWidth
    this.sizes.height = this.container.offsetHeight

    this.camera.aspect = this.sizes.width / this.sizes.height

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.camera.updateProjectionMatrix()
    this.setRendererPixelRatio()
  }

  controlsActivationHandler = (event) => {
    if (event.code !== 'NumpadSubtract') return

    /* Orbit controls */
    if (this.controls) {
      this.renderer.domElement.classList.remove('_controls-active')
      this.controls?.dispose()

      this.controls = null
    } else {
      import('three/examples/jsm/controls/OrbitControls').then(
        ({ OrbitControls }) => {
          this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
          )

          this.renderer.domElement.classList.add('_controls-active')
          this.controls.update()
        }
      )
    }

    /* Axes helper */
    if (this.axesHelper) {
      this.scene.remove(this.axesHelper)
      this.axesHelper = null
    } else {
      this.axesHelper = new THREE.AxesHelper(2)
      this.scene.add(this.axesHelper)
    }
  }

  startMainEventsHandling() {
    /* Resize */
    this.resizeHandler()
    window.addEventListener('resize', this.resizeHandler)

    /* Controls */
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keypress', this.controlsActivationHandler)
    }
  }

  stopMainEventsHandling() {
    /* Resize */
    window.removeEventListener('resize', this.resizeHandler)

    /* Controls */
    if (process.env.NODE_ENV === 'development') {
      window.removeEventListener('keypress', this.controlsActivationHandler)
    }
  }

  setRendererPixelRatio() {
    this.renderer.setPixelRatio(
      Math.min(this.context.nuxt.store.state.responsive.device.pixelRatio, 2)
    )
  }
}
