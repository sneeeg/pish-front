import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * Satellite model
 */
export default {
  name: 'satellite',
  path: MODELS_PATH + '/satellite.drc',
  textures: [],
  setup(geometry) {
    /* Material */
    const materialParams = {
      roughness: 0.5,
      metalness: 0.2,
      color: new THREE.Color(0xffffff),
    }

    const material = new THREE.MeshStandardMaterial(materialParams)

    return centerMesh(new THREE.Mesh(geometry, material))
  },
}