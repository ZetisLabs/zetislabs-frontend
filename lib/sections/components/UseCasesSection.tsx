"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";
import { Users, Headphones, FileText, LucideIcon } from "lucide-react";

// Flow step data for Administrative use case
const adminFlowSteps = [
  {
    id: 1,
    icon: "📄",
    title: "Facture créée",
    description: "Générée automatiquement",
    auto: true,
  },
  {
    id: 2,
    icon: "✉️",
    title: "Envoyée au client",
    description: "Email + PDF",
    auto: true,
  },
  {
    id: 3,
    icon: "💾",
    title: "Enregistrée CRM",
    description: "Historique mis à jour",
    auto: true,
  },
  {
    id: 4,
    icon: "🔍",
    title: "Paiement vérifié",
    description: "Surveillance quotidienne",
    auto: true,
  },
  {
    id: 5,
    icon: "⏱️",
    title: "Échéance ?",
    description: "Vérification J+30",
    isCondition: true,
  },
];

// Animation variants for flow
const flowContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const flowStepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.3 },
  },
};

/**
 * FlowStepCard - A flow step with scissor-like border glow effect
 * Two rays start from top-center, spread around (one left, one right), meet at bottom-center
 */
interface FlowStepCardProps {
  step: (typeof adminFlowSteps)[0];
  index: number;
  totalSteps: number;
  cycleDuration: number;
}

