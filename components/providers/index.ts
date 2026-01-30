/**
 * Client-side providers for Server Components.
 *
 * Ces composants wrappent les providers qui necessitent "use client"
 * pour permettre leur utilisation dans des layouts Server Component.
 */

export { EffectProvider } from "./EffectProvider";
export {
  ScrollHijackProvider,
  useScrollHijackContext,
} from "./ScrollHijackProvider";
export {
  WebGLAnimationModeProvider,
  WebGLAnimationModeOverride,
  useWebGLAnimationMode,
} from "./WebGLAnimationModeProvider";
