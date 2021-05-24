import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * Dna model
 */
export default {
  name: 'dna',
  path: MODELS_PATH + '/dna.drc',
  textures: ['matcap_white'],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      matcap: context.textures.matcap_white,
      color: new THREE.Color(0xfafafa),
    }

    const material = new THREE.MeshMatcapMaterial(materialParams)

    return centerMesh(new THREE.Mesh(geometry, material))
  },
}
