import * as THREE from "three"
import Common from "./Common"
import Ota from "./Ota"
import vertixShader from "./glsl/fan.vert"
import fragmentShader from "./glsl/fan.frag"
import gsap from "gsap"

export default class Proppeller {
  constructor() {
    this.geometry = null
    this.material = null
    this.positions = []
    this.colors = []
    this.otaPosi = []
    this.otaCol = []
    this.sizeX = 30 // 30
    this.sizeY = 117
    this.parentGroup = new THREE.Group()
    this.group1 = new THREE.Group()
    this.group2 = new THREE.Group()
    this.group3 = new THREE.Group()
    this.uniforms = null
    this.check = 1
    this.type = null
    this.radius = new THREE.Vector4(0, 0, 0, 0)

    this.updateOk = false

    this.count = 0
  }

  init() {
    this.setData()

    this.ota = new Ota()
    this.ota.loadTexture()
    this.otaPosi = this.ota.positions
    this.otaCol = this.ota.colors
    // this.sizeY = this.ota.imgHeight

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
    switch(this.check) {
      case 1:
        this.group1.rotation.z += Math.PI / 150
        this.group2.rotation.z += Math.PI / 150
        this.group3.rotation.z += Math.PI / 150
        
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

    this.uniforms.time.value = Common.time.total
    this.uniforms.time.value = Common.clock.oldTime * 0.001

    this.uniforms.radius1.value = this.group1.rotation.z % (Math.PI)

    this.updateColor()
  }

  clickEvent(n) {
    this.check = n
    // console.log(this.group1.rotation.z % (Math.PI * 2))
    if(this.check === 1) {
      gsap.to(this.parentGroup.rotation, {
        y: 0,
        duration: 0.5,
        ease: 'Power3.easeInOut',
      })
      this.group1.rotation.z = 0
      this.group2.rotation.z = Math.PI * 2 / 3 * 1
      this.group3.rotation.z = Math.PI * 2 / 3 * 2
      this.uniforms.ota.value = new THREE.Vector4(1, 0, 0, 0)
    }
    if(this.check === 2) {
      this.group1.rotation.z = 0
      this.group2.rotation.z = Math.PI * 2 / 3 * 1
      this.group3.rotation.z = Math.PI * 2 / 3 * 2
      this.uniforms.ota.value = new THREE.Vector4(1, 0, 0, 0)
    }
    if(this.check === 3) {
      this.uniforms.ota.value = new THREE.Vector4(0, 1, 0, 0)
    }
  }

  setMeshObj() {
    this.geometry = new THREE.BufferGeometry()
    this.posAttrib = new THREE.Float32BufferAttribute(this.positions, 3)
    this.colAttrib = new THREE.Uint8BufferAttribute(this.colors, 4)

    this.colAttrib.normalized = true
    this.geometry.setAttribute('position', this.posAttrib)
    this.geometry.setAttribute('color', this.colAttrib)

    this.uniforms = {
      time: {
        value: Common.time.total
      },
      ota: {
        value: new THREE.Vector4(1, 0, 0, 0)
      },
      radius1: {
        value: 0
      }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertixShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      // blending: THREE.NormalBlending,
    })

    for(let i=0; i<3; i++) {
      this.points = new THREE.Points(this.geometry, this.material)
      // this.points.position.set(0, 67, -50)
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

    this.parentGroup.add(this.group1)
    this.parentGroup.add(this.group2)
    this.parentGroup.add(this.group3)
    Common.scene.add(this.parentGroup)
  }

  updateColor() {
    const colArr = this.group1.children[0].geometry.attributes.color.array
    const r = this.group1.rotation.z
    const rad = r % (Math.PI * 2)
    const w = Math.ceil((rad / (Math.PI * 2)) * this.ota.imgWidth)

    for(let i=0; i<this.sizeY; i++) {
      for(let j=0; j<this.sizeX; j++) {
        let n = (i * this.ota.imgWidth + w + j) * 4
  
        colArr[i * (this.sizeX * 4) + j * 4] = this.ota.imgData[n + 0]
        colArr[i * (this.sizeX * 4) + j * 4 + 1] = this.ota.imgData[n + 1]
        colArr[i * (this.sizeX * 4) + j * 4 + 2] = this.ota.imgData[n + 2]
        colArr[i * (this.sizeX * 4) + j * 4 + 3] = this.ota.imgData[n + 3]
      }
    }

    this.group1.children[0].geometry.attributes.color.needsUpdate = true
  }
}