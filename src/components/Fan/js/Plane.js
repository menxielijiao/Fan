import * as THREE from "three"
import Common from "./Common"

export default class Box {
  constructor() {
    this.init()
  }

  init() {
    this.geometry = new THREE.BoxGeometry(2000, 0.1, 2000)
    this.material = new THREE.MeshStandardMaterial({
      color: 0x808080,
      roughness: 0.1,
      metalness: 0
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    // this.mesh.receiveShadow = true
    // this.mesh.rotation.x = Math.PI / 3
    // this.mesh.rotation.y = Math.PI / 3
    // this.mesh.position.set(0,-5,-3)
    Common.scene.add(this.mesh)
  }

}
