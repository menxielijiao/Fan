attribute vec4 color;
// attribute vec4 otaColor1;
// attribute vec4 otaColor2;
// attribute vec4 otaColor3;
// attribute vec4 otaColor4;
// attribute vec4 otaColor5;
varying vec4 vColor;
varying vec3 pos;

uniform float radius1;

uniform float time;
varying float t;

void main() {
  // vColor = otaColor1 * radius1.r + otaColor2 * radius1.g + otaColor3 * radius1.b + otaColor4 * radius1.a + otaColor1 * radius2.a;
  vColor = vec4(color.r, color.g, color.b, color.a);
  t = time;
  pos = vec3(position.x * clamp(tan(sin(t * 0.1) * 5.0), -5.0, 5.0), position.y * cos(t * 0.3), abs(position.y * 0.05));
  // pos = vec3(position.x * sin(tan(t * 0.1) * 5.0), position.y * cos(t * 0.3), abs(position.y * 0.05));
  gl_PointSize = 5.0; // 2.5 3.3
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, pos.y, pos.z, 1.0);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}