import * as THREE from "three"
import Common from "./Common"
import vertixShader from "./glsl/fan.vert"
import fragmentShader from "./glsl/fan.frag"

export default class Ota {
  constructor() {
    this.url = "/img/otaku_otagei.png"
    this.positions = []
    this.colors = []
    this.texture = null
    this.imgCtx = null
    this.imgWidth = 150
    this.imgHeight = 117
    this.imgData = null
    this.uniforms = null
    this.loadOK = false

    this.color1 = []
    this.color2 = []
    this.color3 = []
    this.color4 = []
    this.color5 = []

    // this.loadTexture()
  }

  init() {
    const imgCanvas = document.createElement('canvas')
    imgCanvas.width = this.imgWidth
    imgCanvas.height = this.imgHeight
    this.imgCtx = imgCanvas.getContext('2d')

    this.imgCtx.drawImage(this.texture, 0, 0)
    this.imgData = this.imgCtx.getImageData(0, 0, this.imgWidth, this.imgHeight).data

    for(let i=0; i<this.imgHeight; i++) {
      for(let j=0; j<this.imgWidth; j++) {
        // color
        const cr = (i*this.imgWidth+j) * 4
        const cg = (i*this.imgWidth+j) * 4 + 1
        const cb = (i*this.imgWidth+j) * 4 + 2
        const ca = (i*this.imgWidth+j) * 4 + 3

        this.colors.push(this.imgData[cr])
        this.colors.push(this.imgData[cg])
        this.colors.push(this.imgData[cb])
        this.colors.push(this.imgData[ca])

        // this.fenbieColors(j, cr, cg, cb, ca)

        // position
        const x = j - this.imgWidth / 2
        const y = -i + this.imgHeight / 2
        const z = 0.0

        this.positions.push(x)
        this.positions.push(y)
        this.positions.push(z)
      }
    }

    // this.setMesh()
  }

  loadTexture() {
    this.texture = document.getElementById('ota-img')
      this.loadOK = true
      this.init()
  }

  setMesh() {
    this.geometry = new THREE.BufferGeometry()
    this.positionAttrib = new THREE.Float32BufferAttribute(this.positions, 3)
    this.colorAttrib = new THREE.Uint8BufferAttribute(this.colors, 4)
    this.colorAttrib.normalized = true
    this.geometry.setAttribute('position', this.positionAttrib)
    this.geometry.setAttribute('color', this.colorAttrib)
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
    this.mesh = new THREE.Points(this.geometry, this.material)
    Common.scene.add(this.mesh)
  }

  update() {
    this.uniforms.time.value = Common.clock.oldTime * 0.001
  }

  fenbieColors(j, cr, cg, cb, ca) {
    if(0 <= j && j < 30) {
      this.color1.push(this.imgData[cr])
      this.color1.push(this.imgData[cg])
      this.color1.push(this.imgData[cb])
      this.color1.push(this.imgData[ca])
    }
    if(30 <= j && j < 60) {
      this.color2.push(this.imgData[cr])
      this.color2.push(this.imgData[cg])
      this.color2.push(this.imgData[cb])
      this.color2.push(this.imgData[ca])
    }
    if(60 <= j && j < 90) {
      this.color3.push(this.imgData[cr])
      this.color3.push(this.imgData[cg])
      this.color3.push(this.imgData[cb])
      this.color3.push(this.imgData[ca])
    }
    if(90 <= j && j < 120) {
      this.color4.push(this.imgData[cr])
      this.color4.push(this.imgData[cg])
      this.color4.push(this.imgData[cb])
      this.color4.push(this.imgData[ca])
    }
    if(120 <= j && j < 150) {
      this.color5.push(this.imgData[cr])
      this.color5.push(this.imgData[cg])
      this.color5.push(this.imgData[cb])
      this.color5.push(this.imgData[ca])
    }

  }
}