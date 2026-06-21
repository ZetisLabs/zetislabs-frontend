# Home redesign — Art direction: **"Architect's Paper"**

> Swiss International Typographic rigor printed on a warm near-white lab sheet,
> where the only living things are slow light and a single blue spark.

This document records the direction for the Zetislabs home rebuild (`feat/home-redesign-v1`):
the references studied, the palette, the typography, and the animation principles.
It is deliberately coherent with the existing site and the `design-wiki` — the brief's
_intent_ (Swiss + craft + organic, a living accent, a cinematic scroll) is delivered
through the site's own visual language rather than a dark/WebGL-heavy pivot, because the
whole live product (chrome, blog, `globals.css` tokens) and the wiki are light Swiss.

---

## 1. References studied (principles, not pixels)

The home was researched across five streams (Swiss typographic, craft micro-interaction,
organic/living, awards-craft, and our own `design-wiki`). The convergent lesson: on a
near-white surface, "life" comes from **subtraction and slowness**, and craft is
**concentrated polish on a few details**, not density.

| Reference                                   | What we took                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Klim Type Foundry**                       | Hierarchy carried entirely by a tight 3-tier type scale on near-white; metadata-as-tertiary-tier for honest craft signals (one-time payment, you own the code).                                                                                                                                                                                                                                                                   |
| **Pentagram**                               | The template: white base + ink + **one** accent reserved for CTAs/links/highlights; oversized lead headline _is_ the hero imagery (no photography).                                                                                                                                                                                                                                                                               |
| **Grilli Type**                             | Economy of emphasis — most headings small so the few big ones land; motion only to demonstrate something real, never ornament.                                                                                                                                                                                                                                                                                                    |
| **Cosmos**                                  | "Movement without animation" — rhythm from staggered asymmetric placement; accent frequency kept genuinely low so it reads as a deliberate spark.                                                                                                                                                                                                                                                                                 |
| **Müller‑Brockmann (Grid Systems)**         | The engine: explicit 8pt baseline + 12‑col modular grid, whitespace as an _active_ element, asymmetry for tension, one type family in varied weights.                                                                                                                                                                                                                                                                             |
| **Linear / Vercel (Geist) / Raycast / Arc** | Restraint + precision in _motion quality_: sub‑300ms tokenized ease‑out, `scale(0.97)` press, spatial reveals (rise + `0.97→1`, never from `scale(0)`), depth from a surface ladder + hairlines, **never shadows**.                                                                                                                                                                                                               |
| **Emil Kowalski**                           | The motion decision framework (frequent = none; rare = delight); `--ease-out: cubic-bezier(0.23,1,0.32,1)` is literally our `--ease-out-strong`; "marketing can be longer" carve‑out for the hero only.                                                                                                                                                                                                                           |
| **Rauno Freiberg / rauno.me**               | Off‑white base as the cheapest "life" lever; lab‑instrument language (tick marks / measurement marks in border‑color); off‑screen pause, stable font‑weight on hover.                                                                                                                                                                                                                                                             |
| **Resend / Family / "Grainy Gradients"**    | Steal techniques, drop palettes: `mask-image` fade to dissolve organic shapes into the surface, oklab interpolation for the one rare gradient, static `feTurbulence` grain (~1.8%) for tactile warmth at zero motion cost, one 30s+ ambient loop.                                                                                                                                                                                 |
| **design-wiki (our source of truth)**       | The non‑negotiable contract: 3 named easings, tween‑for‑size / spring‑for‑displacement, transform+opacity only, 95/5 monochrome‑accent, 90/10 novelty, focus rings via `box-shadow`, `tabular-nums`, `prefers-reduced-motion`. Dashboard‑only rules (status colors, `#999` muted, `h-px` separators, sidebar offset) are **overridden** on the marketing home; `decisions.md`'s "public brand" carve‑out licenses the WebGL hero. |

---

## 2. Palette

Use the **live `globals.css` tokens only** — no new color tokens.

- **Base** `--color-background #f8f8f8` everywhere — never drop the page to `#fff`
  (the off-white base is the single biggest, cheapest "life" lever).
