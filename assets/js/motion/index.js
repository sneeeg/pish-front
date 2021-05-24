// import * as THREE from 'three'
import LoadingManager from '~/assets/js/motion/modules/loading-manager'
import presets from '~/assets/js/motion/composables/presets'

/* Scenes */
import Warming from '~/assets/js/motion/modules/scenes/warming'
import FirstScreen from '~/assets/js/motion/modules/scenes/first-screen'
import Dna from '~/assets/js/motion/modules/scenes/dna'

/**
 * Motion module
 * responsible for 3D and animation on the site
 * !! create only with webgl support
 */
export default class Motion {
  nuxt // Nuxt context

  #loadingManager // Loading manager

  textures = {} // Ready textures
  models = {} // Ready models
  vectors = {} // Ready vector images
  videos = {} // Ready videos

  currentPreset

  scenes = {} // Scene modules

  /**
   * ConstructorParameters
   * @param context { Object } - Nuxt context
   */
  constructor(context) {
    this.nuxt = context
    this.#loadingManager = new LoadingManager(this)

    /* Init scene modules */
    this.scenes = {
      warming: new Warming(this),
      firstScreen: new FirstScreen(this),
      dna: new Dna(this),
    }
  }

  /* Public */

  /**
   * Loading and warming up models due to preset
   * Returns a promise
   */
  async changePreset(routeName) {
    const preset = presets[routeName]
    if (!preset) return

    const needModelsWarming = await this.#loadingManager.load(preset)

    if (needModelsWarming) {
      await this.nuxt.$utils.delay(500) // DELAY

      this.scenes.warming.init(document.body)
      this.scenes.warming.start()

      await this.nuxt.$utils.delay(1000) // DELAY

      this.scenes.warming.destroy()
    }
  }
}
