import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'

/**
 * Books model
 */
export default {
  name: 'books',
  path: MODELS_PATH + '/books.drc',
  textures: [],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      roughness: 0,
      metalness: 0.56,
      emissive: new THREE.Color(0x5c5c5c),
      color: new THREE.Color(0xffffff),
    }

    const material = new THREE.MeshStandardMaterial(materialParams)

    return new THREE.Mesh(geometry, material)
  },
}
