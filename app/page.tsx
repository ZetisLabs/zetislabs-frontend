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
              Stop wasting time on repetitive tasks
            </div>

            {/* Headline */}
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Empower your workflow. Effortlessly.
            </h1>

            {/* Subcopy */}
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
            ZetisLabs builds custom automations that save you hours every week.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white">
                Get a free audit
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

      {/* Example Projects Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Example Projects
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              See how we've helped companies automate their workflows and save valuable time.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Project Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">E-commerce Order Processing</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Automated order fulfillment workflow that processes orders, updates inventory, and sends notifications, reducing processing time by 80%.
              </p>
            </div>

            {/* Project Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Customer Support Automation</h3>
              <p className="mt-2 text-sm text-foreground/70">
                AI-powered ticket routing and response system that handles common inquiries, freeing up support staff for complex issues.
              </p>
            </div>

            {/* Project Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Data Migration Pipeline</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Intelligent data transformation and migration system that validates, cleans, and transfers data between systems seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ZetisLabs Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Why ZetisLabs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              We combine cutting-edge AI technology with deep automation expertise to deliver solutions that work.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Reason Card 1 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Expert Team</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Our team brings years of experience in AI, automation, and enterprise software development.
              </p>
            </div>

            {/* Reason Card 2 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Custom Solutions</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Every automation is tailored to your specific needs and workflows, not a one-size-fits-all approach.
              </p>
            </div>

            {/* Reason Card 3 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Proven Results</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Our clients see measurable improvements in efficiency, accuracy, and time savings from day one.
              </p>
            </div>

            {/* Reason Card 4 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Ongoing Support</h3>
              <p className="mt-2 text-sm text-foreground/70">
                We provide continuous monitoring, optimization, and support to ensure your automations stay effective.
              </p>
            </div>

            {/* Reason Card 5 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Scalable Architecture</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Built to grow with your business, handling increased volume and complexity as you expand.
              </p>
            </div>

            {/* Reason Card 6 */}
            <div className="rounded-lg border border-border/50 bg-card/40 p-6">
              <h3 className="text-xl font-semibold">Security First</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Enterprise-grade security and compliance built into every solution from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to Automate?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-foreground/75 sm:text-lg">
              Get a free audit of your workflows and discover how much time you could save with intelligent automation.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a 
                href="#" 
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md bg-accent/70 px-6 py-0 backdrop-blur-lg border border-accent shadow-md text-sm font-medium text-white hover:bg-accent transition-colors"
                aria-label="Get a free audit"
              >
                Get a free audit
              </a>
              <a 
                href="#" 
                className="inline-flex w-auto items-center justify-center gap-6 rounded-md border border-border/70 bg-card/40 px-6 py-0 backdrop-blur-lg text-sm font-medium text-foreground hover:bg-card/60 transition-colors"
                aria-label="Learn more"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
