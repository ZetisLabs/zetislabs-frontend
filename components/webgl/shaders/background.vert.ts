/**
 * Background Vertex Shader
 *
 * Handles instanced rendering of background grid cells.
 * Passes position and per-instance data to fragment shader.
 */

export const backgroundVertexShader = /* glsl */ `
// Per-instance attributes (from useInstancedGrid)
// Note: position, uv, projectionMatrix, modelViewMatrix are auto-injected by Three.js
attribute vec2 aOffset;      // Cell position offset
attribute float aIndex;      // Normalized index (0-1)
attribute vec2 aSeeds;       // Random seeds for variation
attribute vec2 aGridPos;     // Grid coordinates (col/cols, row/rows)

// Uniforms
uniform float uTime;
uniform vec2 uResolution;

// Varyings (passed to fragment shader)
varying vec2 vUv;
varying vec2 vPosition;      // World position of cell
varying float vIndex;
varying vec2 vSeeds;
varying vec2 vGridPos;

void main() {
  // Calculate world position (instance offset + vertex position)
  vec3 worldPos = vec3(aOffset + position.xy, 0.0);

  // Convert world position to screen-space pixels (0 to resolution)
  // Camera is centered: world coords go from -halfSize to +halfSize
  // Screen coords go from 0 to resolution
  vec2 screenPos = aOffset + uResolution * 0.5;

  // Pass data to fragment shader
  vUv = uv;
  vPosition = screenPos;
  vIndex = aIndex;
  vSeeds = aSeeds;
  vGridPos = aGridPos;

  // Final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
}
`;
