<template>
  <div id="webgl">
    <div class="nav">
      <ul>
        <!-- <li @click="cEvent(1)">Stop</li> -->
        <li @click="cEvent(2)">Normal</li>
        <li @click="cEvent(3)">Ota</li>
      </ul>
    </div>
    <canvas id="webgl_canvas" ref="canvas"></canvas>
    <img id="ota-img" src="img/otaku_otagei.png" style="display:none">
  </div>
</template>
<script>
import MyGL from "./js/MyGL"
export default {
  data() {
    return {
    }
  },
  mounted() {
    if(!this.MyGL) {
      this.MyGL = new MyGL({
        $canvas: this.$refs.canvas
      })
    }
  },
  methods: {
    cEvent(n) {
      this.MyGL.clickEvent(n)
    }
  }

}
</script>
<style scoped>
  #webgl {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .nav {
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgb(128, 126, 236);
  }
  .nav li {
    cursor: pointer;
    list-style: none;
    margin-top: 10px !important;
  }
  .nav li:hover {
    color: rgb(7, 93, 253);
  }
</style>
