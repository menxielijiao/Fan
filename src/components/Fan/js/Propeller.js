import * as THREE from "three"
import Common from "./Common"
import Ota from "./Ota"
import vertixShader from "./glsl/fan.vert"
import fragmentShader from "./glsl/fan.frag"

export default class Proppeller {
  constructor() {
    this.geometry = null
    this.material = null
    this.positions = []
    this.colors = []
    this.otaPosi = []
    this.otaCol = []
    this.sizeX = 30
    this.sizeY = 117
    this.parentGroup = new THREE.Group()
    this.group1 = new THREE.Group()
    this.group2 = new THREE.Group()
    this.group3 = new THREE.Group()
    this.uniforms = null
    this.check = 2
    this.type = null
    this.radius = new THREE.Vector4(0, 0, 0, 0)

    this.updateOk = false
  }

  init() {
    this.setData()

    this.ota = new Ota()
    this.ota.loadTexture()
    this.otaPosi = this.ota.positions
    this.otaCol = this.ota.colors

    this.setMeshObj()
  }

  setData() {
    this.size = this.sizeX * this.sizeY
    for(let i=0; i<this.size; i++) {
      // position
      const x = i % this.sizeX - (this.sizeX / 2)
      const y = Math.floor(i / this.sizeX) - (this.sizeY / 2)
      const z = 0.0
      this.positions.push(x)
      this.positions.push(y)
      this.positions.push(z)

      // color
      this.colors.push(Math.random() * 255)
      this.colors.push(Math.random() * 255)
      this.colors.push(Math.random() * 255)
      this.colors.push(255)
    }
  }

  update() {
    // if(!this.updateOk) return false
    switch(this.check) {
      case 1:

        break
      case 2:
        this.group1.rotation.z += Math.PI / 12
        this.group2.rotation.z += Math.PI / 12
        this.group3.rotation.z += Math.PI / 12
        this.parentGroup.rotation.y = Math.sin(Common.clock.oldTime / 1000) * Math.PI / 3
        break
      case 3:
        this.group1.rotation.z += Math.PI / 10
        this.group2.rotation.z += Math.PI / 12
        this.group3.rotation.z += Math.PI / 14
        this.parentGroup.rotation.y = Math.sin(Common.clock.oldTime / 1000) * Math.PI / 3
        break
      default:
        break
    }

    // this.parentGroup.rotation.y = Math.sin(Common.clock.oldTime / 1000) * Math.PI / 3
    this.uniforms.time.value = Common.time.total
    this.uniforms.time.value = Common.clock.oldTime * 0.001

    this.uniforms.radius1.value = this.group1.rotation.z % (Math.PI)
    // this.judgeRadius()
  }

  clickEvent(n) {
    this.check = n
    console.log(this.group1.rotation.z % (Math.PI))
    if(this.check === 2) {
      this.group1.rotation.z = 0
      this.group2.rotation.z = Math.PI * 2 / 3 * 1
      this.group3.rotation.z = Math.PI * 2 / 3 * 2
    }
  }

  setMeshObj() {
    this.geometry = new THREE.BufferGeometry()
    this.posAttrib = new THREE.Float32BufferAttribute(this.positions, 3)
    this.colAttrib = new THREE.Uint8BufferAttribute(this.colors, 4)
    // ota
    // this.otaColorAttrib1 = new THREE.Uint8BufferAttribute(this.ota.color1, 4)
    // this.otaColorAttrib2 = new THREE.Uint8BufferAttribute(this.ota.color2, 4)
    // this.otaColorAttrib3 = new THREE.Uint8BufferAttribute(this.ota.color3, 4)
    // this.otaColorAttrib4 = new THREE.Uint8BufferAttribute(this.ota.color4, 4)
    // this.otaColorAttrib5 = new THREE.Uint8BufferAttribute(this.ota.color5, 4)

    this.colAttrib.normalized = true
    this.geometry.setAttribute('position', this.posAttrib)
    this.geometry.setAttribute('color', this.colAttrib)
    // ota
    // this.geometry.setAttribute('otaColor1', this.otaColorAttrib1)
    // this.geometry.setAttribute('otaColor2', this.otaColorAttrib2)
    // this.geometry.setAttribute('otaColor3', this.otaColorAttrib3)
    // this.geometry.setAttribute('otaColor4', this.otaColorAttrib4)
    // this.geometry.setAttribute('otaColor5', this.otaColorAttrib5)

    this.uniforms = {
      time: {
        value: Common.time.total
      },
      radius1: {
        value: 0
      },
      // radius2: {
      //   value: new THREE.Vector4(0, 0, 0, 0)
      // }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertixShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
    })

    for(let i=0; i<3; i++) {
      this.points = new THREE.Points(this.geometry, this.material)
      this.points.position.set(0, 55, -50)

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

  judgeRadius() {
    const z = this.group1.rotation.z % (Math.PI)
    const r = Math.PI * 5/6
    if(0 <= z && z < 1 / r) {
      this.uniforms.radius1.value = new THREE.Vector4(1, 0, 0, 0)
      this.uniforms.radius2.value = new THREE.Vector4(0, 0, 0, 0)
    }
    if(1 / r <= z && z < 2 / r) {
      this.uniforms.radius1.value = new THREE.Vector4(0, 1, 0, 0)
      this.uniforms.radius2.value = new THREE.Vector4(0, 0, 0, 0)
    }
    if(2 / r <= z && z < 3 / r) {
      this.uniforms.radius1.value = new THREE.Vector4(0, 0, 1, 0)
      this.uniforms.radius2.value = new THREE.Vector4(0, 0, 0, 0)
    }
    if(3 / r <= z && z < 4 / r) {
      this.uniforms.radius1.value = new THREE.Vector4(0, 0, 0, 1)
      this.uniforms.radius2.value = new THREE.Vector4(0, 0, 0, 0)
    }
    if(4 / r <= z && z < r) {
      this.uniforms.radius1.value = new THREE.Vector4(0, 0, 0, 0)
      this.uniforms.radius2.value = new THREE.Vector4(1, 0, 0, 0)
    }
  }
}