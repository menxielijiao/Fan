import * as THREE from "three"
import Common from "./Common"
import gsap from "gsap"

export default class Box {
  constructor() {
    this.meshArray = []
    this.boxGroup = new THREE.Group()
    this.radius = 2
    this.ballPosArray = []
    this.init()
  }

  init() {
    this.geometry = new THREE.BoxGeometry(0.1,0.1,0.1)
    this.material = new THREE.MeshLambertMaterial({
      color: 0xe7e7eb, // rgb(231, 231, 235)
      // wireframe: true
    })
    for(let i=0; i<5; i++) {
      for(let j=0; j<5; j++) {
        for(let k=0; k<5; k++) {
          const mesh = new THREE.Mesh(this.geometry, this.material)
          // this.mesh.position.set(i/10,j/10,-20+k/10)
          mesh.position.set(i-2,j-2,k-2)
          mesh.castShadow = true
          // this.mesh.rotation.z = Math.PI / 4
          // this.mesh.rotation.x = Math.PI / 4
          this.meshArray.push({
            x: mesh.position.x,
            y: mesh.position.y,
            z: mesh.position.z,
          })
          // this.boxGroup.add(this.meshArray[(i*25) + (j*5) + k])
          this.boxGroup.add(mesh)
          // Common.scene.add(mesh)
        }
      }
    }
    // console.log(this.boxGroup)
    this.boxGroup.position.set(0, 0, -55)
    Common.scene.add(this.boxGroup)
    this.setBallPos()
    // console.log(this.meshArray)
  }

  update() {
    // this.mesh.rotation.z += Common.time.delta / 3
    // this.meshArray.forEach((box) => {
    //   box.rotation.y += Common.time.delta / 3
    // })

    this.boxGroup.rotation.y += Common.time.delta / 4
    this.boxGroup.rotation.z += Common.time.delta / 5
  }

  setBallPos() {
    for(let i=0; i<10; i++) {
      for(let j=0; j<10; j++) {
        this.ballPos(0,0,Math.PI * 2,Math.PI,this.radius,10,10,i,j)
      }
    }
  }

  ballPos(phiStart,thetaStart,phiLength,thetaLength,sRadius,widthSegments,heightSegments,i,g) {
    let u = g / widthSegments
    let v = i / heightSegments

    const b_x = - sRadius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength )
    const b_y = sRadius * Math.cos( thetaStart + v * thetaLength )
    const b_z = sRadius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength )

    this.ballPosArray.push({
      x:b_x,
      y:b_y,
      z:b_z
    })
  }

  changeBallPos() {
    for(let i=0; i<this.boxGroup.children.length; i++) {
      if(i >= 100) {
        gsap.to(this.boxGroup.children[i].position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
          ease: 'Power3.easeInOut',
        })
        continue
      }
      gsap.to(this.boxGroup.children[i].position, {
        x: this.ballPosArray[i].x,
        y: this.ballPosArray[i].y,
        z: this.ballPosArray[i].z,
        duration: 0.5,
        ease: 'Power3.easeInOut',
      })
    }

    gsap.to(this.boxGroup.position, {
      x: 0,
      y: 0,
      z: -35,
      duration: 0.5,
      ease: 'Power3.easeInOut',
    })
  }

  changeBoxPos() {
    this.boxGroup.children.forEach((box, i) => {
      gsap.to(box.position, {
        x: this.meshArray[i].x,
        y: this.meshArray[i].y,
        z: this.meshArray[i].z,
        duration: 0.8,
        ease: 'Power3.easeInOut',
      })
    })

    gsap.to(this.boxGroup.position, {
      x: 0,
      y: 0,
      z: -55,
      duration: 0.8,
      ease: 'Power3.easeInOut',
    })
  }

}
