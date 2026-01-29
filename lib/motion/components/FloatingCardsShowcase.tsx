"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/lib/ui";

interface FloatingCardsShowcaseProps {
  cards: Array<{
    icon: ReactNode;
    serviceName: string;
    label: string;
    title: string;
    date: string;
    assignee?: string;
    gradientColor?: "peach" | "blue" | "none";
    rotation?: number;
  }>;
  className?: string;
}

/**
 * FloatingCardsShowcase Component
 * Displays ServiceCards in a floating, overlapping "organic" arrangement
 * with subtle parallax and floating animations.
 */
export function FloatingCardsShowcase({
  cards,
  className = "",
}: FloatingCardsShowcaseProps) {
  // Config for the "organic" layout - offsets and specific behaviors for up to 4 cards
  const cardConfigs = [
    {
      x: "-15%",
      y: "-10%",
      rotate: -5,
      zIndex: 10,
      delay: 0,
      floatDuration: 5,
    },
    { x: "5%", y: "5%", rotate: 2, zIndex: 30, delay: 0.1, floatDuration: 4.5 },
    {
      x: "25%",
      y: "-15%",
      rotate: -3,
      zIndex: 20,
      delay: 0.2,
      floatDuration: 6,
    },
    {
      x: "-10%",
      y: "20%",
      rotate: 4,
      zIndex: 25,
      delay: 0.15,
      floatDuration: 5.5,
    },
  ];

  return (
    <div
      className={`relative flex min-h-[450px] w-full items-center justify-center overflow-visible py-12 ${className}`}
      style={{ perspective: "1200px" }}
    >
      {cards.slice(0, 4).map((card, index) => {
        const config = cardConfigs[index] || cardConfigs[0];

        return (
          <motion.div
            key={`${card.serviceName}-${index}`}
            initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: card.rotation ?? config.rotate,
              scale: 1,
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: config.delay,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              x: config.x,
              y: config.y,
              zIndex: config.zIndex,
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              scale: 1.05,
              zIndex: 50,
              y: "-5%",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            {/* Floating Animation Layer */}
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: config.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="drop-shadow-2xl"
            >
              <ServiceCard
                {...card}
                rotation={0} // We handle rotation at the motion.div level for cleaner interaction
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Background ambient glow matching project accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-10 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          transform: "scale(0.8)",
        }}
      />
    </div>
  );
}
