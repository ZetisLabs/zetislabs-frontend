"use client";

type ReasonCardProps = {
  title: string;
  description: string;
  index: number;
};

export const ReasonCard = ({ title, description, index }: ReasonCardProps) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 group-hover/grid:opacity-40 hover:scale-[1.02] hover:bg-card hover:!opacity-100 hover:shadow-lg md:p-8">
      {/* Background Number */}
      <div className="absolute -top-4 -right-4 text-7xl font-bold text-foreground/5 opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-20 md:text-9xl">
        0{index + 1}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
            {title}
          </h3>
          <div className="mt-4 h-px w-12 bg-accent/50 transition-all duration-300 group-hover:w-full" />
          <p className="text-muted-foreground mt-4 text-base leading-relaxed group-hover:text-foreground/80">
            {description}
          </p>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
