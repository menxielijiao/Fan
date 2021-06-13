attribute vec4 color;
varying vec4 vColor;
varying vec3 pos;

uniform vec4 ota;
varying vec4 o;

uniform float time;
varying float t;

void main() {
  // vColor = otaColor1 * radius1.r + otaColor2 * radius1.g + otaColor3 * radius1.b + otaColor4 * radius1.a + otaColor1 * radius2.a;
  vColor = vec4(color.r, color.g, color.b, color.a);
  o = ota;
  t = time;
  pos = vec3(position.x * clamp(tan(sin(t * 0.1) * 5.0), -5.0, 5.0), position.y * cos(t * 0.3), abs(position.y * 0.05));
  // pos = vec3(position.x * tan(sin(t * 0.1) * 5.0), position.y * cos(t * 0.3), abs(position.y * 0.05));
  // pos = vec3(position.x * sin(tan(t * 0.1) * 5.0), position.y * cos(t * 0.3), abs(position.y * 0.05));
  gl_PointSize = 3.0; // 2.5 3.3
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, pos.y, pos.z, 1.0);
  vec4 finalPos = vec4(position, 1.0) * ota.x + vec4(pos, 1.0) * ota.y;
  gl_Position = projectionMatrix * modelViewMatrix * finalPos;
}