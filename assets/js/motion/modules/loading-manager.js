import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { DRACO_DECODER_PATH } from '~/assets/js/motion/utils/constants'
import models from '~/assets/js/motion/composables/models/index'
import textures from '~/assets/js/motion/composables/textures'
import vectors from '~/assets/js/motion/composables/vectors/index'

/**
 * Responsible for loading resources
 */
export default class LoadingManager {
  context
  #dracoLoader = new DRACOLoader()
  #textureLoader = new THREE.TextureLoader()
  #svgLoader = new SVGLoader()

  /**
   * Constructor
   * @param context {Object} - Motion context
   */
  constructor(context) {
    this.context = context
    this.#setupDracoLoader()
  }

  /* Public */

  async load({ modelsToLoad, vectorsToLoad, videosToLoad }) {
    const promises = []
    const texturesToLoad = [] // textures to be loaded
    let needModelsWarning = false // true new models loaded

    /* Loading models */
    modelsToLoad.forEach((model) => {
      if (this.context.models[model]) return // return if model already exist

      model = models[model]

      needModelsWarning = false

      /* Add model textures to load */
      model.textures.forEach((texture) => {
        if (this.context.textures[texture]) return
        texturesToLoad.push(textures[texture])
      })

      const modelPromise = new Promise((resolve) =>
        this.#dracoLoader.load(model.path, (geometry) =>
          resolve({
            modelName: model.name,
            geometry,
            setup: model.setup,
          })
        )
      )

      promises.push(modelPromise)
    })

    /* Loading textures */
    this.context.nuxt.$utils
      .getUniqueArrayOfObjects(texturesToLoad)
      .forEach((texture) => {
        const texturePromise = new Promise((resolve) => {
          this.#textureLoader.load(texture.path, (result) => {
            this.context.textures[texture.name] = result
            resolve()
          })
        })

        promises.push(texturePromise)
      })

    /* Loading vectors */
    vectorsToLoad &&
      vectorsToLoad.forEach((vectorToLoad) => {
        if (this.context.vectors[vectorToLoad] || !vectors[vectorToLoad]) {
          return
        }

        const vectorPromise = new Promise((resolve) =>
          this.#svgLoader.load(vectors[vectorToLoad].path, (data) => {
            this.context.vectors[vectors[vectorToLoad].name] =
              vectors[vectorToLoad].setup(data)
            resolve()
          })
        )

        promises.push(vectorPromise)
      })

    /* Loading videos */
    videosToLoad &&
      videosToLoad.forEach((videoToLoad) => {
        promises.push(
          this.context.nuxt.$axios.get(videoToLoad, { responseType: 'blob' })
        )
      })

    /* Result */
    const loadsReceived = await Promise.all(promises).then((values) => values)
    loadsReceived.forEach((value) => {
      // Set model to instance by setup
      if (value && value.modelName) {
        this.context.models[value.modelName] = value.setup(
          value.geometry,
          this.context
        )
      }
    })

    // await this.context.nuxt.$utils.delay(2000, true) // TEMP

    return needModelsWarning
  }

  /* Private */

  #setupDracoLoader() {
    this.#dracoLoader.setDecoderPath(DRACO_DECODER_PATH)
    this.#dracoLoader.preload()
  }
}
