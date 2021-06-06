import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { VECTORS_PATH, COLOR_BLUE } from '~/assets/js/motion/utils/constants'

/**
 * Arrow vector
 */
export default {
  name: 'arrow',
  path: VECTORS_PATH + '/arrow.svg',
  setup(data) {
    const paths = data.paths
    const group = new THREE.Group()

    /* Material */
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(COLOR_BLUE),
      side: THREE.DoubleSide,
      depthWrite: true,
      transparent: true,
    })

    paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path)

      shapes.forEach((shape) => {
        const geometry = new THREE.ShapeGeometry(shape)
        geometry.center()

        const mesh = new THREE.Mesh(geometry, material)
        mesh.scale.set(0.0038, 0.0038, 0.0038)

        group.add(mesh)
      })
    })

    group.rotation.x = Math.PI

    return group
  },
}
