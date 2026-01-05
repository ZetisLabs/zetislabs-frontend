/**
 * GLSL Color Utility Functions
 *
 * HSL to RGB conversion and color manipulation helpers.
 */

export const hslGLSL = /* glsl */ `
// ============================================================================
// COLOR FUNCTIONS
// ============================================================================

// Helper function for HSL to RGB conversion
float hue2rgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 1.0 / 2.0) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

// Convert HSL to RGB
// h, s, l are in range [0, 1]
vec3 hsl2rgb(float h, float s, float l) {
  vec3 rgb;

  if (s == 0.0) {
    rgb = vec3(l); // achromatic
  } else {
    float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
    float p = 2.0 * l - q;
    rgb.r = hue2rgb(p, q, h + 1.0 / 3.0);
    rgb.g = hue2rgb(p, q, h);
    rgb.b = hue2rgb(p, q, h - 1.0 / 3.0);
  }

  return rgb;
}

// Convert HSL to RGB (vec3 input)
vec3 hsl2rgb(vec3 hsl) {
  return hsl2rgb(hsl.x, hsl.y, hsl.z);
}

// Linear interpolation between two colors
vec3 mixColors(vec3 a, vec3 b, float t) {
  return mix(a, b, smoothstep(0.0, 1.0, t));
}

// Adjust color brightness
vec3 adjustBrightness(vec3 color, float amount) {
  return clamp(color + amount, 0.0, 1.0);
}

// Adjust color saturation
vec3 adjustSaturation(vec3 color, float amount) {
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(vec3(gray), color, 1.0 + amount);
}
`;
