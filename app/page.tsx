/**
 * Home Page
 * Implements a minimalist hero section inspired by the referenced design.
 * Text content uses lorem ipsum placeholders per requirements.
 */
export default function Home() {
  return (
    <>
      <section className="relative isolate">
        <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-24 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1 text-xs uppercase tracking-wider text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Lorem ipsum dolor sit amet
            </div>

            {/* Headline */}
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Empower your workflow. Effortlessly.
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              Save working hours through AI-powered automation.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white">
                Lorem ipsum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Make Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What We Make
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              ZetisLabs helps companies automate processes using intelligent agent-driven workflows. We build AI-powered automation solutions that transform how businesses operate.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">AI Agents</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Intelligent agents that understand context and execute complex workflows autonomously.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Process Automation</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Streamline repetitive tasks and workflows to save time and reduce human error.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Intelligent Workflows</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Build adaptive workflows that learn and improve over time with AI-powered insights.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Enterprise Integration</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Seamlessly integrate with your existing tools and systems for unified automation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
