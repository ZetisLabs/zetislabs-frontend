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
import {
  Users,
  Headphones,
  FileText,
  LucideIcon,
  Receipt,
  Send,
  Database,
  Search,
  Clock,
  CheckCircle,
  Bell,
  Zap,
  MessageSquare,
  Brain,
  HelpCircle,
  FileEdit,
  AlertTriangle,
  BookOpen,
  FileBarChart,
  Mail,
  UserPlus,
  RefreshCw,
  AlertOctagon,
  Target,
} from "lucide-react";

// Flow step data for Administrative use case
const adminFlowSteps = [
  {
    id: 1,
    icon: Receipt,
    title: "Facture créée",
    description: "Générée automatiquement",
    auto: true,
  },
  {
    id: 2,
    icon: Send,
    title: "Envoyée au client",
    description: "Email + PDF",
    auto: true,
  },
  {
    id: 3,
    icon: Database,
    title: "Enregistrée CRM",
    description: "Historique mis à jour",
    auto: true,
  },
  {
    id: 4,
    icon: Search,
    title: "Paiement vérifié",
    description: "Surveillance quotidienne",
    auto: true,
  },
  {
    id: 5,
    icon: Clock,
    title: "Échéance ?",
    description: "Vérification J+30",
    isCondition: true,
  },
];

// Flow step data for Support Client use case
const supportFlowSteps = [
  {
    id: 1,
    icon: MessageSquare,
    title: "Message client",
    description: "Réception automatique",
    auto: true,
  },
  {
    id: 2,
    icon: Brain,
    title: "Analyse IA",
    description: "Classification intelligente",
    auto: true,
    isCondition: true,
  },
];

// Branch options for Support Client
const supportBranches = [
  {
    id: 1,
    icon: HelpCircle,
    title: "Question FAQ",
    subtitle: "Réponse auto",
    color: "blue" as const,
  },
  {
    id: 2,
    icon: FileEdit,
    title: "Demande standard",
    subtitle: "Ticket créé",
    color: "blue" as const,
  },
  {
    id: 3,
    icon: AlertTriangle,
    title: "Urgence",
    subtitle: "Alerte équipe",
    color: "amber" as const,
  },
];

// Output cards for Support Client
const supportOutputs = [
  {
    id: 1,
    icon: BookOpen,
    title: "Base enrichie",
    subtitle: "FAQ mise à jour",
  },
  {
    id: 2,
    icon: FileBarChart,
    title: "Rapport hebdo",
    subtitle: "Métriques client",
  },
];

// Flow step data for Commercial use case
const commercialFlowSteps = [
  {
    id: 1,
    icon: Mail,
    title: "Email reçu",
    description: "Boîte partagée",
    auto: true,
  },
  {
    id: 2,
    icon: Brain,
    title: "Analyse IA",
    description: "Intention détectée",
    auto: true,
    isCondition: true,
  },
];

// Branch options for Commercial
const commercialBranches = [
  {
    id: 1,
    icon: UserPlus,
    title: "Nouveau lead",
    subtitle: "Fiche créée",
    color: "green" as const,
  },
  {
    id: 2,
    icon: RefreshCw,
    title: "Relance",
    subtitle: "Rappel planifié",
    color: "blue" as const,
  },
  {
    id: 3,
    icon: AlertOctagon,
    title: "Problème",
    subtitle: "Ticket SAV",
    color: "red" as const,
  },
];

// Output cards for Commercial
const commercialOutputs = [
  {
    id: 1,
    icon: Target,
    title: "CRM synchronisé",
    subtitle: "Pipeline à jour",
  },
  {
    id: 2,
    icon: FileBarChart,
    title: "Rapport hebdo",
    subtitle: "Performance commerciale",
  },
];

// Global animation cycle duration
const FLOW_CYCLE_DURATION = 12; // seconds for full cycle

