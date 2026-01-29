"use client";

import {
  Slack,
  CheckSquare,
  Trello,
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Target,
  Heart,
} from "lucide-react";
import {
  ServiceCard,
  LargeHighlightCard,
  InfoCard,
  EyebrowBadge,
} from "@/lib/ui";
import { Reveal, CardCarousel } from "@/lib/motion";

export function CardShowcaseSection() {
  return (
    <section className="overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl space-y-24">
        {/* SECTION HEADER */}
        <div className="space-y-4 px-6 text-center">
          <Reveal>
            <EyebrowBadge>Card Library</EyebrowBadge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Our New Card Designs
            </h2>
          </Reveal>
        </div>

        {/* SERVICE CARDS SHOWCASE */}
        <div className="space-y-12 px-6">
          <Reveal>
            <div className="space-y-2 border-b border-border pb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Service Cards
              </h3>
              <p className="max-w-xl text-foreground/60">
                Versatile cards for platform integrations, task management, and
                service status.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-3">
            <Reveal delay={0.1} direction="up">
              <ServiceCard
                icon={<Slack className="h-5 w-5 text-[#4A154B]" />}
                serviceName="Slack"
                label="Incoming Webhook"
                title="Update production deployment status to #ops-channel"
                date="Oct 24, 2024"
                assignee="Sarah K."
              />
            </Reveal>

            <Reveal delay={0.2} direction="up">
              <ServiceCard
                icon={<CheckSquare className="h-5 w-5 text-accent" />}
                serviceName="Notion"
                label="Content Calendar"
                title="Review Q4 marketing assets and finalize brand guidelines"
                date="Oct 28, 2024"
                assignee="Alex Rivera"
              />
            </Reveal>

            <Reveal delay={0.3} direction="up">
              <ServiceCard
                icon={<Trello className="h-5 w-5 text-[#0079BF]" />}
                serviceName="Trello"
                label="Product Roadmap"
                title="Move 'User Feedback Loop' to high priority sprint"
                date="Nov 02, 2024"
                assignee="Marcus Chen"
              />
            </Reveal>
          </div>
        </div>

        {/* LARGE HIGHLIGHT CARDS CAROUSEL */}
        <div className="space-y-12">
          <Reveal>
            <div className="space-y-2 border-b border-border px-6 pb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Highlight Cards
              </h3>
              <p className="max-w-xl text-foreground/60">
                Large format cards for showcasing key values, features, or
                important messages.
              </p>
            </div>
          </Reveal>

          <CardCarousel showArrows={true} showDots={true}>
            <LargeHighlightCard
              badge={{ text: "Core Value", color: "orange" }}
              title="Innovation at Every Step"
              description="We push boundaries and embrace cutting-edge technologies to deliver solutions that set you apart from the competition."
              decoration={
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg md:h-40 md:w-40">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
              }
            />
            <LargeHighlightCard
              badge={{ text: "Our Promise", color: "blue" }}
              title="Quality You Can Trust"
              description="Every line of code, every design decision is made with excellence and reliability in mind. We don't compromise on quality."
              decoration={
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg md:h-40 md:w-40">
                  <Target className="h-16 w-16 text-white" />
                </div>
              }
            />
            <LargeHighlightCard
              badge={{ text: "Philosophy", color: "purple" }}
              title="Built with Care"
              description="We treat every project like it's our own. Your success is our success, and we're committed to making it happen."
              decoration={
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg md:h-40 md:w-40">
                  <Heart className="h-16 w-16 text-white" />
                </div>
              }
            />
          </CardCarousel>
        </div>

        {/* INFO CARDS SHOWCASE */}
        <div className="space-y-12 px-6">
          <Reveal>
            <div className="space-y-2 border-b border-border pb-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Info Cards
              </h3>
              <p className="max-w-xl text-foreground/60">
                Flexible cards for displaying any kind of information with
                optional icons and footers.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal delay={0.1}>
              <InfoCard
                icon={<Zap className="h-5 w-5" />}
                title="Lightning Fast"
                content="Our platform is optimized for speed, ensuring your workflows run without delay."
                footer="Performance optimized"
              />
            </Reveal>
            <Reveal delay={0.2}>
              <InfoCard
                icon={<Shield className="h-5 w-5" />}
                title="Enterprise Security"
                content="Bank-level encryption and compliance with industry standards keep your data safe."
                footer="SOC 2 Certified"
              />
            </Reveal>
            <Reveal delay={0.3}>
              <InfoCard
                icon={<Rocket className="h-5 w-5" />}
                title="Scale Effortlessly"
                content="From startup to enterprise, our infrastructure grows with your business needs."
                footer="99.9% Uptime SLA"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
