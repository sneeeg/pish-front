import * as THREE from 'three'
import { MODELS_PATH } from '~/assets/js/motion/utils/constants'
import centerMesh from '~/assets/js/motion/utils/center-mesh'

/**
 * Dna model
 */
export default {
  name: 'dna',
  path: MODELS_PATH + '/dna.drc',
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
