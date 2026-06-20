"use client";

import { Reveal } from "@/lib/motion";
import { CTAButton, EyebrowBadge } from "@/lib/ui";
import type { Translations } from "@/lib/i18n";
import {
  Radar,
  Filter,
  Sparkles,
  Send,
  Check,
  ListChecks,
  Wrench,
  FlaskConical,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import { ChannelShowcase } from "./ChannelShowcase";

type Content = Translations["veilleAo"];

const featureIcons: LucideIcon[] = [Radar, Filter, Sparkles, Send];
const stepIcons: LucideIcon[] = [
  ListChecks,
  Wrench,
  FlaskConical,
  PackageCheck,
];

/** Shared accent halo — the page's one recurring spot of "life" (Swiss restraint:
 *  monochrome surface, accent reserved for the glow behind the two key moments). */
function Halo({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(90,130,255,0.12), transparent 70%)",
        filter: "blur(70px)",
      }}
    />
  );
}

/**
 * VeilleAoContent
 *
 * The full Veille d'AO conversion landing, rendered as one client tree so each
 * section can reveal on scroll. On-brand by default: swiss-paper surface (set by
 * the page), GeneralSans headings, IBM Plex body, cards in `border-border/40
 * bg-card`, and accent used sparingly (hero/CTA halos, the founder price, the
 * match score). No scroll-snap and no WebGL — a calm long-form reading rhythm.
 */
export function VeilleAoContent({ content }: { content: Content }) {
  return (
    <div className="relative">
      <Hero data={content.hero} />
      <Problem data={content.problem} />
      <Solution data={content.solution} />
      <ChannelShowcase data={content.notification} />
      <Deliverables data={content.deliverables} />
      <Pricing data={content.pricing} />
      <Process data={content.process} />
      <FinalCta data={content.finalCta} />
    </div>
  );
}

function Hero({ data }: { data: Content["hero"] }) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-44 sm:pb-28">
      <Halo className="top-40 left-1/2 h-[280px] w-[560px] -translate-x-1/2" />
      <div className="mx-auto max-w-3xl text-center">
        <div className="hero-entrance hero-entrance-1 flex justify-center">
          <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
        </div>

        <h1 className="hero-entrance hero-entrance-2 mt-6 text-3xl leading-[1.12] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.25rem]">
          <span className="font-semibold text-foreground">
            {data.title.lead}
          </span>
          <span className="font-normal text-foreground/80">
            {data.title.thin}
          </span>
          <span className="font-semibold text-accent">{data.title.accent}</span>
        </h1>

        <p className="hero-entrance hero-entrance-3 mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-foreground/65 sm:text-lg">
          {data.subtitle}
        </p>

        <div className="hero-entrance hero-entrance-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <CTAButton
            href={data.ctaPrimary.href}
            variant="primary"
            ariaLabel={data.ctaPrimary.ariaLabel}
          >
            {data.ctaPrimary.label}
          </CTAButton>
          <CTAButton
            href={data.ctaSecondary.href}
            variant="secondary"
            ariaLabel={data.ctaSecondary.ariaLabel}
          >
            {data.ctaSecondary.label}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