- **Card** `--color-card #ffffff` — elevation reads as a one‑notch _surface lift_, not a shadow.
- **Ink** `--color-foreground #1a1a1a` at an opacity ladder: `100%` headlines/emphasis,
  `70%` secondary/subtitles, `40–50%` tertiary metadata/labels. Never text below 40%.
  No muted `#999` token (it isn't in the live theme).
- **Accent** `--color-accent #3a7bd5` at **~5% surface, "for life" only**: links, the single
  primary CTA, a hover hairline edge, the one organic hero shape, the hero cursor‑spotlight.
  Target **one accent moment per viewport**. Never a repeated button fill, section background,
  or gradient theme.
- **Hairline** `--color-border #e2e2e2` for card edges and lab tick marks; on hover a card's
  hairline may shift toward accent at ~35% alpha (the "one‑notch" language) — never a heavy ring.
- **Textures**: `swiss-paper` dot‑grid (~3%) + optional static `feTurbulence` grain (~1.8%),
  both `pointer-events:none` behind content. No dark mode, no colored gradients/borders/cards.

---

## 3. Typography

Two families only — **GeneralSans** (`--font-heading`) for headings,
**IBM Plex Sans** (`--font-sans`) for body. Hierarchy from weight/size/position (max 3 levels/viewport).

- **Bigger = tighter tracking**, applied per element (globals does _not_ set global heading tracking):
  hero/display `tracking-[-0.03em]`,
  section titles `tracking-[-0.025em]`. Uppercase labels **open up**: `tracking-[0.07em]` (EyebrowBadge register).
- **Hero headline**: fluid `clamp` — `text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]`, **centred** (`text-balance`).
  The two‑line title is the page's dramatic entry point and replaces photography.
- **Body**: IBM Plex Sans at an editorial measure (`max-w-2xl`), `leading-relaxed`, never justified; subtitles at `foreground/70`.
- **Hard rules**: font‑weight never changes on hover (layout shift) and never below 400;
  `tabular-nums` on every aligned number (`30 min`, `2–5 days`, `60 days`). No italics for emphasis — use weight.
  Beware the `globals.css` button/input `weight:600` unlayered trap → use `font-normal!` if a button needs lighter.

---

## 4. Animation principles

- **Easings, verbatim from `globals.css`**: `--ease-snappy (0.16,1,0.3,1)` default;
  `--ease-out-strong (0.23,1,0.32,1)` for enter/exit reveals & hovers (Emil's workhorse);
  `--ease-spring (0.34,1.56,0.64,1)` **only** for lateral sliding indicators. Never `linear`, never `ease-in` for UI.
- **Durations**: interactive UI < 300ms (target ~180ms); hover/feedback 100–160ms; reveals 200–300ms.
  The **hero/explanatory entrance is the sanctioned carve‑out** and may run longer (the existing `.hero-entrance` is 0.7s) —
  pull this lever only for the rare 10% (hero + WebGL sunrise); keep the other 90% quiet and crisp.
- **Motion split is law**: tween for any size/height change (`0.35`, `[0.16,1,0.3,1]`); spring (`stiffness 400, damping 25`)
  for lateral displacement; hover micro‑translate spring `stiffness 500, damping 30`.
- **Spatial reveals only**: rise 8–16px + opacity `0→1` + scale `0.97→1` — never from `scale(0)` (min 0.95).
  Use the existing `Reveal` primitive (`direction="up"`, `once`), gated behind `hasMounted` + `prefers-reduced-motion`.
- **Stagger** grouped entrances 30–80ms (capabilities, steps). Appear fast, leave ~20% softer.
- **GPU‑only**: animate `transform` + `opacity` (+ paint‑only `background-color`/`border-color` on hover).
  Never width/height/top/left/margin/box‑shadow. Prefer CSS transitions for hovers (retarget mid‑flight).
- **`prefers-reduced-motion`** strips transform motion, keeps opacity/color; decorative WebGL/grain/spotlight
  layers are `pointer-events:none`; hover gated behind `@media (hover:hover)`.

---

## 5. Organic / living plan ("life by subtraction")

1. **Off‑white `#f8f8f8` paper base** — protect it; never `#fff` for the page.
2. **Static layered texture** behind all content (`pointer-events:none`): `swiss-paper` dot‑grid (~3%) + optional
   `feTurbulence` film grain (~1.8%). Static → no reduced‑motion fallback needed, effectively free.
3. **One slow ambient layer only**: reuse the existing `WebGLBackgroundLazy` sunrise (`intro` → `idle` breathing) as
   the single 30s+ drift. No second shader, no video.
4. **One organic grid‑break**: the sunrise arc itself, an accent shape dissolved into the surface (it doubles as ambient + grid‑break).
5. **Lab‑instrument language** for "rigorous/crafted" at zero color cost: tick marks / indices in `border-color`.
6. **Mouse‑reactivity on the hero only**: wiki cursor‑spotlight via `useMotionValue` + `useMotionTemplate`
   (never `useState`), accent at 11%, radius ~380px; disabled under reduced‑motion and on touch.
   Everything degrades to a still‑warm static page when motion is off.

---

## 6. Per‑section intent → one interaction each (no dead sections)

The scroll tells the story: **arrive (what is this) → understand (what we do) → differentiate
(why not a SaaS) → trust (how we work) → act (offers / CTA).**

| Section             | Intent                                                                   | Layout                                                                                                                                                                                   | The one interaction                                                                                                   |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Hero**            | Dramatic entry; oversized title is the imagery; route to the single CTA. | Full‑bleed editorial, centred column, sunrise arc behind, CSS `.hero-entrance` stagger.                                                                                                  | Reused WebGL sunrise (slow ambient) + hero‑only cursor‑spotlight (motion values); pinned fade‑out on scroll.          |
| **What we do**      | Process → owned automated system; land 3 capabilities.                   | Section title + lede; 3‑col parallel cards on `#fff` with hairlines.                                                                                                                     | One‑notch hover lift (bg `#f8f8f8→#fff`, hairline → accent ~35%, 120ms); staggered reveal 40–60ms.                    |
| **Why not a SaaS?** | The honest contrast: rent/lock‑in vs. you own it.                        | Asymmetric two‑column; left "rent" recessive (`foreground/65`), right "own" full + accent on the key phrase; divided by whitespace, no rule.                                             | Quiet staggered reveal of "the code is yours"; hierarchy by size + the single accent phrase.                          |
| **How we work**     | Demystify the process; signal no black box across 3 steps.               | Semantic ordered list on a connecting rail (accent start-node): title, durations as tracked tertiary metadata (`tabular-nums`), one‑line description — order by structure, not numerals. | Sequential scroll‑reveal, staggered 60–80ms, as an unfolding sequence.                                                |
| **Offers**          | Spotlight the live "Veille AO" offer; honestly note more in the works.   | One prominent offer card (focal point) on `#fff` + hairline; "More offers in the works" as quiet tertiary metadata.                                                                      | One‑notch hover lift; CTAButton `:active` press. (No spotlight — hero‑only.)                                          |
| **Final CTA**       | Close with the direct invitation + Calendly.                             | Centered focal block, lots of whitespace; question smaller than the hero (economy of emphasis); one generous CTA.                                                                        | Reuses `CTAContent` pinned in‑view reveal (mirrors the hero) + CTA glow/press — the viewport's one "for life" moment. |

---

## 7. Coherence notes / divergences (Before → After → Why)

- **No horizontal rules** on the home → sections separated by space/rhythm. _Why:_ wiki design direction + brief; the
  `spacing-system.md` `h-px` separator guidance is dashboard‑scoped and overridden here.
- **WebGL hero + longer hero motion** kept → _Why:_ `decisions.md` "public brand / marketing site" carve‑out and the
  90/10 novelty budget (the sunrise + hero entrance _are_ the sanctioned 10%).
- **Light, not dark** → _Why:_ coherence with the live site + wiki (no dark mode); the brief's intent is delivered in the site's language.
