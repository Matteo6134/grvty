uniform float u_time;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_speed;
uniform vec3 u_colorStart;
uniform vec3 u_colorMid;
uniform vec3 u_colorEnd;
uniform float u_opacity;

varying vec2 vUv;

void main() {
  float wave = sin(vUv.x * u_frequency + u_time * u_speed) * u_amplitude;
  float t = vUv.y + wave;
  t = clamp(t, 0.0, 1.0);

  vec3 color;
  if (t < 0.5) {
    color = mix(u_colorStart, u_colorMid, t * 2.0);
  } else {
    color = mix(u_colorMid, u_colorEnd, (t - 0.5) * 2.0);
  }

  gl_FragColor = vec4(color, u_opacity);
}
