import * as THREE from "three"

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.spotLight = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null
    }

    this.clock = null

    this.time = {
      total: null,
      delta: null
    }
    this.stats = null

  }

  init($canvas) {
    this.setSize()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, -400)
    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      // antialias: true
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x000000)
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(this.size.windowW, this.size.windowH)
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    // this.helper = new THREE.AxesHelper(50)
    // this.scene.add(this.helper)

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight
    }
  }

  resize(){
    this.setSize();
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render(){
    this.time.delta = this.clock.getDelta()
    this.time.total += this.time.delta
    this.renderer.render(this.scene, this.camera)
  }

}

export default new Common()