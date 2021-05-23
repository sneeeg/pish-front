import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'

/**
 * Numbers model
 */
export default {
  name: 'numbers',
  path: MODELS_PATH + '/numbers.drc',
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
