precision mediump float;
varying vec4 vColor;
varying vec3 pos;
varying float t;
uniform float radius1;
varying vec4 o;

void main() {
  float sTime = sin(pos.y * 0.1 + radius1 + t);
  float cTime = cos(pos.y * 0.2 + t);
  float tTime = tan(pos.z * 0.2 + t);
  vec4 finalColor = vColor * o.x + vColor * vec4(sTime, tTime, cTime, 1.0) * o.y;
  gl_FragColor = finalColor;
}