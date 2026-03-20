import { useFrame } from "@react-three/fiber";
import { useMemo, useCallback } from "react";
import * as THREE from "three";

type UniformValue =
  | number
  | number[]
  | THREE.Vector2
  | THREE.Vector3
  | THREE.Color
  | THREE.Texture;

interface UniformDefinition {
  value: UniformValue;
}

type UniformsConfig = Record<string, UniformDefinition>;

interface UseShaderMaterialOptions<T extends UniformsConfig> {
  vertexShader: string;
  fragmentShader: string;
  uniforms?: T;
  transparent?: boolean;
  side?: THREE.Side;
  blending?: THREE.Blending;
}

interface UseShaderMaterialReturn {
  material: THREE.ShaderMaterial;
  setUniform: (name: string, value: UniformValue) => void;
}

/**
 * useShaderMaterial - Generic hook for creating and managing ShaderMaterial
 *
 * Features:
 * - Automatic uTime uniform update each frame
 * - Type-safe uniform management
 * - Memoized material creation
 * - Helper to update uniforms at runtime
 *
 * @example
 * ```tsx
 * const { material, setUniform } = useShaderMaterial({
 *   vertexShader: myVertShader,
 *   fragmentShader: myFragShader,
 *   uniforms: {
 *     uColor: { value: [1, 0, 0] },
 *     uIntensity: { value: 1.0 },
 *   },
 * });
 *
 * // Update uniform at runtime
 * setUniform('uIntensity', 0.5);
 * ```
 */
export function useShaderMaterial<T extends UniformsConfig>({
  vertexShader,
  fragmentShader,
  uniforms = {} as T,
  transparent = true,
  side = THREE.FrontSide,
  blending = THREE.NormalBlending,
}: UseShaderMaterialOptions<T>): UseShaderMaterialReturn {
  // Create material with uniforms (memoized)

  const material = useMemo(() => {
    // Convert uniform values to Three.js format
    const threeUniforms: Record<string, { value: unknown }> = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    // Add custom uniforms
    for (const [key, def] of Object.entries(uniforms)) {
      if (Array.isArray(def.value)) {
        // Convert arrays to appropriate Three.js types
        if (def.value.length === 2) {
          threeUniforms[key] = { value: new THREE.Vector2(...def.value) };
        } else if (def.value.length === 3) {
          threeUniforms[key] = { value: new THREE.Vector3(...def.value) };
        } else {
          threeUniforms[key] = { value: def.value };
        }
      } else {
        threeUniforms[key] = { value: def.value };
      }
    }

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: threeUniforms,
      transparent,
      side,
      blending,
      depthWrite: false,
      depthTest: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- uniforms object recreated every render; values are consumed once at creation
  }, [vertexShader, fragmentShader, transparent, side, blending]);

  // Update uTime each frame
  useFrame(({ clock, size }) => {
    if (material) {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uResolution.value.set(size.width, size.height);
    }
  });

  // Helper to update uniforms at runtime
  const setUniform = useCallback(
    (name: string, value: UniformValue) => {
      if (material?.uniforms[name]) {
        if (Array.isArray(value)) {
          const uniform = material.uniforms[name].value;
          if (uniform instanceof THREE.Vector2) {
            uniform.set(value[0], value[1]);
          } else if (uniform instanceof THREE.Vector3) {
            uniform.set(value[0], value[1], value[2]);
          } else {
            material.uniforms[name].value = value;
          }
        } else {
          material.uniforms[name].value = value;
        }
      }
    },
    [material]
  );

  return { material, setUniform };
}
