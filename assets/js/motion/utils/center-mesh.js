import * as THREE from 'three'

const centerMesh = (mesh) => {
  const center = new THREE.Vector3()

  mesh.geometry.computeBoundingBox()
  mesh.geometry.boundingBox.getCenter(center)
  mesh.geometry.center()
  mesh.position.copy(center)

  return mesh
}

export default centerMesh