// Diagonal light sweep - shared across all elements
// The light moves from top-left (-100%) to bottom-right (200%)
// Each element's "depth" determines when the light passes through it
function useDiagonalSweep(depth: number, cycleDuration: number) {
  const globalProgress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(globalProgress, [0, 1], {
      duration: cycleDuration * 0.3, // Sweep duration
      repeat: Infinity,
      repeatDelay: cycleDuration * 0.7, // Pause between sweeps
      ease: "linear",
    });
    return () => controls.stop();
  }, [globalProgress, cycleDuration]);

  // Transform global progress to local sweep position
  // depth 0 = top of flow, depth 1+ = bottom of flow
  const sweepPosition = useTransform(globalProgress, (gp) => {
    // Global sweep goes from -100 to 300 (extended range to clear all elements)
    const globalSweep = gp * 400 - 100;
    // Offset based on element depth (deeper = later)
    // depth 0 = offset 0, depth 1.4 = offset 140
    return globalSweep - depth * 100;
  });

  return sweepPosition;
}

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
  // Calculate depth: 0 at top, 1 at bottom of flow
  const depth = index / Math.max(totalSteps, 1);
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const colorRgb = step.isCondition ? "245, 158, 11" : "58, 123, 213";

  const background = useTransform(sweepPosition, (pos) => {
    // Only show when sweep is passing through (-40 to 140)
    if (pos < -40 || pos > 140) return "transparent";

    // Intensity based on how centered the sweep is
    const center = 50;
    const dist = Math.abs(pos - center);
    const intensity = Math.max(0, 1 - dist / 90);

    return `linear-gradient(
      135deg,
      transparent ${Math.max(0, pos - 45)}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.max(0, pos - 22)}%,
      rgba(${colorRgb}, ${0.9 * intensity}) ${pos}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.min(100, pos + 22)}%,
      transparent ${Math.min(100, pos + 45)}%
    )`;
  });

  return (
    <motion.div variants={flowStepVariants} className="relative">
      {/* Animated border wrapper with padding for border effect */}
      <motion.div
        className="relative rounded-xl p-[2px]"
        style={{ background }}
      >
        {/* Inner card content */}
        <div className="relative flex items-center gap-4 rounded-[10px] bg-card px-4 py-3">
          {/* Icon */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              step.isCondition ? "bg-amber-500/15" : "bg-accent/10"
            }`}
          >
            <step.icon
              className={`h-5 w-5 ${
                step.isCondition ? "text-amber-600" : "text-accent"
              }`}
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="font-sans text-sm font-semibold text-foreground">
              {step.title}
            </p>
            <p className="truncate font-sans text-xs text-foreground/50">
              {step.description}
            </p>
          </div>

          {/* Auto badge or Condition badge */}
          {step.auto && (
            <span className="rounded-full bg-accent/10 px-2 py-1 font-sans text-[10px] font-bold tracking-wider text-accent uppercase">
              Auto
            </span>
          )}
          {step.isCondition && (
            <span className="rounded-full bg-amber-500/15 px-2 py-1 font-sans text-[10px] font-bold tracking-wider text-amber-600 uppercase">
              Check
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * FlowConnector - Animated connector between flow steps
 * A small blue streak travels down with a gradient trail
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
  // Connector is between cards, depth is between indices
  const depth = (index + 0.5) / Math.max(totalSteps, 1);
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const background = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";

    const center = 50;
    const dist = Math.abs(pos - center);
    const intensity = Math.max(0, 1 - dist / 90);

    return `linear-gradient(to bottom,
      transparent ${Math.max(0, pos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${pos}%,
      transparent ${Math.min(100, pos + 35)}%
    )`;
  });

  return (
    <motion.div
      variants={arrowVariants}
      className="-my-[1px] flex justify-center"
    >
      <div className="relative h-5 w-[2px]">
        {/* Static base line */}
        <div className="absolute inset-0 rounded-full bg-border/20" />

        {/* Traveling blue streak */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background }}
        />
      </div>
    </motion.div>
  );
}

/**
 * BranchConnector - Y-shaped connector that splits to two branches
 * The glow effect flows like water: stem → split horizontal → drops
 */
interface BranchConnectorProps {
  index: number;
  totalSteps: number;
  cycleDuration: number;
}

function BranchConnector({
  index,
  totalSteps,
  cycleDuration,
}: BranchConnectorProps) {
  // Branch connector depth - just after the last card
  const depth = (index + 0.7) / Math.max(totalSteps, 1);
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  // All parts of the branch light up together with the diagonal sweep
  const stemBackground = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);
    return `linear-gradient(to bottom,
      transparent ${Math.max(0, pos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${pos}%,
      transparent ${Math.min(100, pos + 35)}%
    )`;
  });

  const splitOpacity = useTransform(sweepPosition, (pos) => {
    if (pos < 10 || pos > 90) return 0;
    return Math.max(0, 1 - Math.abs(pos - 50) / 40);
  });

  const leftBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 10 || pos > 90) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 40);
    const spotPos = 100 - (pos - 10) * (100 / 80);
    return `linear-gradient(to left,
      transparent ${Math.max(0, 100 - spotPos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${100 - spotPos}%,
      transparent ${Math.min(100, 100 - spotPos + 35)}%
    )`;
  });

  const rightBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 10 || pos > 90) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 40);
    const spotPos = (pos - 10) * (100 / 80);
    return `linear-gradient(to right,
      transparent ${Math.max(0, spotPos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${spotPos}%,
      transparent ${Math.min(100, spotPos + 35)}%
    )`;
  });

  const dropOpacity = useTransform(sweepPosition, (pos) => {
    if (pos < 30 || pos > 110) return 0;
    return Math.max(0, 1 - Math.abs(pos - 70) / 40);
  });

  const dropBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 30 || pos > 110) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 70) / 40);
    const spotPos = (pos - 30) * (100 / 80);
    return `linear-gradient(to bottom,
      transparent ${Math.max(0, spotPos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${spotPos}%,
      transparent ${Math.min(100, spotPos + 35)}%
    )`;
  });

  return (
    <motion.div
      variants={arrowVariants}
      className="-my-[1px] flex flex-col items-center"
    >
      {/* Vertical stem */}
      <div className="relative h-4 w-[2px]">
        <div className="absolute inset-0 rounded-full bg-border/20" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: stemBackground }}
        />
      </div>

      {/* Horizontal split bar */}
      <div className="relative flex w-full max-w-[200px]">
        {/* Left branch - flows from center to left */}
        <div className="relative h-[2px] flex-1">
          <div className="absolute inset-0 bg-border/20" />
          <motion.div
            className="absolute inset-0"
            style={{ background: leftBackground, opacity: splitOpacity }}
          />
        </div>

        {/* Right branch - flows from center to right */}
        <div className="relative h-[2px] flex-1">
          <div className="absolute inset-0 bg-border/20" />
          <motion.div
            className="absolute inset-0"
            style={{ background: rightBackground, opacity: splitOpacity }}
          />
        </div>
      </div>

      {/* Vertical drops to cards */}
      <div className="flex w-full max-w-[200px] justify-between px-1">
        <div className="relative h-3 w-[2px]">
          <div className="absolute inset-0 rounded-full bg-border/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: dropBackground, opacity: dropOpacity }}
          />
        </div>
        <div className="relative h-3 w-[2px]">
          <div className="absolute inset-0 rounded-full bg-border/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: dropBackground, opacity: dropOpacity }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ResultCard - Small card with animated border for condition results (Payée/Impayée)
 */
interface ResultCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: "green" | "red";
  totalSteps: number;
  cycleDuration: number;
}

function ResultCard({
  icon: Icon,
  title,
  subtitle,
  color,
  totalSteps,
  cycleDuration,
}: ResultCardProps) {
  // Result cards are at the bottom of the flow
  const depth = 1.1; // Just past the end
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const colorRgb = color === "green" ? "34, 197, 94" : "239, 68, 68";

  const background = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";

    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);

    return `linear-gradient(
      135deg,
      transparent ${Math.max(0, pos - 45)}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.max(0, pos - 22)}%,
      rgba(${colorRgb}, ${0.9 * intensity}) ${pos}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.min(100, pos + 22)}%,
      transparent ${Math.min(100, pos + 45)}%
    )`;
  });

  return (
    <motion.div variants={flowStepVariants} className="relative">
      <motion.div
        className="relative rounded-xl p-[2px]"
        style={{ background }}
      >
        <div className="flex items-center gap-2 rounded-[10px] bg-card px-3 py-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              color === "green" ? "bg-green-500/15" : "bg-red-500/15"
            }`}
          >
            <Icon
              className={`h-3.5 w-3.5 ${
                color === "green" ? "text-green-600" : "text-red-500"
              }`}
            />
          </div>
          <div>
            <p className="font-sans text-xs font-semibold text-foreground">
              {title}
            </p>
            <p className="font-sans text-[10px] text-foreground/50">
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * TripleBranchConnector - Y-shaped connector that splits to three branches
 * The glow effect flows like water: stem → split horizontal → drops
 */
interface TripleBranchConnectorProps {
  index: number;
  cycleDuration: number;
}

function TripleBranchConnector({
  index,
  cycleDuration,
}: TripleBranchConnectorProps) {
  // Use fixed depth since this is for support/commercial flows with 2 steps
  const depth = 0.85;
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const stemBackground = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);
    return `linear-gradient(to bottom,
      transparent ${Math.max(0, pos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${pos}%,
      transparent ${Math.min(100, pos + 35)}%
    )`;
  });

  const splitOpacity = useTransform(sweepPosition, (pos) => {
    if (pos < 20 || pos > 80) return 0;
    return Math.max(0, 1 - Math.abs(pos - 50) / 30);
  });

  const leftBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 20 || pos > 80) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 30);
    const spotPos = 100 - (pos - 20) * (100 / 60);
    return `linear-gradient(to left,
      transparent ${Math.max(0, 100 - spotPos - 25)}%,
      rgba(58, 123, 213, ${0.6 * intensity}) ${100 - spotPos}%,
      transparent ${Math.min(100, 100 - spotPos + 25)}%
    )`;
  });

  const rightBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 20 || pos > 80) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 30);
    const spotPos = (pos - 20) * (100 / 60);
    return `linear-gradient(to right,
      transparent ${Math.max(0, spotPos - 25)}%,
      rgba(58, 123, 213, ${0.6 * intensity}) ${spotPos}%,
      transparent ${Math.min(100, spotPos + 25)}%
    )`;
  });

  const dropOpacity = useTransform(sweepPosition, (pos) => {
    if (pos < 40 || pos > 100) return 0;
    return Math.max(0, 1 - Math.abs(pos - 70) / 30);
  });

  const dropBackground = useTransform(sweepPosition, (pos) => {
    if (pos < 30 || pos > 110) return "transparent";
    const intensity = Math.max(0, 1 - Math.abs(pos - 70) / 40);
    const spotPos = (pos - 30) * (100 / 80);
    return `linear-gradient(to bottom,
      transparent ${Math.max(0, spotPos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${spotPos}%,
      transparent ${Math.min(100, spotPos + 35)}%
    )`;
  });

  return (
    <motion.div
      variants={arrowVariants}
      className="-my-[1px] flex flex-col items-center"
    >
      {/* Vertical stem */}
      <div className="relative h-4 w-[2px]">
        <div className="absolute inset-0 rounded-full bg-border/20" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: stemBackground }}
        />
      </div>

      {/* Horizontal split bar - 3 branches */}
      <div className="relative flex w-full max-w-[280px]">
        {/* Left branch */}
        <div className="relative h-[2px] flex-1">
          <div className="absolute inset-0 bg-border/20" />
          <motion.div
            className="absolute inset-0"
            style={{ background: leftBackground, opacity: splitOpacity }}
          />
        </div>

        {/* Right branch */}
        <div className="relative h-[2px] flex-1">
          <div className="absolute inset-0 bg-border/20" />
          <motion.div
            className="absolute inset-0"
            style={{ background: rightBackground, opacity: splitOpacity }}
          />
        </div>
      </div>

      {/* Vertical drops to 3 cards */}
      <div className="flex w-full max-w-[280px] justify-between px-1">
        {/* Left drop */}
        <div className="relative h-3 w-[2px]">
          <div className="absolute inset-0 rounded-full bg-border/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: dropBackground, opacity: dropOpacity }}
          />
        </div>
        {/* Center drop */}
        <div className="relative h-3 w-[2px]">
          <div className="absolute inset-0 rounded-full bg-border/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: dropBackground, opacity: dropOpacity }}
          />
        </div>
        {/* Right drop */}
        <div className="relative h-3 w-[2px]">
          <div className="absolute inset-0 rounded-full bg-border/20" />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: dropBackground, opacity: dropOpacity }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * BranchCard - Card for branch options with colored border animation
 */
