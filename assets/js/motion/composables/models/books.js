import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'

/**
 * Books model
 */
export default {
  name: 'books',
  path: MODELS_PATH + '/books.drc',
  textures: ['color_plastic', 'roughness_plastic'],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      map: context.textures.color_plastic,
      roughnessMap: context.textures.roughness_plastic,
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x878787),
      emissiveIntensity: 1.075,
      roughness: 0,
      metalness: 0,
    }

    const material = new THREE.MeshStandardMaterial(materialParams)

    return new THREE.Mesh(geometry, material)
  },
}
