/**
 * Home Page
 * Implements a minimalist hero section inspired by the referenced design.
 * Text content uses lorem ipsum placeholders per requirements.
 */
export default function Home() {
  return (
    <section className="hero-surface">
      <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-24 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-[11px] uppercase tracking-wider text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            Lorem ipsum dolor sit amet
          </div>

          {/* Headline */}
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h1>

          {/* Subcopy */}
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#" className="btn-primary inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium shadow-sm">
              Lorem ipsum
            </a>
            <a href="#" className="btn-ghost inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium">
              Dolor sit amet
            </a>
          </div>
        </div>

        {/* Supporting badges/logos row (placeholder, minimalist) */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 items-center justify-center gap-x-6 gap-y-4 opacity-70 sm:grid-cols-4">
          <div className="h-7 rounded bg-card/60" />
          <div className="h-7 rounded bg-card/60" />
          <div className="h-7 rounded bg-card/60" />
          <div className="h-7 rounded bg-card/60" />
        </div>
      </div>
    </section>
  );
}
