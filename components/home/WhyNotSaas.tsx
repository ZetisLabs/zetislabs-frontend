import { Reveal } from "@/lib/motion";
import { EyebrowBadge } from "@/lib/ui";

type WhyNotSaasProps = {
  eyebrow: string;
  rent: string;
  ownLead: string;
  ownAccent: string;
  closing: string;
};

/**
 * Why not a SaaS? — the persuasion fulcrum, framed as an honest contrast.
 * Asymmetric two-column: the "rent / lock-in" argument is set quiet and recessive
 * (left), the "you own it" answer is full-weight and larger (right) with the single
 * accent on the key phrase. Divided by whitespace and gap — never a rule.
 */
export function WhyNotSaas({
  eyebrow,
  rent,
  ownLead,
  ownAccent,
  closing,
}: WhyNotSaasProps) {
  return (
    <section
      data-section="why-not-saas"
      className="relative w-full py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8">
        <Reveal direction="up">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 sm:mt-14 md:grid-cols-12 md:gap-16">
          {/* Recessive: the SaaS model */}
          <Reveal direction="up" delay={0.05} className="md:col-span-5">
            <p className="max-w-md leading-relaxed text-pretty text-foreground/65 sm:text-lg">
              {rent}
            </p>
          </Reveal>

          {/* Full-weight: you own it */}
          <div className="md:col-span-7">
            <Reveal direction="up" delay={0.12}>
              <p className="text-[clamp(1.5rem,2.8vw,2.25rem)] leading-snug font-medium tracking-[-0.02em] text-balance text-foreground">
                {ownLead}
                <span className="text-accent">{ownAccent}</span>
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-xl leading-relaxed text-pretty text-foreground/70">
                {closing}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
