import Common from "./Common"
// import RectLight from "./RectAreaLight"
import Propeller from "./Propeller"
// import Plane from "./Plane"
import Stats from "./Stats"

export default class MyGL {

  constructor(props) {
    this.props = props
    this.stats = new Stats()
    this.init()
  }

  init() {
    const _this = this
    const img = document.getElementById('ota-img')
    img.originSrc = img.src
    img.src = ''
    img.addEventListener('load', function() {
      Common.init(_this.props.$canvas)
      // this.restLight = new RectLight(0x990094, [0,5,5])
      // this.plane = new Plane()

      _this.propeller = new Propeller()
      _this.propeller.init()
      window.addEventListener("resize", _this.resize.bind(_this))
      _this.stats.init()
      _this.loop()
    })

    img.src = img.originSrc
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
