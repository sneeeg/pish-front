import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'

/**
 * Molecule model
 */
export default {
  name: 'molecule',
  path: MODELS_PATH + '/molecule.drc',
  textures: [],
  setup(geometry) {
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
