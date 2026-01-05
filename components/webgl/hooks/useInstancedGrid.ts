import { useMemo } from "react";
import * as THREE from "three";

interface GridConfig {
  /** Number of columns */
  cols: number;
  /** Number of rows */
  rows: number;
  /** Size of each cell in pixels */
  cellSize: number;
  /** Center the grid at origin (default: true) */
  centered?: boolean;
  /** Seed for deterministic random values (default: 12345) */
  seed?: number;
}

interface GridAttributes {
  /** Position offset for each cell (vec2) */
  aOffset: THREE.InstancedBufferAttribute;
  /** Cell index (float) */
  aIndex: THREE.InstancedBufferAttribute;
  /** Random seeds for noise/variation (vec2) */
  aSeeds: THREE.InstancedBufferAttribute;
  /** Column and row indices (vec2) */
  aGridPos: THREE.InstancedBufferAttribute;
}

interface UseInstancedGridReturn {
  /** Total number of instances */
  count: number;
  /** Instanced buffer attributes to attach to geometry */
  attributes: GridAttributes;
  /** Grid dimensions in world units */
  dimensions: { width: number; height: number };
}

/**
 * Simple seeded pseudo-random number generator
 */
function seededRandom(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return n - Math.floor(n);
}

/**
 * useInstancedGrid - Hook for creating instanced grid attributes
 *
 * Generates all the per-instance data needed for a grid animation:
 * - Positions (offsets from center)
 * - Indices (for staggering)
 * - Random seeds (for variation)
 * - Grid coordinates (col, row)
 *
 * All data is computed once and stored in GPU-friendly Float32Arrays.
 *
 * @example
 * ```tsx
 * const { count, attributes, dimensions } = useInstancedGrid({
 *   cols: 100,
 *   rows: 80,
 *   cellSize: 8,
 * });
 *
 * return (
 *   <instancedMesh args={[undefined, undefined, count]}>
 *     <planeGeometry args={[cellSize - 0.5, cellSize - 0.5]}>
 *       <primitive object={attributes.aOffset} attach="attributes-aOffset" />
 *       <primitive object={attributes.aSeeds} attach="attributes-aSeeds" />
 *     </planeGeometry>
 *   </instancedMesh>
 * );
 * ```
 */
export function useInstancedGrid({
  cols,
  rows,
  cellSize,
  centered = true,
  seed = 12345,
}: GridConfig): UseInstancedGridReturn {
  return useMemo(() => {
    const count = cols * rows;

    // Allocate typed arrays for GPU transfer
    const offsets = new Float32Array(count * 2);
    const indices = new Float32Array(count);
    const seeds = new Float32Array(count * 2);
    const gridPos = new Float32Array(count * 2);

    // Calculate grid dimensions
    const gridWidth = cols * cellSize;
    const gridHeight = rows * cellSize;

    // Offset to center the grid (if enabled)
    const offsetX = centered ? gridWidth / 2 : 0;
    const offsetY = centered ? gridHeight / 2 : 0;

    // Populate arrays
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Position offset (centered or not)
      offsets[i * 2] = col * cellSize - offsetX + cellSize / 2;
      offsets[i * 2 + 1] = row * cellSize - offsetY + cellSize / 2;

      // Instance index (normalized 0-1 for staggering)
      indices[i] = i / count;

      // Deterministic random seeds (for reproducible noise)
      seeds[i * 2] = seededRandom(col, row, seed);
      seeds[i * 2 + 1] = seededRandom(col + 100, row + 100, seed);

      // Grid position (col, row normalized)
      gridPos[i * 2] = col / cols;
      gridPos[i * 2 + 1] = row / rows;
    }

    // Create instanced buffer attributes
    const attributes: GridAttributes = {
      aOffset: new THREE.InstancedBufferAttribute(offsets, 2),
      aIndex: new THREE.InstancedBufferAttribute(indices, 1),
      aSeeds: new THREE.InstancedBufferAttribute(seeds, 2),
      aGridPos: new THREE.InstancedBufferAttribute(gridPos, 2),
    };

    return {
      count,
      attributes,
      dimensions: { width: gridWidth, height: gridHeight },
    };
  }, [cols, rows, cellSize, centered, seed]);
}
