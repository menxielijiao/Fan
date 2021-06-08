precision mediump float;
varying vec4 vColor;
varying vec3 pos;
varying float t;

void main() {
  float sTime = sin(pos.y * 0.05 + t);
  float cTime = cos(pos.x * 0.08 + t);
  gl_FragColor = vec4(cTime, sTime, 1.0, vColor.a);
}