function Problem({ data }: { data: Content["problem"] }) {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal once>
          <div>
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
          </div>
        </Reveal>

        <Reveal once delay={0.1}>
          <div className="space-y-5">
            {data.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/65 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="border-l-2 border-accent/50 pl-4 text-base leading-relaxed font-medium text-foreground/90 sm:text-lg">
              {data.conclusion}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Solution({ data }: { data: Content["solution"] }) {
  return (
    <section
      id="solution"
      className="scroll-mt-28 px-4 py-24 sm:px-6 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal once>
          <div className="max-w-2xl">
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/65 sm:text-lg">
              {data.body}
            </p>
          </div>
        </Reveal>

        <Reveal once delay={0.08}>
          <div className="mt-8 max-w-2xl rounded-xl border border-accent/20 bg-accent/5 p-6">
            <p className="text-base leading-relaxed font-medium text-foreground/90 sm:text-lg">
              {data.highlight}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {data.features.map((feature, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <Reveal key={i} once delay={0.05 * i}>
                <div className="flex h-full items-start gap-4 rounded-xl border border-border/40 bg-card/60 p-5 transition-colors hover:border-border/60 hover:bg-card/80">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/55">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Deliverables({ data }: { data: Content["deliverables"] }) {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal once>
          <div className="max-w-2xl">
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {data.items.map((item, i) => (
            <Reveal key={i} once delay={0.04 * i}>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check
                    className="h-3 w-3"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-base text-foreground/75">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal once delay={0.1}>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-foreground/55">
            {data.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PriceRow({
  label,
  value,
  note,
  was,
}: {
  label: string;
  value: string;
  note?: string;
  was?: string;
}) {
  return (
    <div className="mt-5">
      <span className="text-xs tracking-[0.08em] text-foreground/40 uppercase">
        {label}
      </span>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {was && (
          <span className="text-sm text-foreground/35 tabular-nums line-through">
            {was}
          </span>
        )}
      </div>
      {note && (
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/55">
          {note}
        </p>
      )}
    </div>
  );
}

function Pricing({ data }: { data: Content["pricing"] }) {
  const { catalogue, founder } = data;
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl">
        <Reveal once>
          <div className="flex flex-col items-center text-center">
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <Reveal once>
            <div className="flex h-full flex-col rounded-2xl border border-border/40 bg-card p-6 sm:p-7">
              <span className="text-xs font-semibold tracking-[0.12em] text-foreground/45 uppercase">
                {catalogue.label}
              </span>
              <PriceRow
                label={catalogue.setupLabel}
                value={catalogue.setupValue}
                note={catalogue.setupNote}
              />
              <PriceRow
                label={catalogue.maintenanceLabel}
                value={catalogue.maintenanceValue}
                note={catalogue.maintenanceNote}
              />
            </div>
          </Reveal>

          <Reveal once delay={0.08}>
            <div className="relative flex h-full flex-col rounded-2xl border border-accent/30 bg-card p-6 shadow-[0_24px_70px_-32px_rgba(58,123,213,0.5)] ring-1 ring-accent/15 sm:p-7">
              <span className="absolute -top-3 left-6 inline-flex items-center rounded border border-accent/30 bg-background px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-accent uppercase">
                {founder.badge}
              </span>
              <span className="text-xs font-semibold tracking-[0.12em] text-foreground/45 uppercase">
                {founder.label}
              </span>
              <PriceRow
                label={founder.setupLabel}
                value={founder.setupValue}
                was={founder.setupWas}
              />
              <PriceRow
                label={founder.maintenanceLabel}
                value={founder.maintenanceValue}
                was={founder.maintenanceWas}
              />
              <p className="mt-5 text-sm font-medium text-foreground/80">
                {founder.guarantee}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/55">
                {founder.exchange}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal once delay={0.05}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-foreground/55 tabular-nums">
            {data.comparison}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Process({ data }: { data: Content["process"] }) {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal once>
          <div className="max-w-2xl">
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            return (
              <Reveal key={i} once delay={0.06 * i}>
                <div className="flex h-full flex-col rounded-xl border border-border/40 bg-card/60 p-6 transition-colors hover:border-border/60 hover:bg-card/80">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl font-bold text-accent/20 tabular-nums">
                      {step.number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-foreground/50">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="mt-5 inline-flex w-fit items-center rounded border border-border/40 bg-background px-2 py-0.5 text-[11px] font-medium text-foreground/50">
                    {step.duration}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/55">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ data }: { data: Content["finalCta"] }) {
  return (
    <section className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-40 lg:py-48">
      <Halo className="top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
      <Reveal once>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-foreground/65 sm:text-lg">
            {data.subtitle}
          </p>
          <div className="mt-10 flex justify-center">
            <CTAButton
              href={data.ctaHref}
              variant="primary"
              ariaLabel={data.ctaAriaLabel}
            >
              {data.ctaLabel}
            </CTAButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
