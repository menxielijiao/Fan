import * as THREE from "three"
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import Common from "./Common"

export default class RectAreaLight {
  constructor(color, posArray) {
    this.color = color
    this.posArray = posArray
    this.rectLight = null

    this.init()
  }

  init() {
    RectAreaLightUniformsLib.init()
    this.rectLight = new THREE.RectAreaLight(this.color, 5, 4, 10)
    this.rectLight.position.set(...this.posArray)
    Common.scene.add(this.rectLight)
    this.rectLight.add(new RectAreaLightHelper(this.rectLight))
  }
}