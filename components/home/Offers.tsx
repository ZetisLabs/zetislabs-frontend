import { Reveal } from "@/lib/motion";
import { CTAButton, EyebrowBadge } from "@/lib/ui";

type OffersProps = {
  eyebrow: string;
  primary: {
    name: string;
    description: string;
    cta: { label: string; href: string };
  };
  more: string;
};

/**
 * Offers — spotlight the one live offer (the focal card), and honestly note that
 * more are in the works as quiet tertiary metadata. The one interaction is the
 * "one-notch" hover lift on the card (surface + hairline → accent), depth without
 * shadow. The section is the #offres scroll target for the hero CTA.
 */
export function Offers({ eyebrow, primary, more }: OffersProps) {
  return (
    <section
      id="offres"
      data-section="offers"
      className="relative w-full scroll-mt-28 py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-screen-xl px-6 sm:px-8">
        <Reveal direction="up">
          <EyebrowBadge>{eyebrow}</EyebrowBadge>
        </Reveal>

        <Reveal direction="up" delay={0.06} className="mt-10 block">
          <article className="group relative max-w-2xl overflow-hidden rounded-lg border border-border/70 bg-card/40 p-8 transition-[transform,background-color,border-color] duration-200 ease-out-strong hover:-translate-y-[3px] hover:border-accent/35 hover:bg-card sm:p-10">
            <h3 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {primary.name}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-pretty text-foreground/70">
              {primary.description}
            </p>
            <div className="mt-8 w-full sm:w-auto">
              <CTAButton
                href={primary.cta.href}
                variant="secondary"
                ariaLabel={primary.cta.label}
              >
                {primary.cta.label}
              </CTAButton>
            </div>
          </article>
        </Reveal>

        <Reveal direction="up" delay={0.12}>
          <p className="mt-6 text-sm text-foreground/65">{more}</p>
        </Reveal>
      </div>
    </section>
  );
}
