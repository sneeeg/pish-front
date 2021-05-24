import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * David model
 */
export default {
  name: 'david',
  path: MODELS_PATH + '/david.drc',
  textures: ['matcap_white2'],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      matcap: context.textures.matcap_white2,
      color: new THREE.Color(0xffffff),
    }

    const material = new THREE.MeshMatcapMaterial(materialParams)

    return centerMesh(new THREE.Mesh(geometry, material))
  },
}
