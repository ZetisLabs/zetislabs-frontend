// WebGL Components
export { WebGLBackground } from "./WebGLBackground";
export { WebGLBackgroundLazy } from "./WebGLBackgroundLazy";
export { WebGLCanvas } from "./WebGLCanvas";

// Hooks
export { useShaderMaterial } from "./hooks/useShaderMaterial";
export { useInstancedGrid } from "./hooks/useInstancedGrid";

// Shaders (for custom animations)
export { backgroundVertexShader } from "./shaders/background.vert";
export { backgroundFragmentShader } from "./shaders/background.frag";
export { noiseGLSL } from "./shaders/includes/noise";
export { hslGLSL } from "./shaders/includes/hsl";
