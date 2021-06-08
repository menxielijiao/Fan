attribute vec4 color;
varying vec4 vColor;
varying vec3 pos;
uniform float time;
varying float t;

void main() {
  vColor = color;
  t = time;
  pos = vec3(position.x * clamp(tan(sin(t * 0.1) * 5.0), -8.0, 8.0), position.y * cos(t * 0.3), position.z);
  gl_PointSize = 2.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, pos.y, pos.z, 1.0);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x * clamp(tan(sin(t * 0.1) * 5.0), -8.0, 8.0), pos.y * cos(t * 0.3), pos.z, 1.0);
}