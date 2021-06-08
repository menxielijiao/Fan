import Common from "./Common"
// import RectLight from "./RectAreaLight"
import Propeller from "./Propeller"
// import Plane from "./Plane"
import Stats from "./Stats"
// import { TWEEN } from './jsm/libs/tween.module.min.js'

export default class MyGL {

  constructor(props) {
    this.props = props
    this.stats = new Stats()
    this.init()
  }

  init() {
    Common.init(this.props.$canvas)
    // this.restLight = new RectLight(0x990094, [0,5,5])
    this.propeller = new Propeller()
    this.propeller.init()
    // this.plane = new Plane()
    window.addEventListener("resize", this.resize.bind(this))
    this.stats.init()
    this.loop()
  }

  resize(){
    Common.resize();
  }

  loop(){
    this.stats.updateBegin()
    this.render()
    this.stats.updateEnd()
    requestAnimationFrame(this.loop.bind(this));
  }

  render(){
    Common.render()
    this.propeller.update()
  }

  clickEvent(n) {
    this.propeller.clickEvent(n)
  }
}
