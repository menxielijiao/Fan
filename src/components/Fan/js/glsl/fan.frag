precision mediump float;
varying vec4 vColor;
varying vec3 pos;
varying float t;
uniform float radius1;

void main() {
  float sTime = sin(pos.y * 0.1 + radius1);
  float cTime = cos(pos.y * 0.2 + t);
  float tTime = tan(pos.z * 0.2 + t);
  gl_FragColor = vec4(sTime, tTime, cTime, 1.0);
  // gl_FragColor = vec4(vColor.r * sin(pos.x + t), vColor.g * cos(pos.y + t), vColor.b * sin(t), vColor.a);
  // gl_FragColor = vec4(vColor);
}