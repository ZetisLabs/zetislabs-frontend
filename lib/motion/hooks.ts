"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

/**
 * useHasMounted - Hydration-safe mount detection
 *
 * Returns `false` during SSR and `true` on the client after hydration.
 * Uses `useSyncExternalStore` to avoid the setState-in-effect lint error.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, getTrue, getFalse);
}
