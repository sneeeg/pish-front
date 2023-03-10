import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * David model
 */
export default {
  name: 'david',
  path: MODELS_PATH + '/david.drc',
  textures: ['color_plastic'],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      map: context.textures.color_plastic,
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x878787),
      metalness: 0,
    }

    const material = new THREE.MeshStandardMaterial(materialParams)

    return centerMesh(new THREE.Mesh(geometry, material))
  },
}
