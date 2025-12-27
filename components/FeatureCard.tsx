type FeatureCardProps = {
  title: string;
  subtitle: string;
  description: string;
  cta?: string;
};

export const FeatureCard = ({
  title,
  subtitle,
  description,
  cta,
}: FeatureCardProps) => {
  return (
    <div className="group relative h-full cursor-pointer">
      <div className="group/card relative flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-500 group-hover/grid:opacity-40 hover:scale-[1.02] hover:bg-card hover:!opacity-100 hover:shadow-lg md:p-8">
        <div>
          <div className="flex items-center overflow-hidden">
            <span className="mr-2 -translate-x-8 text-2xl opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100">
              ⚡
            </span>
            <div className="transition-transform duration-300 group-hover/card:translate-x-2">
              <h3 className="text-2xl font-normal text-foreground md:text-3xl">
                {title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                {subtitle}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="relative flex h-12 items-center rounded-full bg-accent/10 transition-all duration-300 group-hover/card:bg-accent group-hover/card:pr-1 group-hover/card:pl-4 group-hover/card:text-accent-foreground">
            {cta && (
              <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-500 group-hover/card:max-w-xs group-hover/card:opacity-100">
                {cta}
              </span>
            )}
            <div className="flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-500 group-hover/card:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground transition-all duration-300 group-hover/card:text-accent-foreground"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
      </div>
    </div>
  );
};