function FlowStepCard({
  step,
  index,
  totalSteps,
  cycleDuration,
}: FlowStepCardProps) {
  // Animation progress: 0 = rays together, 1 = rays spread apart
  const progress = useMotionValue(0);
  const opacity = useMotionValue(0);

  // Create a conic gradient that spreads like scissors from 0deg
  // Opacity is baked into the colors
  const background = useTransform([progress, opacity], ([p, o]) => {
    const alpha = Math.round((o as number) * 255)
      .toString(16)
      .padStart(2, "0");
    const alphaFaded = Math.round((o as number) * 64)
      .toString(16)
      .padStart(2, "0");

    const baseColor = step.isCondition ? "#f59e0b" : "#3a7bd5";
    const color = `${baseColor}${alpha}`;
    const colorFaded = `${baseColor}${alphaFaded}`;

    // Spread angle: 0 at start, 180 at end
    const spread = (p as number) * 180;

    return `conic-gradient(from ${-spread}deg, ${color}, ${colorFaded} 15deg, transparent 30deg, transparent 330deg, ${colorFaded} 345deg, ${color} 360deg),
            conic-gradient(from ${spread}deg, ${color}, ${colorFaded} 15deg, transparent 30deg, transparent 330deg, ${colorFaded} 345deg, ${color} 360deg)`;
  });

  useEffect(() => {
    const stepDuration = cycleDuration / totalSteps;
    const stepDelay = index * stepDuration;
    const animDuration = stepDuration * 0.85;

    // Animate progress (scissor spread)
    const progressControls = animate(progress, [0, 1], {
      duration: animDuration,
      repeat: Infinity,
      repeatDelay: cycleDuration - animDuration,
      delay: stepDelay,
      ease: "easeInOut",
    });

    // Animate opacity: fade in at start, fade out at end
    const opacityControls = animate(opacity, [0, 1, 1, 0], {
      duration: animDuration,
      times: [0, 0.1, 0.9, 1],
      repeat: Infinity,
      repeatDelay: cycleDuration - animDuration,
      delay: stepDelay,
      ease: "easeInOut",
    });

    return () => {
      progressControls.stop();
      opacityControls.stop();
    };
  }, [progress, opacity, index, totalSteps, cycleDuration]);

  return (
    <motion.div variants={flowStepVariants} className="relative">
      {/* Animated border wrapper with padding for border effect */}
      <motion.div
        className="relative rounded-xl p-[2px]"
        style={{ background }}
      >
        {/* Inner card content */}
        <div
          className={`relative flex items-center gap-4 rounded-[10px] px-4 py-3 ${
            step.isCondition ? "bg-amber-500/5" : "bg-card"
          }`}
        >
          {/* Icon */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${
              step.isCondition ? "bg-amber-500/20" : "bg-accent/10"
            }`}
          >
            {step.icon}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p
              className={`font-sans text-sm font-semibold ${
                step.isCondition ? "text-amber-600" : "text-foreground"
              }`}
            >
              {step.title}
            </p>
            <p className="truncate font-sans text-xs text-foreground/50">
              {step.description}
            </p>
          </div>

          {/* Auto badge */}
          {step.auto && (
            <span className="rounded-full bg-accent/10 px-2 py-1 font-sans text-[10px] font-bold tracking-wider text-accent uppercase">
              Auto
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * FlowConnector - Animated connector between flow steps with intensity pulse
 */
interface FlowConnectorProps {
  index: number;
  totalSteps: number;
  cycleDuration: number;
}

function FlowConnector({
  index,
  totalSteps,
  cycleDuration,
}: FlowConnectorProps) {
  const intensity = useMotionValue(0);

  // Gradient that pulses downward
  const background = useTransform(intensity, (i) => {
    const opacity = 0.1 + i * 0.4; // 0.1 to 0.5
    return `linear-gradient(to bottom, rgba(58, 123, 213, ${opacity}), rgba(58, 123, 213, ${opacity * 0.3}))`;
  });

  useEffect(() => {
    const stepDuration = cycleDuration / totalSteps;
    // Connector activates at the end of its card's animation
    const stepDelay = index * stepDuration + stepDuration * 0.85;

    const controls = animate(intensity, [0, 1, 0], {
      duration: stepDuration * 0.2, // Quick pulse
      repeat: Infinity,
      repeatDelay: cycleDuration - stepDuration * 0.2,
      delay: stepDelay,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [intensity, index, totalSteps, cycleDuration]);

  return (
    <motion.div variants={arrowVariants} className="flex justify-center py-1">
      <motion.div className="h-6 w-1 rounded-full" style={{ background }} />
    </motion.div>
  );
}

/**
 * UseCasesSectionClientProps defines the structure for the translations and content.
 */
export interface UseCasesSectionClientProps {
  label: string;
  title: string;
  cards: {
    first: {
      title: string;
      description: string;
      footer: string;
    };
    second: {
      title: string;
      description: string;
      footer: string;
    };
    third: {
      title: string;
      description: string;
      footer: string;
    };
  };
}

interface UseCaseCard {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  footer: string;
}

/**
 * UseCasesSectionClient: Carousel wheel design with cards on left, title on right
 */
export function UseCasesSectionClient({
  label,
  title,
  cards,
}: UseCasesSectionClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const wheelRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isScrollingRef = useRef(false);

  // Build cards array from props
  const useCases: UseCaseCard[] = [
    {
      id: 0,
      icon: Users,
      title: cards.first.title,
      description: cards.first.description,
      footer: cards.first.footer,
    },
    {
      id: 1,
      icon: Headphones,
      title: cards.second.title,
      description: cards.second.description,
      footer: cards.second.footer,
    },
    {
      id: 2,
      icon: FileText,
      title: cards.third.title,
      description: cards.third.description,
      footer: cards.third.footer,
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % useCases.length);
  }, [useCases.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  }, [useCases.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Handle wheel scroll to change slides (only when hovering over the wheel zone)
  useEffect(() => {
    const wheelElement = wheelRef.current;
    if (!wheelElement) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept scroll when hovering over the wheel zone
      if (!isHoveringRef.current || isScrollingRef.current) return;

      const threshold = 30;
      if (Math.abs(e.deltaY) > threshold) {
        e.preventDefault();
        e.stopPropagation();
        isScrollingRef.current = true;
        setIsAutoPlaying(false);

        if (e.deltaY > 0) {
          setActiveIndex((prev) => (prev + 1) % 3);
        } else {
          setActiveIndex((prev) => (prev - 1 + 3) % 3);
        }

        // Debounce scroll
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 400);
      }
    };

    wheelElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => wheelElement.removeEventListener("wheel", handleWheel);
  }, []);

  // Calculate position index relative to active (0 = active, -1 = prev, 1 = next)
  const getRelativeIndex = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 2) return -1;
    if (diff === -2) return 1;
    return diff;
  };

  return (
    <section
      id="use-cases"
      data-section="use-cases"
      className="relative scroll-section overflow-hidden py-20 sm:py-24 lg:min-h-[800px] lg:py-20"
    >
      {/* Decorative Background Blur */}
      <div className="pointer-events-none absolute top-0 -left-[10%] h-[500px] w-[500px] rounded-full bg-accent opacity-[0.03] blur-[100px]" />

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* MOBILE: Title + Swipeable Cards */}
        <div className="lg:hidden">
          <div className="mb-8 flex flex-col items-start">
            <EyebrowBadge>{label}</EyebrowBadge>
            <h2 className="mt-6 text-3xl leading-[1.1] font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          </div>

          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {useCases.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="w-[85vw] shrink-0 snap-center rounded-2xl border border-border/40 bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-sm text-foreground/70">
                    {item.description}
                  </p>
                  <div className="font-bold text-accent">{item.footer}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP: Left column (title 1/6 top, card 2/6 middle) + Flow full right */}
        <div className="hidden lg:grid lg:min-h-[700px] lg:grid-cols-2 lg:gap-12">
          {/* LEFT SIDE: Grid of 6 rows */}
          <div className="relative grid grid-rows-6">
            {/* Title - row 1 (1/6 at top) with fade on all edges */}
            <div className="relative z-20 row-span-1 flex flex-col items-start justify-start">
              <div className="relative z-10 px-4 pt-2">
                <EyebrowBadge>{label}</EyebrowBadge>
                <h2 className="mt-4 max-w-md text-4xl leading-[1.1] font-semibold tracking-tight text-foreground lg:text-5xl">
                  {title}
                </h2>
              </div>
              {/* Background with radial fade on all edges */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at 0% 0%, #f8f8f8 50%, transparent 100%)`,
                }}
              />
            </div>

            {/* Carousel Wheel - rows 2-5 (middle area, card at 2/6) */}
            <div
              ref={wheelRef}
              onMouseEnter={() => {
                isHoveringRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveringRef.current = false;
              }}
              className="relative row-span-5 row-start-2"
            >
              <div className="relative h-full w-full">
                {useCases.map((item, index) => {
                  const relIndex = getRelativeIndex(index);
                  const isActive = relIndex === 0;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.id}
                      initial={false}
                      animate={{
                        rotate: relIndex * -12,
                        x: isActive ? 20 : -20,
                        y: relIndex * 200,
                        scale: isActive ? 1.05 : 0.8,
                        opacity: isActive ? 1 : 0.3,
                        zIndex: isActive ? 20 : 10 - Math.abs(relIndex),
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 18,
                        mass: 1,
                      }}
                      className="absolute top-[16.66%] left-0 w-[440px] cursor-pointer"
                      onClick={() => {
                        setActiveIndex(index);
                        setIsAutoPlaying(false);
                      }}
                    >
                      <div
                        className={`relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 ${
                          isActive
                            ? "border-white/50 bg-white shadow-2xl shadow-accent/15"
                            : "border-border/40 bg-card/60 shadow-sm"
                        }`}
                      >
                        {/* Glass Highlight for Active */}
                        {isActive && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                        )}

                        <div
                          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                            isActive
                              ? "bg-accent text-accent-foreground"
                              : "border border-border bg-white text-accent"
                          }`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>

                        <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                          {item.title}
                        </h3>

                        <p className="mb-8 text-base leading-relaxed text-foreground/70">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 border-t border-border/30 pt-5">
                          <span className="text-lg font-bold text-accent">
                            {item.footer}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Flow Diagram - full height */}
          <div className="flex flex-col justify-center">
            {/* Administrative Flow Diagram - only visible when activeIndex === 2 */}
            <AnimatePresence mode="wait">
              {activeIndex === 2 && (
                <motion.div
                  key="admin-flow"
                  variants={flowContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Flow Title */}
                  <motion.p
                    variants={flowStepVariants}
                    className="mb-6 font-sans text-sm font-medium tracking-wider text-foreground/50 uppercase"
                  >
                    Processus automatisé
                  </motion.p>

                  {/* Flow Steps with rotating border glow */}
                  <div className="relative flex flex-col gap-0">
                    {adminFlowSteps.map((step, idx) => (
                      <div key={step.id}>
                        {/* Flow step card with rotating border */}
                        <FlowStepCard
                          step={step}
                          index={idx}
                          totalSteps={adminFlowSteps.length}
                          cycleDuration={12}
                        />

                        {/* Connector between steps */}
                        {idx < adminFlowSteps.length - 1 && (
                          <FlowConnector
                            index={idx}
                            totalSteps={adminFlowSteps.length}
                            cycleDuration={12}
                          />
                        )}
                      </div>
                    ))}

                    {/* Condition branches */}
                    <motion.div
                      variants={flowStepVariants}
                      className="mt-3 grid grid-cols-2 gap-3"
                    >
                      {/* Paid */}
                      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
                        <p className="mb-1 font-sans text-[10px] font-bold tracking-wider text-green-600 uppercase">
                          ✓ Payée
                        </p>
                        <p className="font-sans text-xs text-foreground/60">
                          Clôturée
                        </p>
                      </div>

                      {/* Unpaid */}
                      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
                        <p className="mb-1 font-sans text-[10px] font-bold tracking-wider text-red-600 uppercase">
                          ✗ Impayée
                        </p>
                        <p className="font-sans text-xs text-foreground/60">
                          Relance auto
                        </p>
                      </div>
                    </motion.div>

                    {/* Time saved badge */}
                    <motion.div
                      variants={flowStepVariants}
                      className="mt-6 flex items-center justify-center gap-3 rounded-full border border-accent/20 bg-accent/5 px-4 py-2"
                    >
                      <span className="text-lg">⚡</span>
                      <span className="font-sans text-sm text-foreground/60">
                        Temps économisé :
                      </span>
                      <span className="font-sans text-lg font-bold text-accent">
                        6h/sem
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
