import * as THREE from "three"
import Common from "./Common"
import vertixShader from "./glsl/fan.vert"
import fragmentShader from "./glsl/fan.frag"

export default class Proppeller {
  constructor() {
    this.geometry = null
    this.material = null
    this.positions = []
    this.colors = []
    this.sizeX = 80
    this.sizeY = 20
    this.parentGroup = new THREE.Group()
    this.group1 = new THREE.Group()
    this.group2 = new THREE.Group()
    this.group3 = new THREE.Group()
    this.uniforms = null
    this.check = false
    this.type = null
  }

  init() {
    this.setData()
    this.geometry = new THREE.BufferGeometry()
    this.posAttrib = new THREE.Float32BufferAttribute(this.positions, 3)
    this.colAttrib = new THREE.Uint8BufferAttribute(this.colors, 4)
    this.colAttrib.normalized = true
    this.geometry.setAttribute('position', this.posAttrib)
    this.geometry.setAttribute('color', this.colAttrib)
    this.uniforms = {
      time: {
        value: Common.time.total
      }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertixShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    })

    for(let i=0; i<3; i++) {
      this.points = new THREE.Points(this.geometry, this.material)
      this.points.position.set(0, 34, -50)

      switch(i) {
        case 0:
          this.group1.add(this.points)
          break
        case 1:
          this.group2.add(this.points)
          this.group2.rotation.z = Math.PI * 2 / 3 * 1
          break
        case 2:
          this.group3.add(this.points)
          this.group3.rotation.z = Math.PI * 2 / 3 * 2
          break
        default:
          break
      }
    }

    // Common.scene.add(this.group1)
    // Common.scene.add(this.group2)
    // Common.scene.add(this.group3)
    this.parentGroup.add(this.group1)
    this.parentGroup.add(this.group2)
    this.parentGroup.add(this.group3)
    Common.scene.add(this.parentGroup)
    // this.parentGroup.rotation.x = Math.PI / 5
  }

  setData() {
    this.size = this.sizeX * this.sizeY
    for(let i=0; i<this.size; i++) {
      // position
      const x = i % this.sizeY - (this.sizeY / 2)
      const y = Math.floor(i / this.sizeY) - (this.sizeX / 2)
      const z = 0.0
      this.positions.push(x)
      this.positions.push(y)
      this.positions.push(z)

      // color
      this.colors.push(255)
      this.colors.push(255)
      this.colors.push(255)
      this.colors.push(255)
    }
  }

  update() {
    if(!this.check) {
      this.group1.rotation.z += Math.PI / 10
      this.group2.rotation.z += Math.PI / 10
      this.group3.rotation.z += Math.PI / 10
      // this.parentGroup.rotation.y += Math.sin(Common.clock.oldTime)
    }
    else {
      this.group1.rotation.z += Math.PI / 10
      this.group2.rotation.z += Math.PI / 12
      this.group3.rotation.z += Math.PI / 14
    }
    this.uniforms.time.value = Common.time.total
    this.uniforms.time.value = Common.clock.oldTime * 0.001
  }

  clickEvent(n) {
    switch(n) {
      case 1:
        this.check = false
        break
      case 2:
        this.check = false
        this.group1.rotation.z = 0
        this.group2.rotation.z = Math.PI * 2 / 3 * 1
        this.group3.rotation.z = Math.PI * 2 / 3 * 2
        break
      case 3:
        this.check = true
        break
      default:
        break
    }
  }
}