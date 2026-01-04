"use client";

import { type ReactNode } from "react";
import { EffectLayerProvider } from "@/components/effects";

interface EffectProviderProps {
  children: ReactNode;
}

/**
 * EffectProvider
 *
 * Wrapper client pour le EffectLayerProvider.
 * Ce composant permet d'integrer le systeme d'effets dans un layout Server Component.
 *
 * @example
 * ```tsx
 * // Dans app/[locale]/layout.tsx (Server Component)
 * import { EffectProvider } from "@/components/providers/EffectProvider";
 *
 * export default async function LocaleLayout({ children }) {
 *   return (
 *     <EffectProvider>
 *       <Header />
 *       <main>{children}</main>
 *       <Footer />
 *     </EffectProvider>
 *   );
 * }
 * ```
 */
export function EffectProvider({ children }: EffectProviderProps) {
  return <EffectLayerProvider>{children}</EffectLayerProvider>;
}