interface BranchCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: "blue" | "green" | "amber" | "red";
  branchIndex: number;
  totalSteps: number;
  cycleDuration: number;
}

function BranchCard({
  icon: Icon,
  title,
  subtitle,
  color,
  branchIndex,
  totalSteps,
  cycleDuration,
}: BranchCardProps) {
  // Branch cards are at the end of the flow, slight offset by branch position
  const depth = 1.0 + branchIndex * 0.05;
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const colorRgbValues = {
    blue: "58, 123, 213",
    green: "34, 197, 94",
    amber: "245, 158, 11",
    red: "239, 68, 68",
  };
  const colorRgb = colorRgbValues[color];

  const bgColors = {
    blue: "bg-accent/10",
    green: "bg-green-500/15",
    amber: "bg-amber-500/15",
    red: "bg-red-500/15",
  };

  const textColors = {
    blue: "text-accent",
    green: "text-green-600",
    amber: "text-amber-600",
    red: "text-red-500",
  };

  const background = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";

    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);

    return `linear-gradient(
      135deg,
      transparent ${Math.max(0, pos - 45)}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.max(0, pos - 22)}%,
      rgba(${colorRgb}, ${0.9 * intensity}) ${pos}%,
      rgba(${colorRgb}, ${0.2 * intensity}) ${Math.min(100, pos + 22)}%,
      transparent ${Math.min(100, pos + 45)}%
    )`;
  });

  return (
    <motion.div variants={flowStepVariants} className="relative">
      <motion.div
        className="relative rounded-lg p-[2px]"
        style={{ background }}
      >
        <div className="flex items-center gap-2 rounded-[6px] bg-card px-2 py-1.5">
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${bgColors[color]}`}
          >
            <Icon className={`h-3 w-3 ${textColors[color]}`} />
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-[10px] font-semibold text-foreground">
              {title}
            </p>
            <p className="truncate font-sans text-[8px] text-foreground/50">
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * OutputCard - Card for output results (no animated border, subtle style)
 */
interface OutputCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  outputIndex: number;
  totalSteps: number;
  cycleDuration: number;
}

function OutputCard({
  icon: Icon,
  title,
  subtitle,
  outputIndex,
  totalSteps,
  cycleDuration,
}: OutputCardProps) {
  // Output cards are at the very bottom
  const depth = 1.3 + outputIndex * 0.05;
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const background = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";

    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);

    return `linear-gradient(
      135deg,
      transparent ${Math.max(0, pos - 45)}%,
      rgba(58, 123, 213, ${0.15 * intensity}) ${Math.max(0, pos - 22)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${pos}%,
      rgba(58, 123, 213, ${0.15 * intensity}) ${Math.min(100, pos + 22)}%,
      transparent ${Math.min(100, pos + 45)}%
    )`;
  });

  return (
    <motion.div variants={flowStepVariants} className="relative">
      <motion.div
        className="relative rounded-xl p-[2px]"
        style={{ background }}
      >
        <div className="flex items-center gap-3 rounded-[10px] bg-card px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-xs font-semibold text-foreground">
              {title}
            </p>
            <p className="font-sans text-[10px] text-foreground/50">
              {subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * OutputConnector - Vertical connector from branch cards to output cards
 */
interface OutputConnectorProps {
  totalSteps: number;
  cycleDuration: number;
}

function OutputConnector({ totalSteps, cycleDuration }: OutputConnectorProps) {
  // Output connector is between branch cards and output cards
  const depth = 1.2;
  const sweepPosition = useDiagonalSweep(depth, cycleDuration);

  const background = useTransform(sweepPosition, (pos) => {
    if (pos < -40 || pos > 140) return "transparent";

    const intensity = Math.max(0, 1 - Math.abs(pos - 50) / 90);

    return `linear-gradient(to bottom,
      transparent ${Math.max(0, pos - 35)}%,
      rgba(58, 123, 213, ${0.7 * intensity}) ${pos}%,
      transparent ${Math.min(100, pos + 35)}%
    )`;
  });

  return (
    <motion.div
      variants={arrowVariants}
      className="-my-[1px] flex justify-center"
    >
      <div className="relative h-4 w-[2px]">
        <div className="absolute inset-0 rounded-full bg-border/20" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background }}
        />
      </div>
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
    const interval = setInterval(nextSlide, 12000);
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
            <AnimatePresence mode="wait">
              {/* Support Client Flow - activeIndex === 0 */}
              {activeIndex === 0 && (
                <motion.div
                  key="support-flow"
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

                  {/* Flow Steps */}
                  <div className="relative flex flex-col gap-0">
                    {supportFlowSteps.map((step, idx) => (
                      <div key={step.id}>
                        <FlowStepCard
                          step={step}
                          index={idx}
                          totalSteps={supportFlowSteps.length}
                          cycleDuration={12}
                        />
                        {idx < supportFlowSteps.length - 1 && (
                          <FlowConnector
                            index={idx}
                            totalSteps={supportFlowSteps.length}
                            cycleDuration={12}
                          />
                        )}
                      </div>
                    ))}

                    {/* Triple Branch connector */}
                    <TripleBranchConnector
                      index={supportFlowSteps.length - 1}
                      cycleDuration={12}
                    />

                    {/* Branch cards */}
                    <div className="-mt-[1px] grid grid-cols-3 gap-2">
                      {supportBranches.map((branch, idx) => (
                        <BranchCard
                          key={branch.id}
                          icon={branch.icon}
                          title={branch.title}
                          subtitle={branch.subtitle}
                          color={branch.color}
                          branchIndex={idx}
                          totalSteps={supportFlowSteps.length}
                          cycleDuration={12}
                        />
                      ))}
                    </div>

                    {/* Connector to outputs */}
                    <OutputConnector
                      totalSteps={supportFlowSteps.length}
                      cycleDuration={12}
                    />

                    {/* Output cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {supportOutputs.map((output, idx) => (
                        <OutputCard
                          key={output.id}
                          icon={output.icon}
                          title={output.title}
                          subtitle={output.subtitle}
                          outputIndex={idx}
                          totalSteps={supportFlowSteps.length}
                          cycleDuration={12}
                        />
                      ))}
                    </div>

                    {/* Time saved badge */}
                    <motion.div
                      variants={flowStepVariants}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card px-4 py-2"
                    >
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="font-sans text-xs text-foreground/60">
                        Temps économisé :
                      </span>
                      <span className="font-sans text-sm font-bold text-accent">
                        12h/sem
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Commercial Flow - activeIndex === 1 */}
              {activeIndex === 1 && (
                <motion.div
                  key="commercial-flow"
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

                  {/* Flow Steps */}
                  <div className="relative flex flex-col gap-0">
                    {commercialFlowSteps.map((step, idx) => (
                      <div key={step.id}>
                        <FlowStepCard
                          step={step}
                          index={idx}
                          totalSteps={commercialFlowSteps.length}
                          cycleDuration={12}
                        />
                        {idx < commercialFlowSteps.length - 1 && (
                          <FlowConnector
                            index={idx}
                            totalSteps={commercialFlowSteps.length}
                            cycleDuration={12}
                          />
                        )}
                      </div>
                    ))}

                    {/* Triple Branch connector */}
                    <TripleBranchConnector
                      index={commercialFlowSteps.length - 1}
                      cycleDuration={12}
                    />

                    {/* Branch cards */}
                    <div className="-mt-[1px] grid grid-cols-3 gap-2">
                      {commercialBranches.map((branch, idx) => (
                        <BranchCard
                          key={branch.id}
                          icon={branch.icon}
                          title={branch.title}
                          subtitle={branch.subtitle}
                          color={branch.color}
                          branchIndex={idx}
                          totalSteps={commercialFlowSteps.length}
                          cycleDuration={12}
                        />
                      ))}
                    </div>

                    {/* Connector to outputs */}
                    <OutputConnector
                      totalSteps={commercialFlowSteps.length}
                      cycleDuration={12}
                    />

                    {/* Output cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {commercialOutputs.map((output, idx) => (
                        <OutputCard
                          key={output.id}
                          icon={output.icon}
                          title={output.title}
                          subtitle={output.subtitle}
                          outputIndex={idx}
                          totalSteps={commercialFlowSteps.length}
                          cycleDuration={12}
                        />
                      ))}
                    </div>

                    {/* Time saved badge */}
                    <motion.div
                      variants={flowStepVariants}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card px-4 py-2"
                    >
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="font-sans text-xs text-foreground/60">
                        Temps économisé :
                      </span>
                      <span className="font-sans text-sm font-bold text-accent">
                        8h/sem
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Administrative Flow Diagram - activeIndex === 2 */}
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

                    {/* Branch connectors with split animation */}
                    <BranchConnector
                      index={adminFlowSteps.length - 1}
                      totalSteps={adminFlowSteps.length}
                      cycleDuration={12}
                    />

                    {/* Condition branches */}
                    <div className="-mt-[1px] grid grid-cols-2 gap-3">
                      {/* Paid */}
                      <ResultCard
                        icon={CheckCircle}
                        title="Payée"
                        subtitle="Clôturée"
                        color="green"
                        totalSteps={adminFlowSteps.length}
                        cycleDuration={12}
                      />

                      {/* Unpaid */}
                      <ResultCard
                        icon={Bell}
                        title="Impayée"
                        subtitle="Relance auto"
                        color="red"
                        totalSteps={adminFlowSteps.length}
                        cycleDuration={12}
                      />
                    </div>

                    {/* Time saved badge */}
                    <motion.div
                      variants={flowStepVariants}
                      className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-card px-4 py-2"
                    >
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="font-sans text-xs text-foreground/60">
                        Temps économisé :
                      </span>
                      <span className="font-sans text-sm font-bold text-accent">
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
