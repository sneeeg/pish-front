import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * Molecule2 model
 */
export default {
  name: 'molecule2',
  path: MODELS_PATH + '/molecule2.drc',
  textures: ['color_plastic', 'roughness_plastic'],
  setup(geometry, context) {
    /* Material */
    const materialParams = {
      map: context.textures.color_plastic,
      roughnessMap: context.textures.roughness_plastic,
      color: new THREE.Color(0xffffff),
      emissive: new THREE.Color(0x878787),
      roughness: 0,
      metalness: 0,
    }

    const material = new THREE.MeshStandardMaterial(materialParams)

    return centerMesh(new THREE.Mesh(geometry, material))
  },
}
