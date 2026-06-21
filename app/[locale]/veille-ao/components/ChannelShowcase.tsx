"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useHasMounted,
  Reveal,
} from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";
import {
  Mail,
  Send,
  MessageCircle,
  Database,
  CalendarClock,
  Banknote,
  MapPin,
  Target,
  CheckCheck,
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
  Search,
  Paperclip,
  Smile,
  Mic,
  Camera,
  BadgeCheck,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { Translations } from "@/lib/i18n";

type Notif = Translations["veilleAo"]["notification"];
type Item = Notif["card"]["items"][number];
type ChannelId = "mail" | "telegram" | "whatsapp" | "crm";

/** Tab metadata. The `color` is the channel's own brand hue — used only inside
 *  each preview (app chrome / avatar / links) so the mockup reads as a genuine
 *  screenshot of that app, never for the page's own chrome. */
const CHANNELS: { id: ChannelId; Icon: LucideIcon }[] = [
  { id: "mail", Icon: Mail },
  { id: "telegram", Icon: Send },
  { id: "whatsapp", Icon: MessageCircle },
  { id: "crm", Icon: Database },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * ChannelShowcase — the "Ce que vous recevez" section.
 *
 * The four delivery channels are an accessible tablist (roving tabindex + arrow
 * keys). Selecting one morphs the preview to a channel-native mockup of the same
 * weekly digest: an email card, a faithful Telegram chat (bot bubble + inline
 * keyboard), a faithful WhatsApp chat (business header, wallpaper, read ticks,
 * input bar), or a CRM pipeline view. A shared-layout pill (`layoutId`) slides
 * under the active tab (the wiki's morph-surface signature) and panels cross-fade
 * via AnimatePresence. All motion is gated on mount + prefers-reduced-motion.
 */
export function ChannelShowcase({ data }: { data: Notif }) {
  const [active, setActive] = useState<ChannelId>("mail");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const hasMounted = useHasMounted();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = hasMounted && !prefersReducedMotion;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const idx = CHANNELS.findIndex((c) => c.id === active);
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (idx + 1) % CHANNELS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (idx - 1 + CHANNELS.length) % CHANNELS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = CHANNELS.length - 1;
    else return;
    e.preventDefault();
    setActive(CHANNELS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl">
        <Reveal once>
          <div className="flex flex-col items-center text-center">
            <EyebrowBadge>{data.eyebrow}</EyebrowBadge>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              {data.title}
            </h2>
            <p className="mt-5 text-base text-foreground/60 sm:text-lg">
              {data.subtitle}
            </p>
          </div>
        </Reveal>

        <Reveal once delay={0.08}>
          {/* Tablist — channel selector */}
          <div className="mt-9 flex justify-center">
            <div
              role="tablist"
              aria-label={data.tablistLabel}
              className="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-border/50 bg-card/60 p-1 backdrop-blur-sm"
            >
              {CHANNELS.map((ch, i) => {
                const selected = active === ch.id;
                return (
                  <button
                    key={ch.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${ch.id}-${uid}`}
                    aria-selected={selected}
                    aria-controls={`panel-${ch.id}-${uid}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(ch.id)}
                    onKeyDown={onKeyDown}
                    className={`relative inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium! transition-colors ${
                      selected
                        ? "text-accent"
                        : "text-foreground/55 hover:text-foreground/80"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId={`pill-${uid}`}
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent/10 ring-1 ring-accent/20"
                        transition={
                          shouldAnimate
                            ? { type: "spring", stiffness: 420, damping: 32 }
                            : { duration: 0 }
                        }
                      />
                    )}
                    <ch.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {data.channels[i]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview — morphs to the selected channel's native format */}
          <motion.div
            layout={shouldAnimate}
            transition={{ duration: 0.3, ease: easeOut }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                id={`panel-${active}-${uid}`}
                role="tabpanel"
                aria-labelledby={`tab-${active}-${uid}`}
                initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldAnimate ? { opacity: 0, y: -8 } : { opacity: 1 }}
                transition={{ duration: 0.22, ease: easeOut }}
              >
                {active === "mail" && <MailPreview data={data} />}
                {active === "telegram" && <TelegramPreview data={data} />}
                {active === "whatsapp" && <WhatsAppPreview data={data} />}
                {active === "crm" && <CrmPreview data={data} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Reveal>

        <Reveal once delay={0.05}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-foreground/55">
            {data.factual}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Shared device-frame wrapper so every channel reads as a real app screenshot. */
function Device({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-card text-left shadow-[0_24px_70px_-30px_rgba(0,0,0,0.28)]">
      {children}
    </div>
  );
}

/* The three text lines for one tender, shared by both chat apps. */
function DigestItem({ item, index }: { item: Item; index: number }) {
  return (
    <div className="text-[13px] leading-relaxed">
      <div className="font-semibold text-[#111b21]">
        {index + 1}. {item.org}
      </div>
      <div className="text-[#3b4a54] tabular-nums">
        📅 {item.deadline} · 💰 {item.amount}
      </div>
      <div className="text-[#3b4a54]">
        📍 {item.location} · 🎯 {item.match}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Mail ----- */

function MailField({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[11px] tracking-[0.08em] text-foreground/40 uppercase">
        <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd
        className={`mt-0.5 truncate text-sm tabular-nums ${
          accent ? "font-medium text-accent" : "text-foreground/75"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function MailPreview({ data }: { data: Notif }) {
  const { card } = data;
  return (
    <Device>
      <div className="flex items-center gap-2.5 border-b border-border/30 bg-foreground/[0.015] px-5 py-3.5">
        <span
          aria-hidden="true"
          className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_3px_rgba(58,123,213,0.18)]"
        />
        <span className="text-sm font-semibold text-foreground">
          {card.title}
        </span>
        <span className="text-sm text-foreground/40">: {card.week}</span>
        <Mail
          className="ml-auto h-4 w-4 text-foreground/30"
          aria-hidden="true"
        />
      </div>

      <div className="px-5 pt-4">
        <p className="text-sm font-medium text-foreground/80">{card.summary}</p>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {card.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/35 bg-background/60 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-foreground">
                {item.org}
              </span>
              <span className="shrink-0 text-xs font-medium text-accent">
                {card.linkLabel} →
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
              <MailField
                icon={CalendarClock}
                label={card.deadlineLabel}
                value={item.deadline}
              />
              <MailField
                icon={Banknote}
                label={card.amountLabel}
                value={item.amount}
              />
              <MailField
                icon={MapPin}
                label={card.locationLabel}
                value={item.location}
              />
              <MailField
                icon={Target}
                label={card.matchLabel}
                value={item.match}
                accent
              />
            </dl>
          </div>
        ))}
      </div>
    </Device>
  );
}

/* ------------------------------------------------------------ Telegram ----- */

function TelegramPreview({ data }: { data: Notif }) {
  const { card, chat } = data;
  const blue = "#5288c1";
  const linkBlue = "#3390ec";
  return (
    <Device>
      {/* App header */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 text-white"
        style={{ backgroundColor: blue }}
      >
        <ChevronLeft
          className="h-5 w-5 shrink-0 text-white/90"
          aria-hidden="true"
        />
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-semibold"
          aria-hidden="true"
        >
          {initials(chat.sender)}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-semibold">{chat.sender}</div>
          <div className="truncate text-[11px] text-white/75">
            {data.telegram.tag}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-white/90">
          <Search className="h-4 w-4" aria-hidden="true" />
          <MoreVertical className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      {/* Chat wallpaper */}
      <div className="bg-[#cdd9e6] px-3 py-4">
        <div className="mx-auto mb-3 w-fit rounded-full bg-black/15 px-2.5 py-0.5 text-[11px] font-medium text-white">
          {chat.today}
        </div>

        {/* Incoming bot bubble */}
        <div className="relative max-w-[92%] rounded-xl rounded-bl-sm bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.12)]">
          <span
            aria-hidden="true"
            className="absolute bottom-0 -left-[6px] h-[13px] w-[10px] bg-white"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="text-[13px] font-semibold"
            style={{ color: linkBlue }}
          >
            {chat.sender}
          </div>
          <p className="mt-0.5 text-[13px] font-semibold text-[#111b21]">
            🔔 {card.title} : {card.week}
          </p>
          <p className="text-[13px] text-[#3b4a54]">{card.summary}</p>

          <div className="mt-2 flex flex-col gap-2.5">
            {card.items.map((item, i) => (
              <DigestItem key={i} item={item} index={i} />
            ))}
          </div>

          <div className="mt-1 flex justify-end text-[11px] text-[#8badc9]">
            {chat.time}
          </div>

          {/* Inline keyboard (bot buttons) */}
          <div className="mt-2 overflow-hidden rounded-lg">
            {card.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-1.5 border-t border-white bg-[#eaf2fb] px-3 py-2 text-[12px] font-medium"
                style={{ color: linkBlue }}
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                {chat.cta} · {item.org}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-3 border-t border-border/20 bg-white px-3 py-2.5 text-[#8a9aa9]">
        <Paperclip className="h-5 w-5" aria-hidden="true" />
        <span className="flex-1 text-sm">{chat.input}</span>
        <Smile className="h-5 w-5" aria-hidden="true" />
        <Mic className="h-5 w-5" aria-hidden="true" />
      </div>
    </Device>
  );
}

/* ------------------------------------------------------------ WhatsApp ----- */

function WhatsAppPreview({ data }: { data: Notif }) {
  const { card, chat } = data;
  const green = "#008069";
  const linkBlue = "#027eb5";
  return (
    <Device>
      {/* App header */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 text-white"
        style={{ backgroundColor: green }}
      >
        <ChevronLeft
          className="h-5 w-5 shrink-0 text-white/90"
          aria-hidden="true"
        />
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/25 text-xs font-semibold"
          aria-hidden="true"
        >
          {initials(chat.sender)}
        </span>
        <div className="min-w-0 leading-tight">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <span className="truncate">{chat.sender}</span>
            <BadgeCheck
              className="h-3.5 w-3.5 shrink-0 text-white/85"
              aria-hidden="true"
            />
          </div>
          <div className="truncate text-[11px] text-white/75">
            {data.whatsapp.tag}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-white/90">
          <Video className="h-4 w-4" aria-hidden="true" />
          <Phone className="h-4 w-4" aria-hidden="true" />
          <MoreVertical className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      {/* Chat wallpaper */}
      <div className="bg-[#ece5dd] px-3 py-4">
        <div className="mx-auto mb-3 w-fit rounded-md bg-white/85 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#54656f] uppercase shadow-sm">
          {chat.today}
        </div>

        {/* Incoming business bubble */}
        <div className="relative max-w-[92%] rounded-lg rounded-tl-sm bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.13)]">
          <span
            aria-hidden="true"
            className="absolute top-0 -left-[6px] h-[13px] w-[10px] bg-white"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
          />
          <p className="text-[13px] font-semibold text-[#111b21]">
            🔔 {card.title} : {card.week}
          </p>
          <p className="text-[13px] text-[#3b4a54]">{card.summary}</p>

          <div className="mt-2 flex flex-col gap-2.5">
            {card.items.map((item, i) => (
              <div key={i}>
                <DigestItem item={item} index={i} />
                <span
                  className="mt-0.5 inline-block text-[13px] font-medium underline"
                  style={{ color: linkBlue }}
                >
                  {chat.cta}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
            {chat.time}
            <CheckCheck
              className="h-3.5 w-3.5 text-[#53bdeb]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 bg-[#f0f2f5] px-2.5 py-2">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 text-[#8696a0]">
          <Smile className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate text-sm">{chat.input}</span>
          <Paperclip className="h-4 w-4 shrink-0" aria-hidden="true" />
          <Camera className="h-4 w-4 shrink-0" aria-hidden="true" />
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: green }}
          aria-hidden="true"
        >
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </Device>
  );
}

/* ----------------------------------------------------------------- CRM ----- */

function CrmPreview({ data }: { data: Notif }) {
  const { card, crm } = data;
  return (
    <Device>
      <div className="flex items-center gap-2.5 border-b border-border/30 bg-foreground/[0.015] px-5 py-3.5">
        <Database className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="text-sm font-semibold text-foreground">
          {crm.title}
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded border border-accent/30 bg-accent/5 px-2 py-0.5 text-[11px] font-medium text-accent">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {crm.source}
        </span>
      </div>

      <div className="overflow-x-auto p-2 sm:p-3">
        <div className="min-w-[480px]">
          {/* Column headers */}
          <div className="grid grid-cols-[1.6fr_1fr_1fr_auto] gap-3 px-3 py-2 text-[11px] tracking-[0.08em] text-foreground/40 uppercase">
            <span>{crm.colDeal}</span>
            <span>{crm.colDeadline}</span>
            <span className="text-right">{crm.colAmount}</span>
            <span className="text-right">{crm.colStatus}</span>
          </div>

          {card.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.6fr_1fr_1fr_auto] items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-foreground/[0.025]"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {item.org}
                </div>
                <div className="truncate text-xs text-foreground/45">
                  {item.match}
                </div>
              </div>
              <span className="text-sm text-foreground/70 tabular-nums">
                {item.deadline}
              </span>
              <span className="text-right text-sm font-medium text-foreground tabular-nums">
                {item.amount}
              </span>
              <span className="inline-flex items-center gap-1.5 justify-self-end rounded-full border border-amber-300/60 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-amber-400"
                  aria-hidden="true"
                />
                {crm.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Device>
  );
}
