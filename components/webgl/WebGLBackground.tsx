"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { WebGLCanvas } from "./WebGLCanvas";
import { useInstancedGrid } from "./hooks/useInstancedGrid";
import { useScrollHijack } from "./hooks/useScrollHijack";
import { useScrollHijackContext } from "@/components/providers";
import { backgroundVertexShader } from "./shaders/background.vert";
import { backgroundFragmentShader } from "./shaders/background.frag";

// Animation constants
const ANIMATION_DURATION = 2.8; // seconds for intro animation
const CELL_SIZE = 5; // pixels

// Colors (normalized RGB)
const BASE_COLOR = new THREE.Vector3(0.973, 0.973, 0.973); // #f8f8f8
const ACCENT_COLOR = new THREE.Vector3(0.227, 0.482, 0.835); // #3a7bd5

type AnimationMode = "none" | "intro" | "idle";

interface BackgroundMeshProps {
  cols: number;
  rows: number;
  animationMode: AnimationMode;
}

/**
 * BackgroundMesh - The instanced mesh for the background grid
 */
// Process section tracking state
interface ProcessSectionState {
  top: number;
  height: number;
  visible: boolean;
}

function BackgroundMesh({ cols, rows, animationMode }: BackgroundMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const startTimeRef = useRef<number | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [processSection, setProcessSection] = useState<ProcessSectionState>({
    top: 0,
    height: 0,
    visible: false,
  });

  const { size } = useThree();

  // Track scroll progress, viewport height, and process section position
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
      const progress = Math.min(window.scrollY / vh, 1);
      setScrollProgress(progress);

      // Find and track Process section
      const processEl = document.querySelector('[data-section="process"]');
      if (processEl) {
        const rect = processEl.getBoundingClientRect();
        const isVisible = rect.top < vh && rect.bottom > 0;
        setProcessSection({
          top: rect.top,
          height: rect.height,
          visible: isVisible,
        });
      }
    };

    // Initial check
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Generate grid attributes
  const { count, attributes } = useInstancedGrid({
    cols,
    rows,
    cellSize: CELL_SIZE,
    centered: true,
  });

  // Create geometry with instanced attributes (memoized)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(CELL_SIZE - 0.5, CELL_SIZE - 0.5);

    // Attach instanced attributes
    geo.setAttribute("aOffset", attributes.aOffset);
    geo.setAttribute("aIndex", attributes.aIndex);
    geo.setAttribute("aSeeds", attributes.aSeeds);
    geo.setAttribute("aGridPos", attributes.aGridPos);

    return geo;
  }, [attributes]);

  // Convert animation mode to numeric value for shader
  const getAnimationModeValue = useCallback(
    (mode: AnimationMode, isIntroComplete: boolean): number => {
      if (mode === "none") return 0;
      if (mode === "intro" && !isIntroComplete) return 1;
      if (mode === "idle" || isIntroComplete) return 2;
      return 0;
    },
    []
  );

  // Create shader material (memoized)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: backgroundVertexShader,
        fragmentShader: backgroundFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2(size.width, size.height) },
          uAnimationMode: {
            value: getAnimationModeValue(animationMode, false),
          },
          uProgress: { value: 0 },
          uScrollProgress: { value: 0 },
          uViewportHeight: { value: size.height },
          uBaseColor: { value: BASE_COLOR },
          uAccentColor: { value: ACCENT_COLOR },
          // Process section pixel art uniforms
          uProcessSectionTop: { value: 0 },
          uProcessSectionHeight: { value: 0 },
          uProcessVisible: { value: 0 },
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.NormalBlending,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Created once, uniforms updated via ref
  );

  // Update material ref
  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  // Update resolution when size changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );
    }
  }, [size]);

  // Animation loop
  useFrame(({ clock }) => {
    if (!materialRef.current) return;

    const elapsed = clock.getElapsedTime();

    // Initialize start time on first frame
    if (startTimeRef.current === null) {
      startTimeRef.current = elapsed;
    }

    // Calculate animation progress
    const animationElapsed = elapsed - startTimeRef.current;
    const progress = Math.min(animationElapsed / ANIMATION_DURATION, 1);

    // Update uniforms
    materialRef.current.uniforms.uTime.value = elapsed;
    materialRef.current.uniforms.uProgress.value = progress;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uViewportHeight.value = viewportHeight;

    // Update process section uniforms
    materialRef.current.uniforms.uProcessSectionTop.value = processSection.top;
    materialRef.current.uniforms.uProcessSectionHeight.value =
      processSection.height;
    materialRef.current.uniforms.uProcessVisible.value = processSection.visible
      ? 1.0
      : 0.0;

    // Update animation mode
    materialRef.current.uniforms.uAnimationMode.value = getAnimationModeValue(
      animationMode,
      introComplete
    );

    // Mark intro complete and transition to idle
    if (progress >= 1 && !introComplete && animationMode === "intro") {
      setIntroComplete(true);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}

interface WebGLBackgroundProps {
  /** Animation mode: 'none' (static), 'intro' (arc animation), 'idle' (breathing) */
  animationMode?: AnimationMode;
}

/**
 * WebGLBackground - Full-viewport WebGL background with unified grid and animations
 *
 * Features:
 * - Single draw call for entire background
 * - Intro animation (arc) that transitions to idle (breathing)
 * - Responsive to viewport size
 *
 * @example
 * ```tsx
 * <WebGLBackground animationMode="intro" />
 * ```
 */
export function WebGLBackground({
  animationMode = "intro",
}: WebGLBackgroundProps) {
  const [dimensions, setDimensions] = useState({
    cols: 0,
    rows: 0,
    height: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate grid dimensions based on full document height
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      // Use viewport height since it's now a fixed background
      const height = window.innerHeight;

      // Add extra cells for margin (ensures coverage during animations)
      const cols = Math.ceil(width / CELL_SIZE) + 4;
      const rows = Math.ceil(height / CELL_SIZE) + 4;

      setDimensions({ cols, rows, height });
    };

    updateDimensions();

    // Update on resize
    window.addEventListener("resize", updateDimensions);

    // Use ResizeObserver to detect document height changes (content loading, etc.)
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  // Don't render until we have dimensions
  if (dimensions.cols === 0 || dimensions.rows === 0) {
    return (
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ backgroundColor: "#f8f8f8", height: "100vh" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ height: "100vh" }}
      aria-hidden="true"
    >
      <WebGLCanvas
        className="h-full w-full"
        pauseWhenHidden={false} // Background should always render
      >
        <BackgroundMesh
          cols={dimensions.cols}
          rows={dimensions.rows}
          animationMode={animationMode}
        />
      </WebGLCanvas>
    </div>
  );
}
